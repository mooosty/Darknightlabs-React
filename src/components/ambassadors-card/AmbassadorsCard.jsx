import PropTypes from 'prop-types';
import './ambassadorsCard.scss'
import { defaultImg } from '../../utils/constants/images';
import { GradientTimerIcon } from '../../utils/SVGs/SVGs';
import { ROUTER } from '../../utils/routes/routes';
import { useNavigate } from 'react-router-dom';

const AmbassadorsCard = ({ projectId, name, img, synergiesAngles, isTimeFramed }) => {
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/${ROUTER.ambassadorProjects}/${id}`)
    }
    return (<>
        <div className="ambassador_card">
            <div className="card_img">
                <img src={img} alt="" onError={(e) => e.target.src = defaultImg} />
            </div>
            <div className="card_body">
                <div className="card_body_head">{name}</div>
                <div className="card_body_content">
                    {isTimeFramed && <div className="time_frame_wrap">
                        <div className="time_frame">
                            <GradientTimerIcon />
                            <div className="text">Timeframe</div>
                        </div>
                    </div>}
                    <div className="tabs">
                        {
                            synergiesAngles.map((angle, index) => {
                                return (
                                    <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                        {/* <CustomTooltip
                                            place="top"
                                            style={{
                                                zIndex: 99,
                                                maxWidth: '200px',
                                                width: 'max-content',
                                                boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                background: 'rgba(79, 79, 79, 1)',
                                            }}
                                            text={angle.label}
                                        > */}
                                        <div className='angle_tag'>
                                            <>{angle.icon} </>
                                            <span className='text'>
                                                <span>{angle}</span>
                                            </span>
                                        </div>
                                        {/* </CustomTooltip> */}
                                    </div>)
                            })
                        }

                    </div>
                </div>
                <div className="card_button" onClick={() => handleClick(projectId)}>
                    <div className="button">
                        <span className='text'>Learn more</span>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};


AmbassadorsCard.propTypes = {
    projectId: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isTimeFramed: PropTypes.bool,
    synergiesAngles: PropTypes.arrayOf(PropTypes.string),
}
export default AmbassadorsCard