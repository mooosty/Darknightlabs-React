import './ambassadorAccordion.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyIcon, DownIcon } from '../../utils/SVGs/SVGs';
import { editIcon, trashIcon } from '../../utils/constants/images';
import DeleteConfirmPopup from '../popup/delete-confirm-popup/DeleteConfirmPopup';

const AmbassadorAccordion = ({
    tweetText,
    subject,
    status,
    URL,
    date,
    onEdit = () => { },
    onDelete = () => { },
}) => {
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
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="table_name">{subject}</div>
                                </div>
                                <div className="right">
                                    <div className="url">
                                        <span className='text'>{URL}</span>
                                        <div className="icon"><CopyIcon /></div>
                                    </div>
                                    <div className={`status ${status === 'approved' ? 'approved' : 'submitted'}`}>
                                        <span> {status}</span>
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
                                <span className='label'>Tweet text:</span>
                                <div className='tweet_text'>
                                    {tweetText}
                                </div>
                            </div>
                            <div className="data_container url">
                                <span className='label'>URL:</span>
                                <div className='url_text'>
                                    <span className='text'>{URL}</span>
                                    <div className="icon"><CopyIcon /></div>
                                </div>
                            </div>
                            <div className={`data_container status ${status === 'approved' ? 'approved' : 'submitted'}`}>
                                <span className='label'>Status:</span>
                                <span> {status}</span>
                            </div>
                            <div className="data_container">
                                <span className='label'>Created at:</span>
                                <div className='date'>
                                    {date}
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

AmbassadorAccordion.propTypes = {
    tweetText: PropTypes.string,
    subject: PropTypes.string,
    URL: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

export default AmbassadorAccordion
