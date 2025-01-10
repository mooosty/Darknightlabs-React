import './layout.scss'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useState , useEffect } from 'react'
const Layout = () => {
    const { authDetails } = useSelector(state => state.auth)

    if (!authDetails) {
        return <Navigate to="/" />
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  


    useEffect(() => {
     console.log(isSidebarOpen);
    }, [isSidebarOpen]);


    return (
        <div className={`layout_container`}>
              <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <main className="main_wrp">
                <div className="container">
                    <div className="page_box">
                        <Sidebar  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}   />
                        <div className="content_box">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Layout