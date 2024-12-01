import './card.scss'
import PropTypes from 'prop-types';
import { GredientGlobalIcon, GradientGraphIcon, GrammerlyIcon, HealthIcon, StarIcon } from '../../utils/SVGs/SVGs';
import { defaultImg } from '../../utils/constants/images';


const synergyIcons = [<GredientGlobalIcon key={0} />, <GradientGraphIcon key={1} />, <GrammerlyIcon key={2} />, <HealthIcon key={3} />, <StarIcon key={4} />]

const SynergyRequestCard = ({ data, setIsEditSynergiesPopupOpen, setSelectedSynergyData, handleCheckSynergiesAngles = () => { } }) => {
    return (
        <div className='card_wrap'>
            <div className="card" onClick={() => { setIsEditSynergiesPopupOpen(true); setSelectedSynergyData(data); handleCheckSynergiesAngles() }}>
                <div className="card_image">
                    <img onError={(e) => e.target.src = defaultImg} src={data.synergy_image || defaultImg} alt="" />
                </div>
                <div className="card_body">
                    <div className="name">{data.synergy_name ?? '-'} </div>
                    <div className="tabs">
                        {
                            data?.synergy_angles?.map((angle, index) => {
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
    setSelectedSynergyData: PropTypes.func.isRequired,
    handleCheckSynergiesAngles: PropTypes.func,
    index: PropTypes.number.isRequired,
}

export default SynergyRequestCard