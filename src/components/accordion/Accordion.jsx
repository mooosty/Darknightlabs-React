import './accordion.scss';
import PropTypes from 'prop-types';
import trashIcon from "../../assets/trash-icon.png";
import editIcon from "../../assets/edit-icon.svg";
import { DownIcon } from '../../utils/SVGs/SVGs';
import bitCoinIcon from "../../assets/logosBitcoin.svg";
import globalIcon from "../../assets/global.svg";
import { useState } from 'react';
import DeleteConfirmPopup from '../popup/delete-confirm-popup/DeleteConfirmaPopup';


const Accordion = ({
    synergyName,
    creatorImg,
    creator,
    synergyImg,
    price,
    synergiesAngles = [],
    date,
    checked,
    onEdit = () => { },
    onDelete = () => { },
    onSelect=()=>{}
}) => {
    const id = Math.round(Math.random() * 1000)
    const [open, setOpen] = useState(false);
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const handleDelete = (e) => {
        onDelete
        e.stopPropagation()
        setIsDeleteConfirmPopupOpen(true)
    }
    const handleEdit = (e) => {
        onEdit
        e.stopPropagation()
    }


    return (
        <>
            <div
                className={`accordion_conrtainer ${open ? 'active' : ''}`}
            >
                <div className="accordion">
                    <div className='accordion_label' >
                        <div className="table_row">
                            <div className='content'>
                                <div className='left'>
                                    <div>
                                        <div className="costum_checkbox">
                                            <input type="checkbox" id={`checkbox_${id}`} className='costum_checkbox_input' checked={checked}/>
                                            <label htmlFor={`checkbox_${id}`} className='costum_checkbox_label' onClick={onSelect}></label>
                                        </div>
                                    </div>
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="creator_img">
                                        <img src={synergyImg} alt="" />
                                    </div>
                                    <div className="table_name">{synergyName}</div>
                                </div>
                                <div className='right'>
                                    <div className='creator'>
                                        <img src={creatorImg} alt=" " />
                                        <span>{creator}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <button className='delete_btn' onClick={onDelete}>
                                    <img src={trashIcon} alt=" " />
                                </button>
                                <button onClick={onEdit}>
                                    <img src={editIcon} alt=" " />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="accordion_content">
                        <div className="table_data">
                            <div className="data_container">
                                <span className='label'>Price:</span>
                                <div className='price'>
                                    <img src={bitCoinIcon} alt=" " />
                                    <span>{price}</span>
                                </div>
                            </div>
                            <div className="data_container">
                                <span className='label'>Date:</span>
                                <div className='date'>
                                    {date}
                                </div>
                            </div>
                            <div className="data_container">
                                <span className='label'>Creator:</span>
                                <div className='creator'>
                                    <img src={creatorImg} alt=" " />
                                    <span>{creator}</span>
                                </div>
                            </div>
                            <div className="data_container angel_container">
                                <span className='label'>Angles:</span>
                                <div className='angle'>
                                    {synergiesAngles && synergiesAngles.map((data, index) => (
                                        <span key={index}><img src={globalIcon} alt=" " />{data}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmPopup
                open={isDeleteConfirmPopupOpen}
                handleClose={() => setIsDeleteConfirmPopupOpen(false)}
            />
        </>
    )
}

Accordion.propTypes = {
    synergyName: PropTypes.string,
    creatorImg: PropTypes.any,
    creator: PropTypes.string,
    synergyImg: PropTypes.any,
    price: PropTypes.string,
    date: PropTypes.string,
    synergiesAngles: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
    checked:PropTypes.bool
}

export default Accordion
