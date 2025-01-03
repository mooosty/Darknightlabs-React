import './ambassadorAccordion.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyIcon, DownIcon, editIcon, DeleteIcon, CheckIcon } from '../../utils/constants/images';
import { DeleteConfirmPopup } from '../../components'
import { toast } from 'react-toastify';

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
    const [isCopyLink, setIsCopyLink] = useState(false);

    const copySelectedText = (url) => {
        setIsCopyLink(true)
        if (url) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    toast.success('URL Copied')
                })
        } else {
            toast.error('URL Not Found')
        }
        setTimeout(() => {
            setIsCopyLink(false);
        }, 1000);
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
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="table_name">{subject}</div>
                                </div>
                                <div className="right">
                                    <div className="url">
                                        <span className='text'>{URL}</span>
                                        <div className="icon" onClick={() => copySelectedText(URL)}>
                                            {isCopyLink ? <CheckIcon /> : <CopyIcon />}
                                        </div>
                                    </div>
                                    <div className={`status ${status === 'approved' ? 'approved' : 'submitted'}`}>
                                        <span> {status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <button className='delete_btn' onClick={onDelete}>
                                    <DeleteIcon />
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
                                    <div className="icon" onClick={() => copySelectedText(URL)} >
                                        {isCopyLink ? <CheckIcon /> : <CopyIcon />}
                                    </div>
                                </div>
                            </div>
                            <div className={`data_container status `}>
                                <span className='label'>Status:</span>
                                <span className={`status_tab ${status === 'approved' ? 'approved' : 'submitted'}`}> {status}</span>
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
