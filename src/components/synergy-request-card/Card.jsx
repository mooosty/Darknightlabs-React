import './card.scss'
import PropTypes from 'prop-types';
import { synergyCardImages } from '../../utils/constants/images';
import { GredientGlobalIcon, GradientGraphIcon, GrammerlyIcon, HealthIcon, StarIcon } from '../../utils/SVGs/SVGs';


const cardImages = [synergyCardImages.cardActor1, synergyCardImages.cardActor2, synergyCardImages.cardActor3, synergyCardImages.cardActor4, synergyCardImages.cardActor5, synergyCardImages.cardActor6, synergyCardImages.cardActor7, synergyCardImages.cardActor8, synergyCardImages.cardActor9, synergyCardImages.cardActor10, synergyCardImages.cardActor11, synergyCardImages.cardActor12, synergyCardImages.cardActor13, synergyCardImages.cardActor14, synergyCardImages.cardActor15]
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