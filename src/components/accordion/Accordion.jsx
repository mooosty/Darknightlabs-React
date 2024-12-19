import './accordion.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { bitCoinIcon, defaultImg, DownIcon, editIcon, GlobalIcon, trashIcon } from '../../utils/constants/images';
import DeleteConfirmPopup from '../popup/delete-confirm-popup/DeleteConfirmPopup';

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
    onSelect = () => { }
}) => {
    const id = Math.round(Math.random() * 1000)
    const [open, setOpen] = useState(false);
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);


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
                                            <input type="checkbox" id={`checkbox_${id}`} className='costum_checkbox_input' checked={checked} readOnly={true} />
                                            <label htmlFor={`checkbox_${id}`} className='costum_checkbox_label' onClick={onSelect}></label>
                                        </div>
                                    </div>
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="creator_img">
                                        <img src={synergyImg === '' || !synergyImg ? defaultImg : synergyImg} alt="" onError={(e) => e.target.src = defaultImg} />
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
                                        <span key={index}><img src={GlobalIcon} alt=" " />{data}</span>
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
    price: PropTypes.number,
    date: PropTypes.string,
    synergiesAngles: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
    checked: PropTypes.bool
}

export default Accordion
