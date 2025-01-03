
import "./customFooterDropdown.scss";
import PropTypes from "prop-types";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useState } from "react";

const CustomFooterDropdown = ({ items, toggleButton, position = "top_right" }) => {
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
                <div className={`dropdown_content ${position}`}
                >
                    {items && items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className="dropdown_box">
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

CustomFooterDropdown.propTypes = {
    toggleButton: PropTypes.element,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.element,
            onClick: PropTypes.func,
        })
    ),
    position: PropTypes.oneOf(['bottom_right', 'bottom_left', 'top_right', 'top_left'])
};
export default CustomFooterDropdown;
