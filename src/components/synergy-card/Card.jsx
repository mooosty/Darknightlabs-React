import './card.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CustomTooltip } from '../../components';
import { arrowRight, defaultImg, GradientGraphIcon, GredientGlobalIcon } from '../../utils/constants/images';

const headTags = [
    {
        icon: <GredientGlobalIcon />,
        text: 'Early alpha'
    },
    {
        icon: <GradientGraphIcon />,
        text: 'Sharing'
    }
]

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
            <div className="synergy_card" onClick={() => navigate(`/synergies/${synergyId}`)}>
                <div className="card_img">
                    <img src={img} alt="" onError={(e) => e.target.src = defaultImg} />
                </div>
                <div className="card_body">
                    <div className='head_tags'>
                        {
                            headTags.map((item, index) => (
                                <div className='tag' key={index}>
                                    {item.icon}
                                    <span className='text'>{item.text}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="card_body_head">{name}</div>
                    <div className="card_body_desc">{description}</div>
                    <div className="angle_tabs">
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
                                                boxShadow: '0px 3px 10.3px -4px #e5e5e5',
                                                background: '#4f4f4f',
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
                    <div className='read_more'>
                        <div className='tags'>
                            {
                                tags.map((item, index) => (
                                    <div className='tag' key={index}>{item}</div>
                                ))
                            }
                        </div>
                        <button onClick={() => navigate(`/synergies/${synergyId}`)}>
                            <img src={arrowRight} alt=' ' />
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
