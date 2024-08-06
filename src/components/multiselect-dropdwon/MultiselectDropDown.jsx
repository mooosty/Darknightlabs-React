import PropTypes from 'prop-types';
import { useState } from 'react';
import arrowDown from "../../assets/arrow-down.png"
import './multiselectDropDown.scss'
import { useClickOutside } from '../../utils/hooks/useClickOutside';

const MultiselectDropDown = ({
    options = [],
    placeholder,
    onApply = () => { },
}) => {
    const [currentOptions, setCurrentOptions] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const listRef = useClickOutside(() => {
        setIsOpen(false)
    })

    const handleSelectOption = (selectedOption) => {
        let selectedOptions = [...currentOptions]
        if (selectedOptions.find((item) => item.value === selectedOption.value)) {
            selectedOptions = selectedOptions.filter((item) => item.value !== selectedOption.value)
        } else {
            selectedOptions = [...selectedOptions, selectedOption]
        }
        setCurrentOptions(selectedOptions)
    }

    const handleClickLabel = () => {
        setIsOpen(!isOpen)
        onApply(currentOptions)
    }

    return (
        <>
            <div className="multiselect_wrapper" >
                <div
                    className="multiselect_field"
                    onClick={handleClickLabel}
                >
                    <span>{placeholder}</span>
                    <div className='down-arrow'>
                        <img src={arrowDown} alt="" />
                    </div>
                </div>
                <div
                    className={`multiselect_list ${isOpen ? 'active' : ''}`}
                    ref={listRef}
                >
                    <div className="mobile_multiselect_wrapper" >
                        <ul>
                            <div className="multiselect_header">Select synergies angles</div>
                            <div className='list_items'>
                                {
                                    options.map((opt) => {
                                        return (
                                            <>
                                                <li
                                                    key={opt.value}
                                                    onClick={() => handleSelectOption(opt)}
                                                >
                                                    <div className="costum_checkbox">
                                                        <input type="checkbox" id={`tableName_${opt.value}`} className='costum_checkbox_input' />
                                                        <label htmlFor={`tableName_${opt.value}`} className='costum_checkbox_label'>
                                                            <div className="mark"></div>
                                                            <span> {opt.label}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="btn_box">
                                <button className='apply_btn' onClick={handleClickLabel}>
                                    Apply
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}

MultiselectDropDown.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    hasAddButton: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    onApply: PropTypes.func,
}
export default MultiselectDropDown