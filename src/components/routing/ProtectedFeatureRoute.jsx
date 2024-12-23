import { Navigate } from 'react-router-dom';
import { isFeatureEnabled } from '../../utils/featureFlags';

const ProtectedFeatureRoute = ({ feature, children }) => {
  if (!isFeatureEnabled(feature)) {
    // Redirect to home page if feature is disabled
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedFeatureRoute; 