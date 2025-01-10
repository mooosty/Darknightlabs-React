import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { SocketProvider } from './utils/socket-provider/SocketContext'
// import { SidebarProvider } from './utils/SidebarProvider'
import Sidebar from './components/layout/sidebar/Sidebar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketProvider>
          {/* <SidebarProvider> */}
            <App />
          {/* </SidebarProvider> */}
        </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

