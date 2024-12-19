
import { useState } from "react";
import "./customDropdown.scss";
import PropTypes from "prop-types";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

const CustomDropdown = ({ items, toggleButton }) => {
    const [isOpen, setIsOpen] = useState(false);

    const listRef = useClickOutside(() => {
        setIsOpen(false); // Close dropdown when clicking outside
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (index) => {
        if (items && items[index] && items[index].onClick) {
            items[index].onClick();
        }
        toggleDropdown();
    };

    return (
        <div className="dropdown" ref={listRef}>
            <button className='dropdown_btn' onClick={toggleDropdown}>
                {toggleButton}
            </button>
            {isOpen && (
                <div className="dropdown_content">
                    {items && items.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown_box"
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
    toggleButton: PropTypes.element,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.element,
            onClick: PropTypes.func,
        })
    ),
};
export default CustomDropdown;
