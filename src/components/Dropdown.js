import React, { useState } from 'react';
import "../assets/css/dropdown.css";

// props = {
//     options: [],
//     selected: '',
//     setSelected: function
// }
export default function Dropdown(props) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    const handleSelectOption = (value) => {
        props.setSelected(value);
        setOpen(false);
    }

    return (
        <div className='dropdown'>
            <div className='dropdown-button' onClick={handleOpen}>{props.selected}</div>
            {open && <div className='dropdown-options'>
                {props.options.map(option => (
                    <div className='dropdown-option' onClick={() => handleSelectOption(option)} key={option}>
                        {option}
                    </div>
                ))}
            </div>}
        </div>
    )
}