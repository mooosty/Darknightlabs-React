import PropTypes from 'prop-types';
import './ambassadorsCard.scss'
import { defaultImg, GradientTimerIcon } from '../../utils/constants/images';
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
                <img src={img || defaultImg} alt="" onError={(e) => e.target.src = defaultImg} />
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
                            Object.values(synergiesAngles)?.map((angle, index) => {
                                return (
                                    <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>

                                        <div className='angle_tag'>
                                            <>{angle?.icon} </>
                                            <span className='text'>
                                                <span>{angle}</span>
                                            </span>
                                        </div>
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