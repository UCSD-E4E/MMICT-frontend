import React, { useState } from 'react';
import "../assets/css/stage.css"
import ApiService from '../services/ApiService';

interface UploadProps {
    images: string[],
    setImages: Function
}
export default function ImageUpload(props: UploadProps) {
    // const [images, setImages] = useState<string[]>(["test.png"])

    // file selection
    const [selectedFile, setSelectedFile] = useState<File>()
    const [isExpanded, setIsExpanded] = useState<Boolean>(false)

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
        props.setImages([... (props.images ?? []), ((selectedFile?.name ?? ""))]);
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

    const handleExpand = () => {
        setIsExpanded(true)
    }

    const handleCollapse = () => {
        setIsExpanded(false)
    }

    if(isExpanded){
        return(
            <div className='stage'>
                <div onClick={handleCollapse}>
                    <h1>Upload New Imagery ^</h1>
                </div>
                <div className='stage-upload'>
                    <input className='file-upload' type='file' onChange={handleSelectFile}></input>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className='stage' onClick={handleExpand}>
                <h1>Upload New Imagery v</h1>
            </div>
        )
    }
}