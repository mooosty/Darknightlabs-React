import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersDetailsAPI } from '../api-services/userApis';

const InitialDataLoader = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData?.userId) {
      dispatch(getUsersDetailsAPI(userData.userId));
    }
  }, [userData?.userId, dispatch]);

  return null; // This component doesn't render anything
};

export default InitialDataLoader; 