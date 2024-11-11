import './Loader.scss';
import PropTypes from 'prop-types';

const Loader = ({ loading = false, isItForbutton = false }) => {
  return (
    <>
      {(loading) &&
        <div className={isItForbutton ? `loader_container_for_btn` : `loader_container`}>
          <div className="loading">Loading&#8230;</div>
        </div>
      }
    </>
  )
}

Loader.prototype = {
  loading: PropTypes.bool,
}

export default Loader