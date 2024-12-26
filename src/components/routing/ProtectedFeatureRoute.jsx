import { Navigate } from 'react-router-dom';
import { isFeatureEnabled } from '../../utils/featureFlags';
import PropTypes from 'prop-types';

const ProtectedFeatureRoute = ({ feature, children }) => {
  if (!isFeatureEnabled(feature)) {
    // Redirect to home page if feature is disabled
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedFeatureRoute.propTypes = {
  feature: PropTypes.string,
  children: PropTypes.element,
}

export default ProtectedFeatureRoute; 