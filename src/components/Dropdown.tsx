import React, { useState } from 'react';
import "../assets/css/dropdown.css";

interface DropdownProps {
    options: String[],
    selected: String,
    setSelected: (value: String)=>void
};

export default function Dropdown(props: DropdownProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    const handleSelectOption = (value: String) => {
        props.setSelected(value);
        setOpen(false);
    }

    return (
        <div className='dropdown'>
            <div className='dropdown-button' onClick={handleOpen}>{props.selected}</div>
            {open && <div className='dropdown-options'>
                {React.Children.map(props.options, (option) => (
                    <div className='dropdown-option' onClick={() => handleSelectOption(option)}>
                        {option}
                    </div>
                ))}
            </div>}
        </div>
    )
}