import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import infoCircle from "../../assets/info-circle.png"
import addIcon from "../../assets/add-icon.png"
import arrowDown from "../../assets/arrow-down.png"
import './select.scss'
import { useClickOutside } from '../../utils/hooks/useClickOutside';
import { Tooltip } from 'react-tooltip';

const Select = ({
    name,
    value = '',
    options = [],
    placeholder,
    hasAddButton,
    addButtonLabel,
    showAllOption=false,
    allOptionText='',
    onAdd = () => { },
    onChange = () => { },
}) => {
    const [currentOption, setcurrentOption] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const listRef = useClickOutside(() => {
        setIsOpen(false)
    })
    const optionData = options?.find((item) => item.value === currentOption)

    const handleClickLabel = () => {
        setIsOpen(!isOpen)
    }

    const handleSelectOption = (selectedOption) => {
        onChange(selectedOption)
        setcurrentOption(selectedOption.value)
        setIsOpen(false)
    }

    useEffect(() => {
        setcurrentOption(value)
    }, [value])


    return (
        <div
            className="select_wrapper"
        >
            <div
                className="custom_select_field"
                onClick={handleClickLabel}
            >
                {
                    optionData ? <>{<span className='custom_select_label'> {optionData.label}</span>}</> : <><span className='custom_select_placeholder'> {placeholder ?? 'Select'}</span></>
                }
                {
                    optionData?.tooltip && <div
                        className='label_tooltip'
                        id={`select_${name ?? ''}_label`}
                    >
                        <img src={infoCircle} alt="" />
                        <Tooltip
                            place="top"
                            style={{
                                maxWidth: '200px',
                                boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                background: 'rgba(79, 79, 79, 1)',
                                opacity: '1',
                            }}
                            anchorSelect={`#select_${name ?? ''}_label`}
                        >
                            {optionData.tooltip}
                        </Tooltip>
                    </div>
                }
                <div className='down-arrow'>
                    <img src={arrowDown} alt="" />
                </div>
            </div>
            <div
                className={`custom_select_list ${isOpen ? 'active' : ''}`}
                ref={listRef}
            >
                <ul>
                    {
                        options.map((opt, index) => {
                            return (
                                <li key={opt.value} onClick={() => handleSelectOption(opt)}>
                                    {opt.label}
                                    {opt.tooltip && <div id={`select_${name ?? ''}_${index}`} className="tooltip">
                                        <img src={infoCircle} alt="" />
                                        <Tooltip
                                            place="top"
                                            style={{
                                                maxWidth: '200px',
                                                boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                background: 'rgba(79, 79, 79, 1)',
                                                opacity: '1',
                                            }}
                                            anchorSelect={`#select_${name ?? ''}_${index}`}
                                        >
                                            {opt.tooltip}
                                        </Tooltip>
                                    </div>}
                                </li>
                            )
                        })
                    }
                    {showAllOption && <li key={'all'} onClick={() => handleSelectOption({label:allOptionText,
                        value:'All'
                    })}>
                        {allOptionText}
                    </li>}
                </ul>
                {hasAddButton && <button
                    className="add_new_angle_btn"
                    onClick={onAdd}
                >
                    {addButtonLabel ?? 'Add'}
                    <img src={addIcon} alt="" />
                </button>}
            </div>
        </div >
    )
}

Select.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    hasAddButton: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    onAdd: PropTypes.func,
    showAllOption: PropTypes.bool,
    allOptionText: PropTypes.string,
}
export default Select