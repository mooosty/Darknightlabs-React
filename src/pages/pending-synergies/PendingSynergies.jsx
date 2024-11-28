import './pendingSynergies.scss'
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import searchIcon from "../../assets/search-icon.png";
import { useDispatch, useSelector } from 'react-redux';
import angelBg from '../../assets/edit-senergies-hero-image.png'
import { getSynergyRequestApi } from '../../api-services/synergyApi';
import CreateSynergiesPopup from '../../components/popup/create-synergies-popup/CreateSynergiesPopup';
import { AddCircleIcon, CLeseCircleIcon, GlobalIcon } from '../../utils/SVGs/SVGs';
import SynergyRequestCard from '../../components/synergy-request-card/Card';

const buttons = [
  {
    id: 1,
    name: 'IP integration',
    checked: true
  },
  {
    id: 2,
    name: 'Angle48',
    checked: true
  },
  {
    id: 3,
    name: 'Hosting AMAS',
  },
  {
    id: 4,
    name: 'IP Angle48',
    checked: true
  },
  {
    id: 5,
    name: 'IP integration',
    checked: true
  },
  {
    id: 6,
    name: 'IP integration',
  },
  {
    id: 7,
    name: 'Angle48',
  },
  {
    id: 8,
    name: 'Hosting AMAS',
  },
  {
    id: 9,
    name: 'IP Angle48',
    checked: true
  },
  {
    id: 10,
    name: 'IP integration',
  },
  {
    id: 11,
    name: 'IP integration',
  },

]


const PendingSynergies = () => {
  const dispatch = useDispatch()

  const [activeLayout, setActiveLayout] = useState('TAB');
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const { getSynergyRequestLoading, synergyRequests } = useSelector(state => state.synergies)


  const handleActive = (key) => {
    setActiveLayout(key);
  }


  useEffect(() => {
    dispatch(getSynergyRequestApi())
  }, [dispatch])


  return (
    <>
      {getSynergyRequestLoading ? <Loader /> : <>
        <div className="pending_synergies_content_header">
          <div className="content_left">
            <h2>Synergy requests </h2>
            <div className="search_box">
              <img className="search_icon" src={searchIcon} alt="Search" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="content_right">
            <a href="#">Darknight Labs</a>
          </div>
        </div>
        <div className="pending_synergies_page_data">
          <div className="page_data">
            <div className="synergies_page_header">
              <div className="synergies_toggleWrap">
                <button className={`synergies_toggle_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
                  {/* <ListIcon /> */}
                  <span>Newest</span>
                </button>
                <button className={`synergies_toggle_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
                  {/* <GridIcon /> */}
                  <span>Oldest</span>
                </button>
              </div>
            </div>
            <div className="synergies_page_body">
              <div className="card_container">
                {synergyRequests?.map((data, index) => {
                  return (
                    <SynergyRequestCard
                      data={data}
                      key={index}
                      index={index}
                      setIsEditSynergiesPopupOpen={setIsEditSynergiesPopupOpen}
                    />)
                })}
              </div>
              {/* <div className="synergies_pagination">
              <div className="synergies_pagination_content">
                <div className="synergies_pagination_content_text">
                  <span className='pagination_head'>Row per page:</span>
                  <span className='pagination_dropdown'>
                    <select name="page" id="page" >
                      <option value="12">12</option>
                      <option value="10">10</option>
                      <option value="8">8</option></select></span>
                  <span className='pagination_pages'>1-5 of 13</span>
                  <div className="synergies_pagination_content_arrows">
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
          </div>
        </div>


        <CreateSynergiesPopup
          title={"Edit synergy angles"}
          open={isEditSynergiesPopupOpen}
          onClose={() => {
            setIsEditSynergiesPopupOpen(false);
          }}
          body={
            <>
              <div className='model_body'>
                <div className="model_data">
                  <div className="image">
                    <img src={angelBg} alt="" />
                  </div>
                  <div className={`page active`}>
                    <div className="angel_model_data_head">
                      <div className="title">Synergy angles </div>
                    </div>
                    <div className="angel_model_data_body">
                      <div className="angels_container">
                        {buttons.map((data) => (
                          <div key={data.id} className='angel_tab'>
                            <input type="checkbox" defaultChecked={data.checked} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' />
                            <label htmlFor={`angle1+${data.id}`} className='checkbox_label'>
                              <div className="checkbox_label_text" >
                                <GlobalIcon />
                                <span className='checkbox_label_text_head'>{data.name}</span>
                              </div>
                              <div className="angel_add">
                                <AddCircleIcon />
                              </div>
                              <div className="angel_remove" >
                                <CLeseCircleIcon />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }

          footer={<>
            <button className='refuse_btn' onClick={() => {
              setIsEditSynergiesPopupOpen(false);
            }}>Refuse</button>
            <button className='next_btn' onClick={() => {
            }}>Confirm</button>
          </>}
        />

      </>}
    </>
  )
}

export default PendingSynergies
