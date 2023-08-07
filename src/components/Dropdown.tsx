// Don't need keyboard alternatives for mouse click events
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import "../assets/css/dropdown.css";

interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  // i don't know what type event should be
  const handleOpen = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setOpen(() => !open);
  };

  const handleSelectOption = (value: string) => {
    props.setSelected(value);
    setOpen(false);
  };

  // close the menu whenever we click outside
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <div className="dropdown">
      <div className="dropdown-button" onClick={handleOpen}>
        {props.selected}
      </div>
      {open && (
        <div className="dropdown-options">
          {React.Children.map(props.options, (option) => (
            <div
              className="dropdown-option"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
