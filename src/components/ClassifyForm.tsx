import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import type { LatLng } from "leaflet";
import "../assets/css/ClassifyForm.css";
import ApiService from "../services/ApiService";
// const zlib = require('browserify-zlib');

let socket: WebSocket;

const USE_SATELLITE_OPTION : String = "use_sat"
function connectWebSocket(addr: String, wsStatusUpdate: Function, wsGeoJsonUpdate: Function) {
  // WebSocket connection
  socket = new WebSocket(`ws://${addr}`);
  // Connection opened
  socket.addEventListener('open', () => {
    // this is where you can allow things to be sent on the websocket
    console.log('WebSocket connection established.');
  });

  var geojsonChunks : string[] = []
  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log(event)
      if(event.data instanceof Blob){
          var reader = new FileReader();
          reader.onload = () => {
              console.log("Result: " + reader.result);
              let msg = JSON.parse(reader.result?.toString() || "");
              wsStatusUpdate(msg.status, msg.percent.toString()) 
              if(msg.geojson_flag === "done"){
                  var combinedChunks : string = "";
                  geojsonChunks.forEach((chunk : string) =>{
                      combinedChunks += chunk
                  })
                  wsGeoJsonUpdate(combinedChunks)
              }
              else if(msg.geojson_chunk){
                  geojsonChunks.push(msg.geojson_chunk);
              }
          };
          reader.readAsText(event.data);
      }
      else{
          //Log error, need to maybe handle this but it seems like all WebSocket transmissions of JSONs come as blobs
          console.log("Received non-blob from WebSocket: " + event.data)
      }
  });
  // Connection closed
  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed.');
  });
  
  socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      socket.close();
  });

  return socket;
}

interface ClassifyFormData {
  date: string;
  rgbImagery: String;
  nirImagery: String;
}

interface AdvancedFormData {
  rChannel: number,
  gChannel: number,
  bChannel: number,
  nirChannel: number
}

interface ClassifyFormProps {
  position: LatLng | null;
  setPosition: (position: LatLng | null) => void;
  wsStatusUpdate: Function,
  wsGeoJsonUpdate: Function
  images: string[]
}

export default function ClassifyForm(props: ClassifyFormProps) {
  const socketRef = useRef<WebSocket | null>(null);

  // One reference to the websocket, prevents multiple websocket connections
  useEffect(() => {
      if (!socketRef.current) {
          console.log("Inside websocket connect useeffect hook!");
          socketRef.current = connectWebSocket(`${ApiService.getApiServiceUrl()}/ws/classify`, props.wsStatusUpdate, props.wsGeoJsonUpdate); // configure nginx to hit webserver endpoint thru reverse proxy
      }
  }, []);

  const [formData, setFormData] = useState<ClassifyFormData>({
    date: "",
    rgbImagery: "File Upload",
    nirImagery: "File Upload",
  });
  const [advancedFormData, setAdvancedFormData] = useState<AdvancedFormData>({
    rChannel: 1,
    gChannel: 2,
    bChannel: 3,
    nirChannel: 4
  })
  const [RGBImagery, setRGBImagery] = useState<String>("Use Satellite");
  const [RGBImageryFile, setRGBImageryFile] = useState<String>("");
  const [NIRImagery, setNIRImagery] = useState<String>("File Upload");
  const [NIRImageryFile, setNIRImageryFile] = useState<String>("");
  const [errorMessage, setErrorMessage] = useState<String>("");

  const [isExpanded, setIsExpanded] = useState<Boolean>(false)
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState<Boolean>(false)

  useEffect(() => {
    setFormData({
      date: formData.date,
      rgbImagery: RGBImagery,
      nirImagery: NIRImagery,
    });
  }, [RGBImagery, NIRImagery]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdvancedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdvancedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.date) {
      setErrorMessage("Please select a date");
    } else if (RGBImagery === "File Upload" && !RGBImageryFile) {
      setErrorMessage("Please upload file for RGB Imagery");
    } else if (NIRImagery === "File Upload" && !NIRImageryFile) {
      setErrorMessage("Please upload file for NIR Imagery");
    } else if (
      NIRImagery === "Use Satellite" &&
      RGBImagery === "Use Satellite" &&
      !props.position
    ) {
      setErrorMessage("Please select a location on the map");
    } else {
      const rgb = RGBImagery === "File Upload" ? RGBImageryFile : USE_SATELLITE_OPTION
      const nir = NIRImagery === "File Upload" ? NIRImageryFile : USE_SATELLITE_OPTION
      handleClassify(rgb, nir)
      setFormData({
        date: "",
        rgbImagery: "File Upload",
        nirImagery: "File Upload",
      });
      setAdvancedFormData({
        rChannel: 1,
        gChannel: 2,
        bChannel: 3,
        nirChannel: 4
      })
      props.setPosition(null);
      setRGBImageryFile("");
      setNIRImageryFile("");
      setErrorMessage("");
      setRGBImagery("File Upload");
      setNIRImagery("File Upload");
    }
  };

  const handleClassify = (rgb: String, nir: String) => {
    // const classifyParams = {
    //     classifier_id: dataType,
    //     processor_id: modelType,
    //     image_ref: selectedImage
    // };
    if(rgb === "" || nir === ""){
      setErrorMessage("Request failed, please try again")
    }
    const classifyParams = {
      rgb_image_ref: rgb,
      nir_image_ref: nir,
      date_of_capture: formData.date,
      location: props.position,
      r_channel: advancedFormData.rChannel,
      g_channel: advancedFormData.gChannel,
      b_channel: advancedFormData.bChannel,
      nir_channel: advancedFormData.nirChannel
    }

    if (socketRef.current) {
        console.log('sending to webserver: ' + JSON.stringify(classifyParams))
        socket.send(JSON.stringify(classifyParams));
    }        
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }
  const handleCollapse = () => {
    setIsExpanded(false)
  }
  const handleAdvancedExpand = () => {
    setIsAdvancedExpanded(true)
  }
  const handleAdvancedCollapse = () => {
    setIsAdvancedExpanded(false)
  }

  const AdvancedForm = () => {
    if(isAdvancedExpanded){
      return (
        <div className="advanced-container">
          <div className="advanced-header" onClick={handleAdvancedCollapse}>
            <label>
              Advanced Options ^
            </label>
          </div>
          {formData.rgbImagery === "File Upload" && (
              <div>
                <div>
                  <label htmlFor="rChannel" className="advanced-channel-label">
                      R Channel:
                  </label>
                  <input
                    type="number"
                    id="rChannel"
                    name="rChannel"
                    value={advancedFormData.rChannel}
                    onChange={handleAdvancedChange}
                  />
                </div>
                <div>
                  <label htmlFor="gChannel" className="advanced-channel-label">
                      G Channel:
                  </label>
                  <input
                    type="number"
                    id="gChannel"
                    name="gChannel"
                    value={advancedFormData.gChannel}
                    onChange={handleAdvancedChange}
                  />
                </div>
                <div>
                  <label htmlFor="bChannel" className="advanced-channel-label">
                      B Channel:
                  </label>
                  <input
                    type="number"
                    id="bChannel"
                    name="bChannel"
                    value={advancedFormData.bChannel}
                    onChange={handleAdvancedChange}
                  />
                </div>
              </div>
            )}
            {formData.nirImagery === "File Upload" && (
              <div>
                <label htmlFor="nirChannel" className="advanced-channel-label">
                    NIR Channel:
                </label>
                <input
                  type="number"
                  id="nirChannel"
                  name="nirChannel"
                  value={advancedFormData.nirChannel}
                  onChange={handleAdvancedChange}
                />
              </div>
            )}
        </div>
      )
    }
    return (
      <div className="advanced-container" onClick={handleAdvancedExpand}>
        <label className="advanced-header">
          Advanced Options v
        </label>
      </div>
    )
  }

  if(isExpanded){
    return (
      <div className="visualization-form-container">
        <div onClick={handleCollapse}>
          <h1>New Classification ^</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="date-selection-container">
            <label htmlFor="date" className="date-label">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="imagery-container">
            <label htmlFor="rgbImagery" className="imagery-label">
              RGB Imagery
            </label>
            <Dropdown
              options={["File Upload", "Use Satellite"]}
              selected={RGBImagery}
              setSelected={setRGBImagery}
            />
            {formData.rgbImagery === "File Upload" && (
              <div>
                <Dropdown options={props.images} selected={RGBImageryFile} setSelected={setRGBImageryFile}/>
              </div>
            )}
          </div>
          <div className="imagery-container">
            <label htmlFor="nirImagery" className="imagery-label">
              NIR Imagery
            </label>
            <Dropdown
              options={["File Upload", "Use Satellite"]}
              selected={NIRImagery}
              setSelected={setNIRImagery}
            />
            {formData.nirImagery === "File Upload" && (
              <div>
                <Dropdown options={props.images} selected={NIRImageryFile} setSelected={setNIRImageryFile}/>
              </div>
            )}
          </div>
          {formData.rgbImagery === "Use Satellite" &&
            formData.nirImagery === "Use Satellite" && (
              <div className="map-selection-container">
                <label htmlFor="location" className='date-label'>Location</label>
                {props.position ? (
                  <div>
                    <p className='map-selection-message'>
                      {Math.round(props.position?.lat * 1000) / 1000},{" "}
                      {Math.round(props.position?.lng * 1000) / 1000}
                    </p>
                  </div>
                ) : (
                  <p className="map-selection-message">
                    Select a location on the map
                  </p>
                )}
              </div>
            )}
          <AdvancedForm />
          <div className="submission-container">
            <button type="submit" className="submit-button">
              Classify
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </form>
      </div>
    );
  }
  else{
    return (
      <div className="visualization-form-container" onClick={handleExpand}>
        <h1>New Classification v</h1>
      </div>
    )
  }
}
