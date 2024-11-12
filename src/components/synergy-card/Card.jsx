import './card.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip'
import ChoosePrioritySynergiesPopup from '../popup/choose-priority-synergies-popup/ChoosePrioritySynergiesPopup';
import arrowRight from '../../assets/arrow-right.svg'
import defaultImage from '../../assets/project-card-img-1.png'

const Card = ({
    name,
    img,
    description,
    status,
    tags = [],
    synergiesAngles = [],
}) => {
    const [isChoosePrioritySynergiesPopupOpen, setIsChoosePrioritySynergiesPopupOpen] = useState(false);

    console.log('status', status)

    return (
        <>
            <div className="synergy_card">
                <div className="card_img">
                    <img src={img} alt=""  onError={(e) => e.target.src = defaultImage} />
                </div>
                <div className="card_body">
                    <div className="card_body_content">
                        <div className="tabs">
                            {
                                synergiesAngles.map((angle, index) => {
                                    const id = Math.floor((Math.random() * 10000))

                                    return (
                                        <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={id}>
                                            <div className='angle_tag' id={`tooltip_synergis_${id}`}>
                                                <>{angle.icon} </>
                                                <span className='text'>
                                                    <span>{angle.label}</span>
                                                </span>
                                            </div>
                                            <Tooltip
                                                place="top"
                                                style={{
                                                    zIndex: 99,
                                                    maxWidth: '200px',
                                                    boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                    background: 'rgba(79, 79, 79, 1)',
                                                }}
                                                opacity={1}
                                                anchorSelect={`#tooltip_synergis_${id}`}
                                            >
                                                {angle.tooltip} {id}
                                            </Tooltip>
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
                            <span>Read more</span>
                            <img src={arrowRight} alt='' />
                        </button>
                    </div>
                </div>
                <div className={`status ${status === 'Refused' ? 'refused' : ''} ${status === 'Live' ? 'live' : ''} ${status === 'Pending' ? 'pending' : ''}`}>
                    {status}
                </div>
            </div>
            <ChoosePrioritySynergiesPopup
                open={isChoosePrioritySynergiesPopupOpen}
                handleClose={() => setIsChoosePrioritySynergiesPopupOpen(false)}
            />
        </>
    )
}
Card.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    synergiesAngles: PropTypes.array,
    description: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array
}

export default Card
