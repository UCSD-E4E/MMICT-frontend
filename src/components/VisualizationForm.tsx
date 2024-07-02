import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import type { LatLng } from "leaflet";
import "../assets/css/VisualizationForm.css";

interface VisualizationFormData {
  date: string;
  rgbImagery: String;
  nirImagery: String;
}

interface VisualizationFormProps {
  position: LatLng | null;
  setPosition: (position: LatLng | null) => void;
}

export default function VisualizationForm(props: VisualizationFormProps) {
  const [formData, setFormData] = useState<VisualizationFormData>({
    date: "",
    rgbImagery: "Use Satellite",
    nirImagery: "File Upload",
  });
  const [RGBImagery, setRGBImagery] = useState<String>("Use Satellite");
  const [RGBImageryFile, setRGBImageryFile] = useState<File | null>(null);
  const [NIRImagery, setNIRImagery] = useState<String>("File Upload");
  const [NIRImageryFile, setNIRImageryFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<String>("");

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

  const handleRGBFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    setRGBImageryFile(selectedFiles?.[0]);
  };

  const handleNIRFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    setNIRImageryFile(selectedFiles?.[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

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
      setFormData({
        date: "",
        rgbImagery: "",
        nirImagery: "",
      });
      props.setPosition(null);
      setRGBImageryFile(null);
      setNIRImageryFile(null);
      setErrorMessage("");
      setRGBImagery("");
      setNIRImagery("");
    }
  };
  return (
    <div className="visualization-form-container">
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
            <div className="upload file-upload">
              <input type="file" onChange={handleRGBFileChange}></input>
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
            <div className="upload file-upload">
              <input type="file" onChange={handleNIRFileChange}></input>
            </div>
          )}
        </div>
        {formData.rgbImagery === "Use Satellite" &&
          formData.nirImagery === "Use Satellite" && (
            <div className="map-selection-container">
              <label htmlFor="location">Location</label>
              {props.position ? (
                <div>
                  <p>
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
        <div className="submission-container">
          <button type="submit" className="submit-button">
            Submit
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
