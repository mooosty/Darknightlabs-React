import PropTypes from 'prop-types';
import { InfiniteIcon, TableStatusIcon } from '../../utils/SVGs/SVGs'
import './buttomMenu.scss'
import closeIcon from "../../assets/X-icon.png";
import trashIcon from "../../assets/trash-icon.png";


const ButtomMenu = ({ open, handleClose }) => {
    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>

                <div className="menu">
                    <div className="buttons">
                        <button onClick={() => {handleClose()}}>
                            <img src={closeIcon} alt="Add" />
                            <span>Cancel</span>
                        </button>
                        <button >
                            <TableStatusIcon />
                            Add to Featured</button>
                        <button >
                            <InfiniteIcon />
                            <span>Create synergy</span>
                        </button>
                        <button >
                            <img src={trashIcon} alt="Delete" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
ButtomMenu.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default ButtomMenu
