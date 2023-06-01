import React, { useState, useEffect } from 'react';
import "../assets/css/dropdown.css";

interface DropdownProps {
    options: String[],
    selected: String,
    setSelected: (value: String)=>void
};

export default function Dropdown(props: DropdownProps) {
    const [open, setOpen] = useState<boolean>(false)

    // i don't know what type event should be
    const handleOpen = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setOpen(() => !open)
    }

    const handleSelectOption = (value: String) => {
        props.setSelected(value);
        setOpen(false);
    }

    // close the menu whenever we click outside
    useEffect(() => {
        const handler =  () => setOpen(false);
        window.addEventListener("click", handler);

        return () => {
            window.removeEventListener("click", handler);
        }
    })

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