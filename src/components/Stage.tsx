// Hard code labels for the buttons
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React, { useState, useEffect } from "react";

import "../assets/css/stage.css";
import ApiService from "../services/ApiService";

import Dropdown from "./Dropdown";
import XItemList from "./XitemList";

let socket: WebSocket;

// Callback for status updates
function wsStatusUpdate(status: string) {
  console.log(`status is now:${status}`);
}
// Callback for geojson
function receiveGeoJson(geojson: string) {
  console.log("recieved geojson");
}

function connectWebSocket(addr: string) {
  // WebSocket connection
  socket = new WebSocket(`ws://${addr}`);

  // Connection opened
  socket.addEventListener("open", () => {
    // this is where you can allow things to be sent on the websocket
    console.log("WebSocket connection established.");
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log(event.data);
    const msg = JSON.parse(event.data);
    // call callbacks
    wsStatusUpdate(msg.status);
    if (msg.geojson) {
      receiveGeoJson(msg.geojson);
    }
    console.log("Received message:", msg);
  });
  // Connection closed
  socket.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
  });
}

export default function Stage() {
  connectWebSocket(ApiService.getApiServiceUrl());

  const options = ["Upload", "Classify", "Classifications"];
  const dataTypes = [
    "Planetscope Superdove",
    "Orbital Megalaser",
    "Global Gigablaster",
  ];
  const modelTypes = ["XGBoost", "Random Forest", "Neural Network"];
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imagesEndpoint = `${ApiService.getApiServiceUrl()}/images`;
    fetch(imagesEndpoint, {
      method: "GET",
      body: JSON.stringify({
        // Pass in username
        username: "Edward",
      }),
    }).then((ret: any) => {
      setImages(ret);
    });
  }, []);

  // state needs to be raised here because the parent needs access to selected
  // varius dropdown selections
  const [option, setOption] = useState<string>(options[0]);
  const [dataType, setDataType] = useState<string>(dataTypes[0]);
  const [modelType, setModelType] = useState<string>(modelTypes[0]);
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  // file selection
  const [selectedFile, setSelectedFile] = useState<File>();

  // xlist
  const [XItems, setXItems] = useState<any[]>(["aaa", "bbb"]);

  useEffect(() => {
    const classificationsEndpoint = `${ApiService.getApiServiceUrl()}/classifications`;
    fetch(classificationsEndpoint, {
      method: "GET",
      body: JSON.stringify({
        username: "Edward",
      }),
    }).then((ret: any) => {
      setXItems(ret);
    });
  }, []);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFile(selectedFiles?.[0]);
  };

  // function callback for upload button click
  const handleUpload = () => {
    if (!selectedFile) {
      // Add custom alert UI later
      // eslint-disable-next-line no-alert
      alert("No file selected!");
    }

    console.log(`Uploading file: ${selectedFile?.name}`);

    const formData = new FormData();
    formData.append("image", selectedFile as File);

    // development endpoint
    const uploadEndpoint = `${ApiService.getApiServiceUrl()}/upload/`;
    fetch(uploadEndpoint, {
      method: "POST",
      body: formData,
    });
  };

  // function callback for classify button click
  const handleClassify = () => {
    const classifyParams = {
      classifierId: dataType,
      processerId: modelType,
      imageRef: selectedImage,
    };

    socket.send(JSON.stringify(classifyParams));
  };

  let stage = null;
  switch (option) {
    case "Upload":
      stage = (
        <div className="stage-upload">
          <h1>Upload</h1>
          <input type="file" aria-label="file" onChange={handleSelectFile} />
          <button type="submit" onClick={handleUpload}>
            Upload
          </button>
        </div>
      );
      break;
    case "Classify":
      stage = (
        <div className="stage-classify">
          <h1>Classify</h1>
          <label htmlFor="Image">
            Image
            <input type="text" aria-label="image" autoComplete="" />
          </label>
          <Dropdown
            options={images}
            selected={selectedImage}
            setSelected={setSelectedImage}
          />
          <label htmlFor="dataType">
            Data Type
            <input type="text" aria-label="dataType" autoComplete="" />
          </label>
          <Dropdown
            options={dataTypes}
            selected={dataType}
            setSelected={setDataType}
          />
          <label htmlFor="modelType">
            Model Type
            <input type="text" aria-label="modelType" autoComplete="" />
          </label>
          <Dropdown
            options={modelTypes}
            selected={modelType}
            setSelected={setModelType}
          />
          <button type="submit" onClick={handleClassify}>
            Classify
          </button>
        </div>
      );
      break;
    case "Classifications":
      stage = (
        <div className="stage-classifications">
          <h1>Classifications</h1>
          <XItemList XItems={XItems} setXItems={setXItems} />
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="stage">
      <Dropdown options={options} selected={option} setSelected={setOption} />
      {stage}
    </div>
  );
}
