import './card.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CustomTooltip from '../customTooltip/CustomTooltip';
import { arrowRight, defaultImg } from '../../utils/constants/images';

const Card = ({
    synergyId,
    name,
    img,
    description,
    status,
    tags = [],
    synergiesAngles = [],
}) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="synergy_card">
                <div className="card_img">
                    <img src={img} alt="" onError={(e) => e.target.src = defaultImg} />
                </div>
                <div className="card_body">
                    <div className="card_body_content">
                        <div className="tabs">
                            {
                                synergiesAngles.map((angle, index) => {
                                    return (
                                        <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                            <CustomTooltip
                                                place="top"
                                                style={{
                                                    zIndex: 99,
                                                    maxWidth: '200px',
                                                    width: 'max-content',
                                                    boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                    background: 'rgba(79, 79, 79, 1)',
                                                }}
                                                text={angle.label}
                                            >
                                                <div className='angle_tag'>
                                                    <>{angle.icon} </>
                                                    <span className='text'>
                                                        <span>{angle.label}</span>
                                                    </span>
                                                </div>
                                            </CustomTooltip>
                                        </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="card_body_head">{name}</div>
                    <div className="card_body_desc">{description}</div>
                    <div className='tags'>
                        {
                            tags.map((item, index) => (
                                <div className='tag' key={index}>{item}</div>
                            ))
                        }
                    </div>
                    <div className='read_more'>
                        <button>
                            <span onClick={() => navigate(`/synergies/${synergyId}`)}>Read more</span>
                            <img src={arrowRight} alt='' />
                        </button>
                    </div>
                </div>
                <div className={`status ${status}`}>
                    {status}
                </div>
            </div>
        </>
    )
}
Card.propTypes = {
    synergyId: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    synergiesAngles: PropTypes.array,
    description: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array
}

export default Card
