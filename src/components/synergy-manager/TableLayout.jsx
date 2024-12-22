import PropTypes from 'prop-types'
import Accordion from '../accordion/Accordion'
import { MoreIcon, CloseIcon, editIcon, DeleteIcon, defaultImg, GlobalIcon } from '../../utils/constants/images'


const SynergyManagerTableLayout = ({ filterSynergies, selectedSynergy, handleSelectAllProjects, handleCancelSelection, setIsMultiDeleteConfirmPopupOpen, setIsBottomMenuOpen, setEditId, setIsEditSynergiesPopupOpen, setDeleteId, setIsDeleteConfirmPopupOpen, handleSelectedSynergy }) => {
    return (
        <div className="synergies_page_body" >
            <div className={`synergy_page_table_handler active`}>
                <div className="selected_count">
                    <div className="costum_checkbox">
                        <input
                            type="checkbox"
                            id='checkboxSelected'
                            className='costum_checkbox_input'
                            checked={selectedSynergy.length === filterSynergies.length && filterSynergies.length !== 0}
                            readOnly={true}
                        />
                        <label
                            htmlFor='checkboxSelected'
                            className='costum_checkbox_label'
                            onClick={handleSelectAllProjects}
                        ></label>
                    </div>
                    <span>
                        {selectedSynergy.length} Selected
                    </span>
                </div>

                {
                    selectedSynergy.length > 0 && <>
                        <div className="table_actions">
                            <button className="btn_cancle btn_gray" onClick={handleCancelSelection}>
                                <CloseIcon />
                                <span>Cancel</span>
                            </button>
                            <button className="btn_delete" onClick={() => {
                                setIsMultiDeleteConfirmPopupOpen(true);
                            }}>
                                <DeleteIcon />
                                <span>Delete</span>
                            </button>
                        </div>

                        <div className="table_actions_button">
                            <button className="button_delete " onClick={() => {
                                setIsMultiDeleteConfirmPopupOpen(true);
                            }}>
                                <DeleteIcon />
                            </button>
                            <button className="menu_button" onClick={() => setIsBottomMenuOpen(true)}>
                                <MoreIcon />
                            </button>
                        </div>
                    </>
                }
            </div>
            <div className="synergies_page_table">
                <table>
                    <thead>
                        <tr>
                            <th>Synergy name</th>
                            <th className='center'>Creator</th>
                            <th className='center'>Image</th>
                            <th className='center'>Synergies angles</th>
                            <th className='center'>Date</th>
                            <th className='center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterSynergies.map((rowData) => {
                                return (
                                    <tr key={rowData.key} className={`${rowData?.disabled ? 'disable' : ''}`}>
                                        <td>
                                            <div className='table_name'>
                                                <div className="costum_checkbox">
                                                    <input type="checkbox" id={`tableName_${rowData.key}`} className='costum_checkbox_input' checked={selectedSynergy.includes(rowData.key)} readOnly={true} />
                                                    <label htmlFor={`tableName_${rowData.key}`} className='costum_checkbox_label'
                                                        onClick={() => {
                                                            handleSelectedSynergy(rowData.key);
                                                        }}>
                                                    </label>
                                                </div>
                                                <span className='label'> {rowData.synergyName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='actor'>
                                                <img src={rowData.creatorImg} alt=" " />
                                                <span>{rowData.creator}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table_image">
                                                <img src={rowData.synergyImg === '' || !rowData.synergyImg ? defaultImg : rowData.synergyImg} alt=" " onError={(e) => e.target.src = defaultImg} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='table_angles'>
                                                {
                                                    rowData.synergiesAngles.map((angle, index) => (
                                                        <span className='angle_tag' key={index}>
                                                            <GlobalIcon />
                                                            <span>{angle}</span>
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="date">{rowData.date}</div>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button
                                                    onClick={() => {
                                                        setEditId(rowData.key);
                                                        setIsEditSynergiesPopupOpen(true);
                                                    }}
                                                >
                                                    <img src={editIcon} alt=" " />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteId(rowData.key)
                                                        setIsDeleteConfirmPopupOpen(true)
                                                    }
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="synergies_page_accordion">
                {
                    filterSynergies.map((rowData) => (
                        <Accordion
                            key={rowData.key}
                            synergyName={rowData.synergyName}
                            creatorImg={rowData.creatorImg}
                            creator={rowData.creator}
                            synergyImg={rowData.synergyImg}
                            price={rowData.price}
                            synergiesAngles={rowData.synergiesAngles}
                            date={rowData.date}
                            checked={selectedSynergy.includes(rowData.key)}
                            onDelete={() => {
                                setDeleteId(rowData.key);
                                setIsDeleteConfirmPopupOpen(true);
                            }}
                            onEdit={() => {
                                setEditId(rowData.key);
                                setIsEditSynergiesPopupOpen(true);
                            }}
                            onSelect={() => {
                                handleSelectedSynergy(rowData.key);
                            }}
                        />))
                }
            </div>
            {/* <div className="synergies_table_pagination">
      <div className="synergies_table_pagination_content">
        <div className="synergies_table_pagination_content_text">
          <span className='pagination_head'>Row per page:</span>
          <span className='pagination_dropdown'>
            <select name="cars" id="cars" >
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option></select></span>
          <span className='pagination_pages'>1-8 of 13</span>
          <div className="synergies_table_pagination_content_arrows">
            <button className={`table_pagination_content_button`}>
              <LeftIcon />
            </button>
            <button className={`table_pagination_content_button`}>
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
    </div> */}
        </div>
    )
}

SynergyManagerTableLayout.propTypes = {
    filterSynergies: PropTypes.array.isRequired,
    selectedSynergy: PropTypes.array.isRequired,
    handleSelectAllProjects: PropTypes.func.isRequired,
    handleCancelSelection: PropTypes.func.isRequired,
    setIsMultiDeleteConfirmPopupOpen: PropTypes.func.isRequired,
    setIsBottomMenuOpen: PropTypes.func.isRequired,
    setEditId: PropTypes.func.isRequired,
    setIsEditSynergiesPopupOpen: PropTypes.func.isRequired,
    setDeleteId: PropTypes.func.isRequired,
    setIsDeleteConfirmPopupOpen: PropTypes.func.isRequired,
    handleSelectedSynergy: PropTypes.func.isRequired
}

export default SynergyManagerTableLayout