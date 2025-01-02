import './select.scss'
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import { useClickOutside } from '../../utils/hooks/useClickOutside';
import { PlusIcon, DownIcon, InfoCircleIcon } from '../../utils/constants/images';

const Select = ({
    name,
    value = '',
    options = [],
    placeholder,
    hasAddButton,
    addButtonLabel,
    showAllOption = false,
    allOptionText = '',
    onAdd = () => { },
    onChange = () => { },
    disable = false,
    isSearchable = false
}) => {
    const [currentOption, setcurrentOption] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const listRef = useClickOutside(() => {
        setIsOpen(false)
    })
    const optionData = options?.find((item) => item.value === currentOption)
    
    const handleClickLabel = () => {
        if (!disable)
            setIsOpen(!isOpen)
    }

    const handleSelectOption = (selectedOption) => {
        onChange(selectedOption)
        setcurrentOption(selectedOption.value)
        setIsOpen(false)
        setSearchTerm('')
    }

    const filteredOptions = searchTerm 
        ? options.filter(opt => 
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options

    useEffect(() => {
        setcurrentOption(value)
    }, [value])

    return (
        <div
            className={`select_wrapper ${disable && 'disable'}`}
            ref={listRef}
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
                        <InfoCircleIcon />
                        <Tooltip
                            place="top"
                            style={{
                                maxWidth: '200px',
                                boxShadow: '0px 3px 10.3px -4px #e5e5e5',
                                background: '#4f4f4f',
                                opacity: '1',
                            }}
                            anchorSelect={`#select_${name ?? ''}_label`}
                        >
                            {optionData.tooltip}
                        </Tooltip>
                    </div>
                }
                <div className='down-arrow'>
                    <DownIcon />
                </div>
            </div>
            <div
                className={`custom_select_list ${isOpen ? 'active' : ''}`}
            >
                {isSearchable && (
                    <div className="select_search">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
                <ul>
                    {
                        filteredOptions.map((opt, index) => {
                            return (
                                <li key={opt.value} onClick={() => handleSelectOption(opt)}>
                                    {opt.label}
                                    {opt.tooltip && <div id={`select_${name ?? ''}_${index}`} className="tooltip">
                                        <InfoCircleIcon />
                                        <Tooltip
                                            place="top"
                                            style={{
                                                maxWidth: '200px',
                                                boxShadow: '0px 3px 10.3px -4px #e5e5e5',
                                                background: '#4f4f4f',
                                                opacity: '1',
                                                zIndex:1000000
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
                    {showAllOption && <li key={'all'} onClick={() => handleSelectOption({
                        label: allOptionText,
                        value: 'All'
                    })}>
                        {allOptionText}
                    </li>}
                </ul>
                {hasAddButton && <button
                    className="add_new_angle_btn"
                    onClick={onAdd}
                >
                    {addButtonLabel ?? 'Add'}
                    <PlusIcon />
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
    disable: PropTypes.bool,
    isSearchable: PropTypes.bool
}
export default Select