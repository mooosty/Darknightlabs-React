import './card.scss'
import PropTypes from 'prop-types';
import { GredientGlobalIcon, GradientGraphIcon, GrammerlyIcon, HealthIcon, StarIcon } from '../../utils/SVGs/SVGs';
import { cardActor1, cardActor2, cardActor3, cardActor4, cardActor5, cardActor6, cardActor7, cardActor8, cardActor9, cardActor10, cardActor11, cardActor12, cardActor13, cardActor14, cardActor15 } from '../../utils/constants/images';


const cardImages = [cardActor1, cardActor2, cardActor3, cardActor4, cardActor5, cardActor6, cardActor7, cardActor8, cardActor9, cardActor10, cardActor11, cardActor12, cardActor13, cardActor14, cardActor15]
const synergyIcons = [<GredientGlobalIcon key={0} />, <GradientGraphIcon key={1} />, <GrammerlyIcon key={2} />, <HealthIcon key={3} />, <StarIcon key={4} />]


const SynergyRequestCard = ({ data, setIsEditSynergiesPopupOpen, index }) => {
    return (
        <div className='card_wrap'>
            <div className="card" onClick={() => setIsEditSynergiesPopupOpen(true)}>
                <div className="card_image">
                    <img src={cardImages[index % cardImages.length]} alt="" />
                </div>
                <div className="card_body">
                    <div className="name">{data.synergyName ?? '-'} </div>
                    <div className="tabs">
                        {
                            data.partnerships?.map((angle, index) => {
                                return (
                                    <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                        <div className='angle_tag' >
                                            <>{synergyIcons[index % synergyIcons.length]} </>
                                            <span className='text'>
                                                <span>{angle}</span>
                                            </span>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

SynergyRequestCard.propTypes = {
    data: PropTypes.object.isRequired,
    setIsEditSynergiesPopupOpen: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}

export default SynergyRequestCard