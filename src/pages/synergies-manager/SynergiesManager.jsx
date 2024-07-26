import './synergiesManager.scss'
import searchIcon from "../../assets/search-icon.png";
import addIcon from "../../assets/addIcon.svg";
import filterIcon from "../../assets/filter.svg";
import globalIcon from "../../assets/global.svg";
import bitCoinIcon from "../../assets/logosBitcoin.svg";
import tableActor from "../../assets/tableActorImage.jpg";
import tableActorImage1 from "../../assets/avatar-1.jpg";
import tableActorImage2 from "../../assets/avatar-2.jpg";
import tableActorImage3 from "../../assets/avatar-3.jpg";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.png";
import AddSynergiesPopup from '../../components/popup/add-synergies-popup/AddSynergiesPopup';
import { GridIcon, LeftIcon, ListIcon, RightIcon } from '../../utils/SVGs/SVGs';
import { useState } from 'react';
import DeleteConfirmPopup from '../../components/popup/delete-confirm-popup/DeleteConfirmaPopup';
import Accordion from '../../components/accordion/Accordion';

const tableData = [
  {
    key: 1,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage1,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 2,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage2,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 3,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage3,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 4,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage1,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 5,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage2,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 6,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage3,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 7,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage3,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
  {
    key: 8,
    synergyName: 'Synergy name',
    creatorImg: tableActor,
    creator: 'Joan of Arc',
    synergyImg: tableActorImage2,
    price: '0,000000001',
    synergiesAngles: ['IP integration', 'Hosting AMAS', 'Angle48', 'Angle48', 'Angle48'],
    date: '12/12/2024',
  },
]

const SynergiesManager = () => {
  const [activeLayout, setActiveLayout] = useState('TAB');
  const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);

  const handleActive = (key) => {
    setActiveLayout(key);
  }


  return (
    <>
      <div className="synergies_content_header">
        <div className="synergies_content_left">
          <h2>Synergies Manager</h2>
          <div className="search_box">
            <img className="search_icon" src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="synergies_content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>

      <div className="synergies_page_data">
        <div className="synergies_page_header">
          <div className="synergies_pagination">
            <button className={`synergies_pagination_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
              <ListIcon />
            </button>
            <button className={`synergies_pagination_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
              <GridIcon />
            </button>
          </div>
          <div className='synergies_page_header_button'>
            <button className="btn_gray btn_filter">Filters <img src={filterIcon} alt=" " /> </button>
            <button className="btn_gray" onClick={() => setIsAddAngelPopupOpen(true)}>
              Add new synergy <img src={addIcon} alt=" " />
            </button>
          </div>
        </div>
        <div className="synergies_page_body">
          <div className="synergies_page_table">
            <table>
              <thead>
                <th>Synergy name</th>
                <th className='center'>Creator</th>
                <th className='center'>Image</th>
                <th className='center'>Price</th>
                <th className='center'>Synergies angles</th>
                <th className='center'>Date</th>
                <th className='center'>Actions</th>
              </thead>
              <tbody>
                {
                  tableData.map((rowData) => {
                    return (
                      <tr key={rowData.key}>
                        <td>
                          <div className='table_name'>
                            <div className="costum_checkbox">
                              <input type="checkbox" id={`tableName_${rowData.key}`} className='costum_checkbox_input' />
                              <label htmlFor={`tableName_${rowData.key}`} className='costum_checkbox_label'></label>
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
                            <img src={rowData.synergyImg} alt=" " />
                          </div>
                        </td>
                        <td>
                          <div className="price">
                            <img src={bitCoinIcon} alt=" " /> {rowData.price}
                          </div>
                        </td>
                        <td>
                          <div className='table_angles'>
                            {
                              rowData.synergiesAngles.map((angle, index) => (
                                <span className='angle_tag' key={index}>
                                  <img src={globalIcon} alt=" " />
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
                            <button><img src={editIcon} alt=" " /></button>
                            <button><img src={trashIcon} alt=" " onClick={() => setIsDeleteConfirmPopupOpen(true)} /></button>
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
              tableData.map((rowData) => (
                <Accordion key={rowData.key}
                  synergyName={rowData.synergyName}
                  creatorImg={rowData.creatorImg}
                  creator={rowData.creator}
                  synergyImg={rowData.synergyImg}
                  price={rowData.price}
                  synergiesAngles={rowData.synergiesAngles}
                  date={rowData.date}
                />))
            }
          </div>

          <div className="synergies_table_pagination">
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
          </div>
        </div>
      </div>

      <AddSynergiesPopup
        open={isAddAngelPopupOpen}
        handleClose={() => setIsAddAngelPopupOpen(false)}
      />

      <DeleteConfirmPopup
        open={isDeleteConfirmPopupOpen}
        handleClose={() => setIsDeleteConfirmPopupOpen(false)}
      />

    </>
  )
}

export default SynergiesManager
