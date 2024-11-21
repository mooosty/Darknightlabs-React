import { GradientInfiniteIcon, TableStatusIcon } from '../../utils/SVGs/SVGs';
import './card.scss';
import PropTypes from 'prop-types';
import cardCoin from "../../assets/Coins.svg"
import ChoosePrioritySynergiesPopup from '../popup/choose-priority-synergies-popup/ChoosePrioritySynergiesPopup';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import defaultImage from '../../assets/project-card-img-1.png'
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../utils/routes/routes';

const Card = ({
    name,
    img,
    synergiesAngles = [],
    isFeatured,
    price,
    projectId
}) => {
    const [isChoosePrioritySynergiesPopupOpen, setIsChoosePrioritySynergiesPopupOpen] = useState(false);
    const navigate = useNavigate()

    const handleActive = () => {
        setIsChoosePrioritySynergiesPopupOpen(!isChoosePrioritySynergiesPopupOpen);
    }
    return (
        <>
            <div onClick={() => navigate(`/${ROUTER.projects}/${projectId}`)} className={`project_card ${isFeatured ? 'heighlighted' : ''}`}>
                {isFeatured ?
                    <div className="isFeaturedCard"> <TableStatusIcon /></div> : ''}
                <div className="card_img">
                    <img src={img} alt="" onError={(e) => e.target.src = defaultImage} />
                </div>
                <div className="card_body">
                    <div className="card_body_head">{name}</div>
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
                                                {angle.tooltip ?? angle.label} {id}
                                            </Tooltip>
                                        </div>)
                                })
                            }

                        </div>
                    </div>
                    {price && <div className="card_body_price">
                        <div className="text">Price</div>
                        <div className="digits">
                            <img src={cardCoin} alt=" " />
                            <span>{price}</span>
                        </div>
                    </div>}
                </div>
                    <div className="card_button" onClick={handleActive}>
                        <div className="button">
                            <GradientInfiniteIcon />
                            <span className='text'>Synergize</span>
                        </div>
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
    price: PropTypes.string,
    isFeatured: PropTypes.bool,
    projectId: PropTypes.string,
}

export default Card
