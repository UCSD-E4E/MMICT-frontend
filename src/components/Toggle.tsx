import React, {useState} from 'react';
import "../assets/css/toggle.css";

interface ToggleProps {
    geojsonStyles: GeojsonStyle[],
    setGeojsonStyles: (geojsons: GeojsonStyle[]) => void,
}

interface Options {
    label: string,
    isChecked: boolean,
    color: string
}

interface GeojsonStyle {
    show: boolean,
    color: string,
  }

export default function Toggle(props: ToggleProps){
    const initialOptions = [
        {label: 'GeoJSON 1 (Jamaica)', isChecked: false, color: "blue"},
        {label: 'GeoJSON 2 (Jamaica)', isChecked: false, color: "green"},
    ]
    const [options, setOptions] = useState<Options[]>(initialOptions)

    const colors = ["black", "silver", "gray", "maroon", "red", "purple",
        "green", "olive", "navy", "blue", "teal",
    ]

    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index].isChecked = !options[index].isChecked
        setOptions(newOptions)
        const newGeojsonStyles = [...props.geojsonStyles]
        newGeojsonStyles[index].show = newOptions[index].isChecked
        props.setGeojsonStyles(newGeojsonStyles)
    }

    const handleColorChange = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newColor = event.target.value
        
        const newOptions = [...options]
        newOptions[index].color = newColor
        newOptions[index].isChecked = true

        setOptions(newOptions)
        
        const newGeojsonStyles = [...props.geojsonStyles]
        newGeojsonStyles[index].color = newOptions[index].color
        newGeojsonStyles[index].show = true
        props.setGeojsonStyles(newGeojsonStyles)
    }

    return (
        <div className='toggle'>
            {options.map((option, index) => (
                <div key={index}>
                <input
                type="checkbox"
                checked={option.isChecked}
                onChange={handleCheckboxChange(index)}
                className='toggle-checkbox'
                />
                {' ' + option.label}
                <select
                value={option.color}
                onChange={handleColorChange(index)}
                className='toggle-dropdown'
                >
                {colors.map((color, index) => (
                    <option key={index} value={color}>
                    {color}
                    </option>
                ))}
                </select>
                </div>
            ))}
        </div>
    )
}