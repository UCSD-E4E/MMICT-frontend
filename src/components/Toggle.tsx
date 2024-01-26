import React, {useState} from 'react';
import "../assets/css/toggle.css";

interface ToggleProps {
    showGeojsons: Boolean[],
    setShowGeojsons: (geojsons: Boolean[]) => void,
}

interface Checkbox {
    label: string,
    isChecked: boolean,
}

export default function Toggle(props: ToggleProps){
    const initialOptions = [
        {label: 'GeoJSON 1 (Jamaica)', isChecked: false},
        {label: 'GeoJSON 2 (Jamaica)', isChecked: false},
    ]
    const [options, setOptions] = useState<Checkbox[]>(initialOptions)

    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index].isChecked = !options[index].isChecked
        setOptions(newOptions)
        const newGeojsons = [...props.showGeojsons]
        newGeojsons[index] = newOptions[index].isChecked
        props.setShowGeojsons(newGeojsons)
    }

    return (
        <div className='toggle'>
            {options.map((option, index) => (
                <div key={index}>
                <input
                type="checkbox"
                checked={option.isChecked}
                onChange={handleCheckboxChange(index)}
                />
                {' ' + option.label}
                </div>
            ))}
        </div>
    )
}