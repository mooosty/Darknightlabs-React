import './Multiselect.scss'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useClickOutside } from '../../utils/hooks/useClickOutside';
import { PlusIcon, DownIcon } from '../../utils/constants/images';

const Multiselect = ({
    options = [],
    placeholder,
    hasAddButton,
    addButtonLabel,
    value = [],
    onAdd = () => { },
    onChange = () => { },
    limit = null
}) => {
    const [currentOptions, setCurrentOptions] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const listRef = useClickOutside(() => {
        setIsOpen(false)
    })

    const handleClickLabel = () => {
        setIsOpen(!isOpen)
    }
    const handleSelectOption = (selectedOption) => {
        let selectedOptions = [...currentOptions]
        if (selectedOptions.find((item) => item.value === selectedOption.value)) {

            selectedOptions = selectedOptions.filter((item) => item.value !== selectedOption.value)
        } else {
            if (limit !== null && selectedOptions.length < limit) {
                selectedOptions = [...selectedOptions, selectedOption]
            } else if (limit == null)
                selectedOptions = [...selectedOptions, selectedOption]
        }
        onChange(selectedOption.value)
        setCurrentOptions([...selectedOptions])
    }

    useEffect(() => {
        setCurrentOptions([...value.map((item) => {
            return {
                label: item.label,
                value: item.value
            }
        })
        ])
    }, [JSON.stringify(value)])

    return (
        <div
            className="multiselect_wrapper"
                ref={listRef}
        >
            <div
                className="custom_multiselect_field"
                onClick={handleClickLabel}
            >
                {
                    currentOptions.length > 0 ? <> {currentOptions.slice(-3).map((data, index) => (
                        <div key={index} className="custom_multiselect_label">
                            {data.label}
                        </div>
                    ))} </>
                        :
                        <>
                            <div className="custom_multiselect_placeholder">
                                {placeholder ?? 'Select'}
                            </div>
                        </>
                }
                {currentOptions.length > 3 ?
                    <div className="custom_multiselect_label">
                        +{currentOptions.length - 3}
                    </div>
                    : ''}

                <div className='down-arrow'>
                    <DownIcon />
                </div>
            </div>
            <div
                className={`custom_multiselect_list ${isOpen ? 'active' : ''}`}
            >
                <ul>
                    {
                        options.map((opt) => {
                            return (
                                <li
                                    key={opt.value}
                                    onClick={() => handleSelectOption(opt)}
                                    className={currentOptions.find((item) => item.value === opt.value) ? 'selected' : ''}
                                >
                                    {opt.label}
                                </li>
                            )
                        })
                    }
                </ul>
                {hasAddButton && <button
                    className="add_new_angle_btn"
                    onClick={onAdd}
                >
                    {addButtonLabel ?? 'Add'}
                    <PlusIcon />
                </button>
                }
            </div>
        </div >
    )
}

Multiselect.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    hasAddButton: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    onAdd: PropTypes.func,
    value: PropTypes.array,
    limit: PropTypes.number
}
export default Multiselect