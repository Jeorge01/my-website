import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, language, onChange }) => {
  const initialOption = options.find(
    (option) => option.label.toLowerCase() === language.toLowerCase()
  );
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.label.toLowerCase()); // Call the onChange function with the selected option's label in lowercase
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div
        className={`select-selected ${isOpen ? "open" : "closed"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          {selectedOption.image && (
            <img
              src={selectedOption.image}
              alt={selectedOption.label}
              style={{
                width: "20px",
                height: "20px",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
              draggable="false"
            />
          )}
          {selectedOption.label}
        </div>

        <img
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          src="/icons/chevron-down.svg"
          alt="arrow"
          style={{
            width: "20px",
            height: "20px",
            verticalAlign: "middle",
            marginRight: "8px",
          }}
          draggable="false"
        />
      </div>
      {isOpen && (
        <div className={`select-items ${isOpen ? "open" : ""}`}>
          {options
            .filter(
              (option) =>
                option.label.toLowerCase() !==
                selectedOption.label.toLowerCase()
            )
            .map((option, index) => (
              <div key={index} onClick={() => handleSelect(option)}>
                <img src={option.image} alt={option.label} draggable="false"/>
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
