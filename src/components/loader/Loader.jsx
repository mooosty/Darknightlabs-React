import './Loader.scss';
import PropTypes from 'prop-types';

const Loader = ({ loading = false, isItForbutton = false }) => {
  return (
    <>
      {loading &&
        (
          <>{!isItForbutton ? <div className="loader_container">
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
  isItForbutton: PropTypes.bool,
}

export default Loader