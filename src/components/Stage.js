import React, { useState } from 'react';
import "../assets/css/stage.css"

// notes: hooks can only be used in function components not class components
// what are class components?

export default function Stage() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    const options = ['Upload', 'Classify', 'Classifications']
    const [selected, setSelected] = useState(options[0])

    const handleSelectOption = (value) => {
        setSelected(value);
        setOpen(false);
    }

    const [selectedFile, setSelectedFile] = useState(null)

    const handleSelectFile = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        console.log('Uploading file: ' + selectedFile.name);
    }

    var stage = null;
    switch(selected) {
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
                    <div>Dropdown</div>
                    <label>Model Type</label>
                    <div>Dropdown</div>
                    <button>Classify</button>
                </div>)
        break;
    } 
    
    return (
        <div className='stage'>
            <h1>Stage</h1>
            <div className='dropdown'>
                <div className='dropdown-button' onClick={handleOpen}>{selected}</div>
                {open && <div className='dropdown-options'>
                    {options.map(option => (
                        <div className='dropdown-option' onClick={() => handleSelectOption(option)} key={option}>
                            {option}
                        </div>
                    ))}
                </div>}
            </div>
            {stage}
        </div>
  )
}