import React, { useState } from 'react';
import "../assets/css/stage.css"
import Dropdown from "../components/Dropdown.js";

// notes: hooks can only be used in function components not class components
// what are class components?

export default function Stage() {

    const options = ['Upload', 'Classify', 'Classifications']
    const dataTypes = ['Planetscope Superdove', 'Orbital Megalaser', 'Global Gigablaster']
    const modelTypes = ['XGBoost', 'Random Forest', 'Neural Network']

    // state needs to be raised here because the parent needs access to selected
    const [option, setOption] = useState(options[0])
    const [dataType, setDataType] = useState(dataTypes[0])
    const [modelType, setModelType] = useState(modelTypes[0])

    const [selectedFile, setSelectedFile] = useState(null)

    const handleSelectFile = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        console.log('Uploading file: ' + selectedFile.name);

        let formData = new FormData();
        formData.append("image", selectedFile);

        // development endpoint
        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData
        });
    }

    var stage = null;
    switch(option) {
        case 'Upload':
            stage = (<div className='stage-upload'>
                        <h1>Upload</h1>
                        <input type='file' onChange={handleSelectFile}></input>
                        <button onClick={handleUpload}>Upload</button>
                    </div>);
            break;
        case 'Classify':
            stage = (<div className='stage-classify'>
                        <h1>Classify</h1>
                        <label>Data Type</label>
                        <Dropdown options={dataTypes} selected={dataType} setSelected={setDataType}/>
                        <label>Model Type</label>
                        <Dropdown options={modelTypes} selected={modelType} setSelected={setModelType}/>
                        <button>Classify</button>
                    </div>)
            break;
        case 'Classifications':
            stage = (<div className='stage-classifications'>
                        <h1>Classifications</h1>
                        <div>
                            <label>Xgb-2-16-23.shp</label>
                            <button>X</button>
                        </div>
                    </div>)
            break;
    }
    
    return (
        <div className='stage'>
            <h1>Stage</h1>
            <Dropdown options={options} selected={option} setSelected={setOption}/>
            {stage}
        </div>
  )
}