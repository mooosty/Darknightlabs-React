import './card.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import cardCoin from "../../assets/Coins.svg"
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../utils/routes/routes';
import useNoScroll from '../../utils/hooks/useNoScroll';
import CustomTooltip from '../customTooltip/CustomTooltip';
import CreateSynergyRequestPopup from '../popup/choose-priority-synergies-popup/CreateSynergyRequestPopup';
import { defaultImg, GradientInfiniteIcon, TableStatusIcon } from '../../utils/constants/images';

const Card = ({
    name,
    img,
    synergiesAngles = [],
    isFeatured,
    price,
    projectId
}) => {
    const navigate = useNavigate()
    const [isChoosePrioritySynergiesPopupOpen, setIsChoosePrioritySynergiesPopupOpen] = useState(false);
    useNoScroll([isChoosePrioritySynergiesPopupOpen])

    const handleAddSynergyRequest = (e) => {
        e?.stopPropagation()
        setIsChoosePrioritySynergiesPopupOpen(true);
    }


    return (
        <>
            <div onClick={() => navigate(`/${ROUTER.projects}/${projectId}`)} className={`project_card ${isFeatured ? 'highlighted' : ''}`}>
                {isFeatured ?
                    <div className="isFeaturedCard"> <TableStatusIcon /></div> : ''}
                <div className="card_img">
                    <img src={img} alt="" onError={(e) => e.target.src = defaultImg} />
                </div>
                <div className="card_body">
                    <div className="card_body_head">{name}</div>
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
                    </div>
                    {price && <div className="card_body_price">
                        <div className="text">Price</div>
                        <div className="digits">
                            <img src={cardCoin} alt=" " />
                            <span>{price}</span>
                        </div>
                    </div>}
                </div>
                <div className="card_button" onClick={handleAddSynergyRequest}>
                    <div className="button">
                        <GradientInfiniteIcon />
                        <span className='text'>Synergize</span>
                    </div>
                </div>
            </div>
            <CreateSynergyRequestPopup
                projectId={projectId}
                open={isChoosePrioritySynergiesPopupOpen}
                handleClose={() => setIsChoosePrioritySynergiesPopupOpen(false)}
                data={{ name, img, projectId }}
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
