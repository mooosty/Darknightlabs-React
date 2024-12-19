import PropTypes from 'prop-types'
import { defaultImg, GradientGraphIcon, GrammerlyIcon, GredientGlobalIcon } from '../../utils/constants/images'

const SynergyManagerGridLayout = ({ filterSynergies}) => {
    return (
        <div className='card_container'>
            {filterSynergies.map((cardData, index) => {
                const cardImage = cardData.synergyImg
                return (
                    <div key={index} className="card_wrap">
                        <div className={`card `}>
                            <div className="card_image">
                                {/* synergyImg */}
                                <img src={!cardImage ? defaultImg : cardImage} onError={(e) => e.target.src = defaultImg} alt=" " />
                            </div>
                            <div className="card_body">
                                <div className="name">
                                    {cardData.synergyName}
                                </div>
                                <div className="creator">
                                    <img src={cardData.creatorImg} alt="" />
                                    <span className="creator_name">{cardData.creator}</span>
                                </div>
                                <div className="tabs">
                                    {
                                        cardData.synergiesAngles.slice(0, 3).map((Angle, index) => (
                                            <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                                <div className='angle_tag'>
                                                    <>{index === 0 && <div className='icon'><GredientGlobalIcon /></div>}</>
                                                    <>{index === 1 && <div className='icon'><GradientGraphIcon /></div>}</>
                                                    <>{index > 1 && <div className='icon'><GrammerlyIcon /></div>}</>
                                                    <span className='text'>
                                                        <span>{Angle}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {cardData.synergiesAngles.length > 3 ?
                                        <div className="angle_tag">
                                            <span className='angle_tag_count'>+{cardData.synergiesAngles.length - 3}</span>
                                        </div>
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

SynergyManagerGridLayout.propTypes = {
    filterSynergies: PropTypes.array.isRequired
}

export default SynergyManagerGridLayout