import React, { useState, useEffect } from 'react';
import "../assets/css/stage.css"
import Dropdown from "./Dropdown";
import XItemList from './XitemList';
import ApiService from '../services/ApiService';

let socket:WebSocket;

function connectWebSocket(addr: String, 
    wsStatusUpdate = (status: string, progress: string) => {}, wsGeoJsonUpdate = (json: string) => {}) {
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
  }

export default function Stage({wsStatusUpdate = (status: string, progress: string) => {}, wsGeoJsonUpdate = (json: string) => {}}) {
    connectWebSocket("localhost:8000/classify", wsStatusUpdate, wsGeoJsonUpdate);

    const options = ['Upload', 'Classify', 'Classifications']
    const dataTypes = ['Planetscope Superdove', 'Orbital Megalaser', 'Global Gigablaster']
    const modelTypes = ['XGBoost', 'Random Forest', 'Neural Network']
    //For dummy upload pipeline, starting with test file in state. Otherwise this would be empty
    const [images, setImages] = useState<string[]>(["test.png"])
    useEffect(() => {
        const imagesEndpoint = `${ApiService.getApiServiceUrl()}/images`
        fetch(imagesEndpoint, {
            method: 'GET',
            body: JSON.stringify({ 
                username: 'Edward', // TODO: pass in username
            }),
        }).then((r: any) => {
            setImages(r)
        })
    }, [])

    // state needs to be raised here because the parent needs access to selected
    // varius dropdown selections
    const [option, setOption] = useState<String>(options[0]) 
    const [dataType, setDataType] = useState<String>(dataTypes[0])
    const [modelType, setModelType] = useState<String>(modelTypes[0])
    const [selectedImage, setSelectedImage] = useState<String>(images[0])

    // file selection
    const [selectedFile, setSelectedFile] = useState<File>()

    // xlist
    const [XItems, setXItems] = useState<any[]>(['aaa', 'bbb'])

    useEffect(() => {
        const classificationsEndpoint = `${ApiService.getApiServiceUrl()}/classifications`
        fetch(classificationsEndpoint, {
            method: 'GET',
            body: JSON.stringify({
                username: 'Edward'
            })
        }).then((r: any) => {
            setXItems(r)
        })
    }, [])

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        setSelectedFile(selectedFiles?.[0]);
    }

    // function callback for upload button click
    const handleUpload = () => {
        if (!selectedFile) {
            alert('No file selected!')
        }
        console.log('Uploading file: ' + selectedFile?.name);
        setImages([... (images ?? []), ((selectedFile?.name ?? ""))]);
        let formData = new FormData();
        formData.append("image", selectedFile as File);
        console.log(formData.get("image"))
        // development endpoint
        const uploadEndpoint = `${ApiService.getApiServiceUrl()}/upload/`
        fetch(uploadEndpoint, {
            method: 'POST',
            body: formData
        });
    }

    // function callback for classify button click
    const handleClassify = () => {
        console.log(selectedImage)
        const classifyParams = {
            classifier_id: dataType,
            processor_id: modelType,
            image_ref: selectedImage
        };

        socket.send(JSON.stringify(classifyParams));
    }

    var stage = null;
    switch(option) {
        case 'Upload':
            stage = (<div className='stage-upload'>
                        <input type='file' onChange={handleSelectFile}></input>
                        <button onClick={handleUpload}>Upload</button>
                    </div>);
            break;
        case 'Classify':
            stage = (<div className='stage-classify'>
                        <label>Image</label>
                        <Dropdown options={images} selected={selectedImage} setSelected={setSelectedImage}/>
                        <label>Data Type</label>
                        <Dropdown options={dataTypes} selected={dataType} setSelected={setDataType}/>
                        <label>Model Type</label>
                        <Dropdown options={modelTypes} selected={modelType} setSelected={setModelType}/>
                        <button onClick={handleClassify}>Classify</button>
                    </div>)
            break;
        case 'Classifications':
            stage = (<div className='stage-classifications'>
                        <XItemList XItems={XItems} setXItems={setXItems}/>
                    </div>)
            break;
        default:
            break;
    }
    
    return(
        <div className='stage'>
            <h1>Current Service: {option}</h1>
            <Dropdown options={options} selected={option} setSelected={setOption}/>
            {stage}
        </div>
    )
    
}