import './card.scss'
import PropTypes from 'prop-types';
import { defaultImg } from '../../utils/constants/images';
import { GredientGlobalIcon, GradientGraphIcon, GrammerlyIcon, HealthIcon, StarIcon } from '../../utils/SVGs/SVGs';


const synergyIconsStart = [<GredientGlobalIcon key={0} />, <GradientGraphIcon key={1} />]
const synergyIconsEnd = [<GrammerlyIcon key={2} />, <HealthIcon key={3} />, <StarIcon key={4} />]


const SynergyRequestCard = ({ data, handleCardClick }) => {
    const synergyAngles = data?.synergy_angles ? (typeof data.synergy_angles === 'string' ? [] : data?.synergy_angles) : []

    return (
        <div className='card_wrap'>
            <div className="card" onClick={() => handleCardClick(data)}>
                <div className="card_image">
                    <img onError={(e) => e.target.src = defaultImg} src={data.synergy_image || defaultImg} alt="" />
                </div>
                <div className="card_body">
                    <div className="name">{data.synergy_name ?? '-'} </div>
                    <div className="tabs">
                        {
                            synergyAngles.map((angle, index) => {
                                return (
                                    <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                        <div className='angle_tag' >
                                            <> {index === 0 ? <>{synergyIconsStart[0]} </> : null}</>
                                            <>{index === 1 ? <>{synergyIconsStart[1]} </> : null}</>
                                            <>{index >= 2 ? <>{synergyIconsEnd[index % synergyIconsEnd.length]} </> : null}</>
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
    handleCardClick: PropTypes.func,
}

export default SynergyRequestCard