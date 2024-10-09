import './Loader.scss';
import PropTypes from 'prop-types';

const Loader = ({loading}) => {

  return (
    <>
      {(loading) && <div className="loader_container">
        <div className="loader">
        </div>
      </div>}
    </>
  )
}

Loader.prototype={
  loading:PropTypes.bool
}

export default Loader