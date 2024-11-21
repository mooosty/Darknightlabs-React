import PropTypes from 'prop-types';
import { useState } from 'react';
import arrowDown from "../../assets/arrow-down.png";
import './multiselectDropDown.scss';
import { useClickOutside } from '../../utils/hooks/useClickOutside';

const MultiselectDropDown = ({
    options = [],
    placeholder = "Select options",
    onApply = () => { },
}) => {
    const [currentOptions, setCurrentOptions] = useState([]); // Selected options
    const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
    const listRef = useClickOutside(() => {
        setIsOpen(false); // Close dropdown when clicking outside
    });

    // Handle option selection
    const handleSelectOption = (selectedOption) => {
        setCurrentOptions((prevOptions) => {
            const isSelected = prevOptions.some((item) => item.value === selectedOption.value);
            if (isSelected) {
                // Remove option if already selected
                return prevOptions.filter((item) => item.value !== selectedOption.value);
            } else {
                // Add option if not already selected
                return [...prevOptions, selectedOption];
            }
        });
    };

    // Toggle dropdown open/close
    const handleClickLabel = () => {
        setIsOpen((prev) => !prev);
    };

    // Apply selected options and close dropdown
    const handleApplySelection = () => {
        onApply(currentOptions);
        setIsOpen(false);
    };

    return (
        <div className="multiselect_wrapper">
            {/* Dropdown field to display placeholder and open dropdown */}
            <div
                className="multiselect_field"
                onClick={handleClickLabel}
            >
                <span>{placeholder}</span>
                <div className='down-arrow'>
                    <img src={arrowDown} alt="arrow down" />
                </div>
            </div>

            {/* Dropdown list */}
            {isOpen && (
                <div
                    className={`multiselect_list ${isOpen ? 'active' : ''}`}
                    ref={listRef}
                >
                    <div className="mobile_multiselect_wrapper">
                        <ul>
                            <div className="multiselect_header">Select synergies angles</div>
                            <div className='list_items'>
                                {options.map((opt) => {
                                    const isChecked = currentOptions.some(item => item.value === opt.value);
                                    return (
                                        <li key={opt.value}>
                                            <div className="costum_checkbox">
                                                <input
                                                    type="checkbox"
                                                    id={`tableName_${opt.value}`}
                                                    className='costum_checkbox_input'
                                                    checked={isChecked}
                                                    onChange={() => handleSelectOption(opt)} // Toggle selection
                                                />
                                                <label htmlFor={`tableName_${opt.value}`} className='costum_checkbox_label'>
                                                    <div className="mark"></div>
                                                    <div className="opt_label" title={opt.label}>{opt.label}</div>
                                                </label>
                                            </div>
                                        </li>
                                    );
                                })}
                            </div>
                            {/* Apply button to finalize selection */}
                            <div className="btn_box">
                                <button className='apply_btn' onClick={handleApplySelection}>
                                    Apply
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

MultiselectDropDown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
    onApply: PropTypes.func, // Callback to handle selected options
};

export default MultiselectDropDown;
