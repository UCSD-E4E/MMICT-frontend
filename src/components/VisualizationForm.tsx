import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Dropdown from "./Dropdown";

interface VisualizationFormData {
  date: string;
  location: string;
  rgbImagery: String;
  nirImagery: String;
}

export default function VisualizationForm() {
  const [formData, setFormData] = useState<VisualizationFormData>({
    date: "",
    location: "",
    rgbImagery: "Use Satellite Provider",
    nirImagery: "Use File Upload",
  });
  const [RGBImagery, setRGBImagery] = useState<String>("");
  const [RGBImageryFile, setRGBImageryFile] = useState<File>();
  const [NIRImagery, setNIRImagery] = useState<String>("");
  const [NIRImageryFile, setNIRImageryFile] = useState<File>();

  useEffect(() => {
    setFormData({
      date: formData.date,
      location: formData.location,
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

  const handleRGBFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    const selectedFiles = files as FileList;
    setRGBImageryFile(selectedFiles?.[0]);
  }

  const handleNIRFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    const selectedFiles = files as FileList;
    setNIRImageryFile(selectedFiles?.[0]);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      date: "",
      location: "",
      rgbImagery: "",
      nirImagery: "",
    });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        fontSize: "20px",
        marginTop: "40px",
        marginLeft: "6%",
        marginRight: "3%",
        padding: "10px",
        border: "2px solid black",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="rgbImagery">RGB Imagery:</label>
          <Dropdown
            options={["File Upload", "Use Satellite Imagery"]}
            selected={RGBImagery}
            setSelected={setRGBImagery}
          />
          {formData.rgbImagery === "File Upload" && (
            <div className="upload">
              <input type="file" onChange={handleRGBFileChange}></input>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="nirImagery">NIR Imagery:</label>
          <Dropdown
            options={["File Upload", "Use Satellite Imagery"]}
            selected={NIRImagery}
            setSelected={setNIRImagery}
          />
          {formData.nirImagery === "File Upload" && (
            <div className="upload">
              <input type="file" onChange={handleNIRFileChange}></input>
            </div>
          )}
        </div>
        {formData.rgbImagery === "Use Satellite Imagery" &&
          formData.nirImagery === "Use Satellite Imagery" && (
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
