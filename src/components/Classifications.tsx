import React, {useEffect, useState} from 'react';
import "../assets/css/Classifications.css";

interface ClassificationsProps {
    showGeojsons: Boolean[],
    setShowGeojsons: Function
}

interface Checkbox {
    label: string,
    isChecked: boolean,
}

export default function Classifications(props: ClassificationsProps){
    const [options, setOptions] = useState<Checkbox[]>([])
    const [isExpanded, setIsExpanded] = useState<Boolean>(true)

    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index].isChecked = !options[index].isChecked
        setOptions(newOptions)
        const newGeojsons = [...props.showGeojsons]
        newGeojsons[index] = newOptions[index].isChecked
        props.setShowGeojsons(newGeojsons)
    }

    const handleExpand = () => {
        setIsExpanded(true)
    }

    const handleCollapse = () => {
        setIsExpanded(false)
    }

    useEffect(() =>{
        if(props.showGeojsons.length > options.length){
            const newOptions = [...(options ?? []), {label: 'GeoJSON ' + (options.length + 1), isChecked: true}]
            setOptions(newOptions)
        }
    }, [props.showGeojsons.length])

    const NoClassifications = () => {
        if(options.length === 0){
            return (
                <div className='no-classifications-text'>
                    <h2>No classifications to show</h2>
                </div>
            )
        }
        return null
    }
    if(isExpanded){
        return (
            <div className='classifications-container'>
                <div className='service-title'onClick={handleCollapse}>
                    <h1>My Classifications ^</h1>
                </div>
                <NoClassifications/>
                {options.map((option, index) => (
                    <div className='element-container' key={index}>
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
    else{
        return (
            <div className='classifications-container' onClick={handleExpand}>
                <h1 className='service-title'>My Classifications v</h1>
            </div>
        )
    }
}