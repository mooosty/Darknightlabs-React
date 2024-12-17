import PropTypes from 'prop-types';
import './ambassadors.scss'

const Ambassadors = ({ handleActive, active }) => {
    return (

        <><div className="ambassadors_content_header">
            <div className="ambassadors_content_left">
                <h2>Profile</h2>
            </div>
            <div className="ambassadors_content_right">
                <a href="#">Darknight Labs</a>
            </div>
        </div>
            <div className="ambassadors_page_data">
                <div className="page_data">
                    <div className="header_button">
                        <div
                            className={`buttons ${active === "INFORMATION" ? "active" : ""}`}
                            onClick={() => handleActive("INFORMATION")}
                        >
                            PERSONAL INFORMATION
                        </div>
                        <div
                            className={`buttons ${active === "INVOLVEMENT" ? "active" : ""}`}
                            onClick={() => handleActive("INVOLVEMENT")}
                        >
                            PROJECT INVOLVEMENT
                        </div>
                        <div
                            className={`buttons ${active === "AMBASSADORS" ? "active" : ""}`}
                            onClick={() => handleActive("AMBASSADORS")}
                        >
                            AMBASSADORS
                        </div>
                    </div>

                    <div className="ambassadors_content_box">
                        <div>
                            <span className="ambassadors_content_header"> You need to activate the ambassadors section.</span>
                            <button className="btn_gray ambassadors_content_btn"> Activate now</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

Ambassadors.propTypes = {
    handleActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
};

export default Ambassadors