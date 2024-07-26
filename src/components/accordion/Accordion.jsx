import './accordion.scss';
import PropTypes from 'prop-types';
import trashIcon from "../../assets/trash-icon.png";
import editIcon from "../../assets/edit-icon.svg";
import { DownIcon } from '../../utils/SVGs/SVGs';
import bitCoinIcon from "../../assets/logosBitcoin.svg";
import globalIcon from "../../assets/global.svg";
import { useState } from 'react';


const Accordion = ({
    synergyName,
    creatorImg,
    creator,
    synergyImg,
    price,
    synergiesAngles = [],
    date,
}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className={`accordion_conrtainer ${open ? 'active' : ''}`}
            >
                <div className="accordion">
                    <div className='accordion_label' onClick={() => setOpen(!open)} >
                        <div className="table_row">
                            <div className='content'>
                                <div className='left'>
                                    <DownIcon className='table_arrow' />
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
                                <button className='delete_btn'>
                                    <img src={trashIcon} alt=" " />
                                </button>
                                <button>
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
                                    {synergiesAngles && synergiesAngles.map((data) => (<>
                                        <span><img src={globalIcon} alt=" " />{data}</span>
                                    </>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
}

export default Accordion
