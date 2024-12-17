
import { useState } from "react";
import "./customDropdown.scss";
import PropTypes from "prop-types";

const CustomDropdown = ({ isOpen, toggleDropdown, items }) => {

    const handleClick = (index) => {
        if (items && items[index] && items[index].onClick) {
            items[index].onClick();
        }
        toggleDropdown();
    };

    return (

        <div className="dropdown">
            {isOpen && (
                <div className="dropdown-content">
                    {items && items.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-box"
                            onClick={() => handleClick(index)}
                        >
                            <span> {item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

CustomDropdown.propTypes = {
    isOpen: PropTypes.bool,
    toggleDropdown: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
};
export default CustomDropdown;
