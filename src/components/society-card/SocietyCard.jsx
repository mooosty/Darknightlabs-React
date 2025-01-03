import './societyCard.scss';
import PropTypes from 'prop-types';
import { soldierPhoto } from '../../utils/constants/images';

const SocietyCard = ({
    name,
    img,
    post,
}) => {

    return (
        <>
            <div className="society_card">
                <div className="card_img">
                    <img src={img || soldierPhoto} alt="" onError={(e) => e.target.src = soldierPhoto} />
                </div>
                <div className="card_text">
                    <div className="name">{name}</div>
                    <div className="post">{post}</div>
                </div>
            </div>
        </>
    )
}

SocietyCard.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    post: PropTypes.string,
}

export default SocietyCard
