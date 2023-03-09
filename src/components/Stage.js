import React, { useState } from 'react';
import "../assets/css/stage.css"

// notes: hooks can only be used in function components not class components
// what are class components?

export default function Stage() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    const options = ['Upload', 'Classify', 'Classifications']
    const [selected, setSelected] = useState(options[0])

    const handleSelectOption = (value) => {
        setSelected(value);
        setOpen(false);
    }
    
    return (
        <div className='stage'>
            <h1>Stage</h1>
            <div className='dropdown'>
                <div className='dropdown-button' onClick={handleOpen}>{selected}</div>
                {open && <div className='dropdown-options'>
                    {options.map(option => (
                        <div className='dropdown-option' onClick={() => handleSelectOption(option)} key={option}>
                            {option}
                        </div>
                    ))}
                </div>}
            </div>
            <div>
                {selected}
            </div>
        </div>
  )
}