import './layout.scss'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import { useSelector } from 'react-redux'

const Layout = () => {
    const { authDetails } = useSelector(state => state.auth)

    if (!authDetails) {
        return <Navigate to="/" />
    }

    return (
        <div className={`layout_container`}>
              <Header />
            <main className="main_wrp">
                <div className="container">
                    <div className="page_box">
                        <Sidebar />
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