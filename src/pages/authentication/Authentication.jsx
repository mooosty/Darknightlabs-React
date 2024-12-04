import './authentication.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DynamicContextProvider, DynamicEmbeddedWidget } from '@dynamic-labs/sdk-react-core';
import { ROUTER } from '../../utils/routes/routes';
import { useEffect } from 'react';
import { storeAuthData } from '../../store/slice/authSlice';

const Authentication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authDetails } = useSelector(state => state.auth)

    const handleAuthResponse = (response) => {
        if (response?.isAuthenticated) {
            dispatch(storeAuthData(response));
            navigate(`/${ROUTER.projects}`);
        } else {
            console.log('Authentication failed');
        }
    };

    useEffect(() => {
        if (authDetails) {
            navigate(`/${ROUTER.projects}`);
        }
    }, [authDetails])



    return (
        <div className="twitterLoginWrp">
            <div className="twitterLoginBody">
                <DynamicContextProvider
                    theme={'dark'}
                    settings={{
                        environmentId: "d1ffceea-89ce-4c8f-ba32-0b802fab8822",
                        events: {
                            onAuthSuccess: handleAuthResponse,
                            onLogout: ((data) => {
                                console.log('data', data)
                            })
                        },

                    }}
                >
                    <div className="widget-container">
                        <DynamicEmbeddedWidget background="with-border" />
                    </div>
                </DynamicContextProvider>
            </div>
        </div>
    );
};

export default Authentication;
