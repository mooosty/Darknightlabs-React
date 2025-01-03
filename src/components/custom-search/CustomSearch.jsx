
import PropTypes from 'prop-types';
import { SearchIcon, CloseIcon } from '../../utils/constants/images';
import './customSearch.scss'

const CustomSearch = ({ placeholder, value, onSearchChange, setIsOpen, isOpen }) => {


    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className="search_box">
                <span className="searchbar_icon"><SearchIcon /></span>
                <input
                    value={value}
                    className='search_input_top'
                    type="text"
                    placeholder={placeholder || 'Search'}
                    onChange={onSearchChange}
                />
            </div>
            <div className="search_icon_button" onClick={handleOpen}>
                {isOpen ? <CloseIcon /> : <SearchIcon />}
            </div>
        </>
    );
};

CustomSearch.propTypes = {
    placeholder: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.bool,
    value: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
};

export default CustomSearch