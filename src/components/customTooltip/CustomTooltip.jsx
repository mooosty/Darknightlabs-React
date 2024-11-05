import { useState } from 'react';
import './customTooltip.scss'; // Optional: for styling
import PropTypes from 'prop-types';

const CustomTooltip = ({ children, text}) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && (
                <div className={`tooltip top`}>
                    {text}
                </div>
            )}
        </div>
    );
};
CustomTooltip.propTypes = {
    children: PropTypes.reactNode,
    text: PropTypes.string,
}

export default CustomTooltip;