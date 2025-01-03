import './Loader.scss';
import PropTypes from 'prop-types';

const Loader = ({ loading = false, isItForButton = false }) => {
  return (
    <>
      {loading &&
        (
          <>{!isItForButton ? <div className="loader_container">
            <div className="loading">Loading&#8230;</div>
          </div>
            :
            <div className="loader_container_for_btn">
              <div className="loader"></div>
            </div>
          }</>)
      }
    </>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool,
  isItForButton: PropTypes.bool,
}

export default Loader