import './bottomMenu.scss'
import PropTypes from 'prop-types';


const BottomMenu = ({ open, children }) => {
    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>
                <div className="menu">
                    <div className="buttons">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

BottomMenu.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.any,
    handleClose: PropTypes.func,
    handleDelete: PropTypes.func,
    handleAddFeature: PropTypes.func,
    handleCreateSynergy: PropTypes.func
}

export default BottomMenu
