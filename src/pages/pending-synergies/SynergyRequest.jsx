import './synergyRequest.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNoScroll from '../../utils/hooks/useNoScroll';
import { getSynergyRequestApi } from '../../api-services/synergyApi';
import { CustomSearch, EditSynergyAnglePopup, EmptyData, Loader, SynergyRequestCard } from '../../components';
import { SearchIcon } from '../../utils/constants/images';


const SynergyRequest = () => {
  const dispatch = useDispatch()
  const [activeLayout, setActiveLayout] = useState('TAB');
  const [selectedSynergyData, setSelectedSynergyData] = useState({})
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const { getSynergyRequestLoading, synergyRequests } = useSelector(state => state.synergies)
  const [filteredSynergyRequests, setFilteredSynergyRequests] = useState([])
  const [filter, setFilter] = useState({ searchBy: '' })
  useNoScroll([isEditSynergiesPopupOpen])
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('')


  const handleActive = (key) => { setActiveLayout(key); }

  const handleSearchChange = (value) => {
    setSearchStr(value)
  }

  const handleCardClick = (data) => {
    setIsEditSynergiesPopupOpen(true);
    setSelectedSynergyData(data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchBy: searchStr,
      }));
    }, 500)
    return () => clearTimeout(timer)
  }, [searchStr])

  useEffect(() => {
    let tmpData = [...synergyRequests]
    if (filter.searchBy !== '') {
      const searchKeyword = filter.searchBy.toLowerCase();
      tmpData = tmpData.filter((synergy) => synergy.synergy_name?.toLowerCase()?.includes(searchKeyword));
    }
    setFilteredSynergyRequests([...tmpData])
  }, [filter, synergyRequests])

  useEffect(() => {
    dispatch(getSynergyRequestApi())
  }, [])


  return (
    <>
      <div className="pending_synergies_content_header">
        <div className="content_left">
          <h2>Synergy requests </h2>
          <div className="search_wrap">
            <CustomSearch placeholder="Search" value={searchStr} onSearchChange={(e) => handleSearchChange(e.target.value)} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          </div>
        </div>
        {isSearchOpen && <div className="mobile_search">
          <span className="icon"><SearchIcon /></span>
          <input type="text" value={searchStr} placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
        </div>}
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="pending_synergies_page_data">
        <div className={`page_data ${isSearchOpen ? 'search_open' : ''}`}>
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
          {
            getSynergyRequestLoading ? <Loader /> : <>
              <div className="synergies_page_body">
                <div className="card_container">
                  {filteredSynergyRequests?.length == 0 ?
                    <EmptyData />
                    :
                    <>
                      {filteredSynergyRequests?.map((data) => {
                        return (
                          <>
                            <SynergyRequestCard
                              data={data}
                              handleCardClick={handleCardClick}
                            />
                          </>
                        )
                      })}
                    </>
                  }
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
            </>
          }
        </div>
      </div>

      <EditSynergyAnglePopup
        isOpen={isEditSynergiesPopupOpen}
        setIsOpen={setIsEditSynergiesPopupOpen}
        selectedSynergyData={selectedSynergyData}
      />
    </>
  )
}

export default SynergyRequest