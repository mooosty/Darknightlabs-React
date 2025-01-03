import PropTypes from 'prop-types';
import './newAmbassadorsCard.scss'
import { defaultImg } from '../../utils/constants/images';
import { ROUTER } from '../../utils/routes/routes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosApi } from '../../api-services/service';

const AmbassadorsCard = ({ projectId, name, img, synergiesAngles }) => {
    const navigate = useNavigate();
    const [timeframeStatus, setTimeframeStatus] = useState('Coming Soon');

    useEffect(() => {
        const fetchTimeframe = async () => {
            try {
                const response = await axiosApi.get(`/content-requirements/project/${projectId}`);
                if (response?.data?.length > 0) {
                    const timeframe = response.data[0];
                    const currentDate = new Date();
                    const startDate = new Date(timeframe.start_date);
                    const endDate = new Date(timeframe.end_date);
                    
                    if (currentDate >= startDate && currentDate <= endDate) {
                        setTimeframeStatus('LIVE');
                    } else if (currentDate < startDate) {
                        setTimeframeStatus('Coming Soon');
                    }
                }
            } catch (error) {
                console.error('Error fetching timeframe:', error);
                setTimeframeStatus('Coming Soon');
            }
        };

        if (projectId) {
            fetchTimeframe();
        }
    }, [projectId]);

    const handleClick = (id) => {
        navigate(`/${ROUTER.ambassadorProjects}/${id}`)
    }

    return (
        <div className="ambassador_card" onClick={() => handleClick(projectId)}>
            <div className="card_content">
                <div className="card_img">
                    <img src={img || defaultImg} alt="" onError={(e) => e.target.src = defaultImg} />
                </div>
                <div className="card_body">
                    <div className="card_body_head">{name}</div>
                    <div className="card_body_content">
                        <div className="tabs">
                            {Object.values(synergiesAngles)?.map((angle, index) => (
                                <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                    <div className='angle_tag'>
                                        <>{angle?.icon}</>
                                        <span className='text'>
                                            <span>{angle}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {timeframeStatus && (
                <div className={`status-ribbon ${timeframeStatus.toLowerCase().replace(' ', '-')}`}>
                    {timeframeStatus}
                </div>
            )}
        </div>
    );
};

AmbassadorsCard.propTypes = {
    projectId: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    synergiesAngles: PropTypes.arrayOf(PropTypes.string),
}

export default AmbassadorsCard;