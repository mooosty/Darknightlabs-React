import PropTypes from 'prop-types';
import './ambassadors.scss'
import { CustomDropdown } from '../../../components';
import { ThreeDots } from '../../../utils/constants/images';

const Ambassadors = ({ handleActive, active }) => {
    const headerToggleButton = [
        {
            label: 'PERSONAL INFORMATION',
            key: 'INFORMATION',
            onClick: () => handleActive("INFORMATION")
        },
        {
            label: ' PROJECT INVOLVEMENT',
            key: 'INVOLVEMENT',
            onClick: () => handleActive("INVOLVEMENT")
        },
        {
            label: 'AMBASSADORS',
            key: 'AMBASSADORS',
            onClick: () => handleActive("AMBASSADORS")
        },
    ]
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
                        <div className="header_toggle_button">
                            {headerToggleButton.map((data) => {
                                return (
                                    <div
                                        key={data.key}
                                        className={`buttons ${active === data.key ? "active" : ""}`}
                                        onClick={data.onClick}
                                    >
                                        {data.label}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="header_toggle_dropDown">
                            <CustomDropdown
                                toggleButton={
                                    <ThreeDots />
                                }
                                items={headerToggleButton}
                            />
                        </div>
                    </div>

                    <div className="ambassadors_content_box">
                        <div>
                            <div className="ambassadors_content_title"> You need to activate the ambassadors section.</div>
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