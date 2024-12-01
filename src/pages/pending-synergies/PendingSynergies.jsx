import './pendingSynergies.scss'
import { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { editSynergyRequest, getSynergyRequestApi } from '../../api-services/synergyApi';
import CreateSynergiesPopup from '../../components/popup/create-synergies-popup/CreateSynergiesPopup';
import { AddCircleIcon, CLeseCircleIcon, GlobalIcon } from '../../utils/SVGs/SVGs';
import SynergyRequestCard from '../../components/synergy-request-card/Card';
import { searchIcon, angelBg } from '../../utils/constants/images';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';


const buttons = [
  {
    id: 1,
    name: 'IP integration',
    value: 'IPIntegration',
    checked: false
  },
  {
    id: 2,
    name: 'Angle48',
    value: 'Angle48',
    checked: false
  },
  {
    id: 3,
    name: 'Hosting AMAS',
    value: 'HostingAMAS',
    checked: false
  },
  {
    id: 4,
    name: 'Angle49',
    value: 'Angle49',
    checked: false
  },
  {
    id: 5,
    name: 'Angle50',
    value: 'Angle50',
    checked: false
  },
  {
    id: 1,
    name: 'IPintegration',
    value: 'IPIntegration',
    checked: false
  },
  {
    id: 3,
    name: 'HostingAMAS',
    value: 'HostingAMAS',
    checked: false
  }
]

const PendingSynergies = () => {
  const dispatch = useDispatch()
  const [activeLayout, setActiveLayout] = useState('TAB');
  const [checkedSynergies, setCheckedSynergies] = useState([])
  const [synergyAngles, setSynergyAngles] = useState([...buttons])
  const [selectedSynergyData, setSelectedSynergyData] = useState({})
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const { getSynergyRequestLoading, synergyRequests } = useSelector(state => state.synergies)
  const [filteredSynergyRequests, setFilteredSynergyRequests] = useState([])
  const [filter, setFilter] = useState({
    searchBy: '',
  })


  const handleActive = (key) => { setActiveLayout(key); }

  const handleUpdateSynergyAngles = () => {
    dispatch(editSynergyRequest({
      synergy_angles: checkedSynergies,
      id: selectedSynergyData?.id,
      _uid: 9
    }))
      .then((response) => {
        if (response?.payload?.success) {
          toast.success('Synergy Angles Updated Successfully')
          setIsEditSynergiesPopupOpen(false)
        } else {
          toast.error('Synergy Angles Not Updated')
        }
      })
  }

  const handleCheckSynergiesAngles = (selectedAngles) => {
    const updatedData = synergyAngles.map((data) => {
      if (selectedAngles === data.value) {
        return {
          ...data,
          checked: !data.checked,
        };
      }
      return data;
    });
    setSynergyAngles(updatedData);
  };

  const handleSearchChange = useCallback(
    debounce((value) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchBy: value,
      }));
    }, 500),
    []
  );


  useEffect(() => {
    if (isEditSynergiesPopupOpen && selectedSynergyData?.synergy_angles) {
      const updatedAngles = synergyAngles.map((angle) => ({
        ...angle,
        checked: selectedSynergyData.synergy_angles.includes(angle.name)
      }));
      setSynergyAngles(updatedAngles);
    }
  }, [isEditSynergiesPopupOpen, selectedSynergyData]);

  useEffect(() => {
    const checked = synergyAngles.filter((data) => data.checked).map((data) => data.name);
    setCheckedSynergies(checked);
  }, [synergyAngles]);

  const renderedAngles = useMemo(() => {
    return synergyAngles.map((data) => (
      <div key={data.id} className='angel_tab'>
        <input
          type="checkbox"
          checked={data.checked}
          onChange={() => handleCheckSynergiesAngles(data.value)}
          name="angleName"
          id={`angle1+${data.id}`}
          className='checkbox_input'
        />
        <label
          htmlFor={`angle1+${data.id}`}
          className='checkbox_label'
        >
          <div className="checkbox_label_text">
            <GlobalIcon />
            <span className='checkbox_label_text_head'>{data.name}</span>
          </div>
          <div className="angel_add">
            <AddCircleIcon />
          </div>
          <div className="angel_remove">
            <CLeseCircleIcon />
          </div>
        </label>
      </div>
    ));
  }, [synergyAngles]);

  useEffect(() => {
    let tmpData = [...synergyRequests]
    console.log('tmpData', tmpData)
    if (filter.searchBy !== '') {
      const searchKeyword = filter.searchBy.toLowerCase();
      tmpData = tmpData.filter((synergy) => synergy.synergy_name?.toLowerCase()?.includes(searchKeyword));
    }
    setFilteredSynergyRequests([...tmpData])
  }, [filter])

  useEffect(() => {
    dispatch(getSynergyRequestApi())
  }, [])


  return (
    <>
      {getSynergyRequestLoading ? <Loader /> : <>
        <div className="pending_synergies_content_header">
          <div className="content_left">
            <h2>Synergy requests </h2>
            <div className="search_box">
              <img className="search_icon" src={searchIcon} alt="Search" />
              <input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
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
                {filteredSynergyRequests?.map((data, index) => {
                  return (
                    <SynergyRequestCard
                      data={data}
                      key={index}
                      index={index}
                      setIsEditSynergiesPopupOpen={setIsEditSynergiesPopupOpen}
                      setSelectedSynergyData={setSelectedSynergyData}
                      handleCheckSynergiesAngles={handleCheckSynergiesAngles}
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
            setIsEditSynergiesPopupOpen(false)
            setSynergyAngles([...buttons])
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
                        {renderedAngles}
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
              setSynergyAngles([...buttons])
            }}>Refuse</button>
            <button className='next_btn' onClick={() => {
              handleUpdateSynergyAngles()
            }}>Confirm</button>
          </>}
        />

      </>}
    </>
  )
}

export default PendingSynergies