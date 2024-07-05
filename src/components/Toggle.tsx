import React, {useEffect, useState} from 'react';
import "../assets/css/toggle.css";

interface ToggleProps {
    showGeojsons: Boolean[] // React.MutableRefObject<Boolean[]>
    setShowGeojsons: Function
    // toggleFn: Function
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
    const [options, setOptions] = useState<Checkbox[]>([])

    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index].isChecked = !options[index].isChecked
        setOptions(newOptions)
        const newGeojsons = [...props.showGeojsons]
        newGeojsons[index] = newOptions[index].isChecked
        props.setShowGeojsons(newGeojsons)
    }

    useEffect(() =>{
        //Some strange workarounds here for the time being; when the new frontend stuff is done this should be returned to
        if(props.showGeojsons.length > 0){
            const newOptions = [...(options ?? []), {label: 'GeoJSON ' + (options.length + 1), isChecked: true}]
            setOptions(newOptions)
        }
    }, [props.showGeojsons.length])

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