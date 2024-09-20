import PropTypes from 'prop-types';
import { InfiniteIcon, TableStatusIcon } from '../../utils/SVGs/SVGs'
import './buttomMenu.scss'
import closeIcon from "../../assets/X-icon.png";
import trashIcon from "../../assets/trash-icon.png";


const ButtomMenu = ({ open, handleClose,handleDelete,handleAddFeature,handleCreateSynergy }) => {
    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>

                <div className="menu">
                    <div className="buttons">
                        <button onClick={() => {handleClose()}}>
                            <img src={closeIcon} alt="Add" />
                            <span>Cancel</span>
                        </button>
                        <button onClick={()=>handleAddFeature()}>
                            <TableStatusIcon />
                            Add to Featured</button>
                        <button onClick={()=>handleCreateSynergy()}>
                            <InfiniteIcon />
                            <span>Create synergy</span>
                        </button>
                        <button onClick={()=>handleDelete()}>
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
    handleDelete: PropTypes.func,
    handleAddFeature: PropTypes.func,
    handleCreateSynergy: PropTypes.func
}

export default ButtomMenu
