import './customTooltip.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';

const CustomTooltip = ({ children, text, place = 'top', style }) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && (
                <div className={`tooltip ${place}`} style={style} >
                    {text}
                </div>
            )}
        </div>
    );
};
CustomTooltip.propTypes = {
    children: PropTypes.reactNode,
    text: PropTypes.string,
    place: PropTypes.string,
    style: PropTypes.object
}

export default CustomTooltip;