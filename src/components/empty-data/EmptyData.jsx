import PropTypes from 'prop-types'
import './emptyData.scss'

const EmptyData = ({ isLoading, message = 'No Data found' }) => {
    return (
        <div className='empty_data_wrap'>
            <p className="title">
                {isLoading ? 'Data is fetching...' : message}
            </p>
        </div>
    )
}

EmptyData.propTypes = {
    isLoading: PropTypes.bool,
    message: PropTypes.string,
}
export default EmptyData