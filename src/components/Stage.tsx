import React, { useState, useEffect } from 'react';
import "../assets/css/stage.css"
import Dropdown from "./Dropdown";
import XItemList from './XitemList';
import ApiService from '../services/ApiService';
import { useAuth0 } from "@auth0/auth0-react";

let socket:WebSocket;

// Callback for status updates
function wsStatusUpdate(status: String){
    console.log("status is now:" + status)
}
// Callback for geojson
function receiveGeoJson(geojson: String){
    console.log("recieved geojson")
}

function connectWebSocket(addr: String) {
    // WebSocket connection
    socket = new WebSocket(`ws://${addr}`);

    // Connection opened
    socket.addEventListener('open', () => {
      // this is where you can allow things to be sent on the websocket
      console.log('WebSocket connection established.');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log(event.data)
      const msg = JSON.parse(event.data)
      // call callbacks
      wsStatusUpdate(msg.status) 
      if(msg.geojson){
          receiveGeoJson(msg.geojson)
      }
      console.log('Received message:', msg);
    });
    // Connection closed
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed.');
    });
  }

export default function Stage() {
    connectWebSocket(ApiService.getApiServiceUrl());
    const [userId, setUserId] = useState<String>('');
    const { user} = useAuth0();

    const options = ['Upload', 'Classify', 'Classifications']
    const dataTypes = ['Planetscope Superdove', 'Orbital Megalaser', 'Global Gigablaster']
    const modelTypes = ['XGBoost', 'Random Forest', 'Neural Network']
    const [images, setImages] = useState<String[]>([])

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

    //useEffect which uses setUserId to set the userId state variable
    // this is used in uploading the file
    useEffect(() => {
        if(user) {
            setUserId(user.sub?.split("|")[1] || "");
        }
    }, []);

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

        let formData = new FormData();
        formData.append("image", selectedFile as File);
        formData.append("userid", userId.toString());

        // development endpoint
        const uploadEndpoint = `${ApiService.getApiServiceUrl()}/upload/`
        fetch(uploadEndpoint, {
            method: 'POST',
            body: formData
        });
    }

    // function callback for classify button click
    const handleClassify = () => {

        const classifyParams = {
            classifier_id: dataType,
            processer_id: modelType,
            image_ref: selectedImage
        };

        socket.send(JSON.stringify(classifyParams));
    }

    var stage = null;
    switch(option) {
        case 'Upload':
            stage = (<div className='stage-upload'>
                        <input type='file' onChange={handleSelectFile}></input>
                        <button onClick={handleUpload}>Submit</button>
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