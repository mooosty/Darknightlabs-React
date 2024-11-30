import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const userData = useSelector((state) => state.auth);

    useEffect(() => {
        if (userData?.userId) {
            const newSocket = io(import.meta.env.VITE_CHAT_APP_BASE_URL, {
                withCredentials: true,
            });

            newSocket.on('connect', () => {
                console.log('Socket connected');
                newSocket.emit('setup', { data: { _id: userData.userId } });
            });

            newSocket.on('connected', () => {
                console.log('Socket.IO connection established');
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [userData.userId]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useSocket = () => useContext(SocketContext);