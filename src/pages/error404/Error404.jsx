import { Link } from 'react-router-dom'
import './error404.scss'

const Error404 = () => {
    return (
        <div className='error_404_main_wrap'>
            <div className='error_404_wrap'>
                <div className="content_Wrap">
                    <div className="title">Oops!</div>
                    <div className="header">404</div>
                    <div className="desc"> Looks like you&apos;ve taken a wrong turn in the digital realm. The page you&apos;re searching for seems to have gone on a little adventure of its own</div>
                    <Link to={'/'} className='btn' >Back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error404