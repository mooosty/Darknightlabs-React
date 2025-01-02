import './synergiesManager.scss'
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/helper/helper';
import useNoScroll from '../../utils/hooks/useNoScroll';
import { useDispatch, useSelector } from 'react-redux';
import { synergyAnglesOptions } from '../../utils/constants/options';
import { deleteSynergyApi, getSynergyApi, updateSynergyApi } from '../../api-services/synergyApi';
import { SearchIcon, FilterIcon, CloseIcon, DeleteIcon, tableActor, ListIcon, GridIcon } from '../../utils/constants/images';
import { BottomMenu, CustomSearch, DeleteConfirmPopup, EditSynergiesPopup, Loader, Select, SynergyManagerGridLayout, SynergyManagerTableLayout } from '../../components';

const SynergiesManager = () => {
  const [activeLayout, setActiveLayout] = useState('TABLE');
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isMultiDeleteConfirmPopupOpen, setIsMultiDeleteConfirmPopupOpen] = useState(false);
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [synergies, setSynergies] = useState([]);
  const [filterSynergies, setFilterSynergies] = useState([]);
  const [selectedSynergy, setSelectedSynergy] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchStr, setSearchStr] = useState('')

  const [filter, setFilter] = useState({
    synergyAngleValue: '',
    sortBy: '',
    searchBy: ''
  })

  const dispatch = useDispatch();
  useNoScroll([isEditSynergiesPopupOpen, isDeleteConfirmPopupOpen, isMultiDeleteConfirmPopupOpen])
  const synergiesData = useSelector((state) => state.synergies.synergies)
  const isSynergyLoading = useSelector((state) => state.synergies.isLoading)


  const handleActive = (key) => {
    setActiveLayout(key);
  }

  const handleSelectedSynergy = (synergyId) => {
    let tmpSelectedSynergy = [...selectedSynergy]
    const synergy = tmpSelectedSynergy.find((item) => item === synergyId)
    if (synergy) {
      tmpSelectedSynergy = tmpSelectedSynergy.filter((item) => item !== synergyId)
    } else {
      tmpSelectedSynergy.push(synergyId)
    }
    setSelectedSynergy([...tmpSelectedSynergy])
  }

  const handleSelectAllProjects = () => {
    if (selectedSynergy.length === synergies.length && synergies.length !== 0) {
      setSelectedSynergy([])
    } else {
      setSelectedSynergy([
        ...filterSynergies.map((synergy) => synergy.key)
      ])
    }
  }

  const handleCancelSelection = () => {
    setSelectedSynergy([]);
  }

  const handleDeleteSynergy = () => {
    dispatch(deleteSynergyApi({
      synergy_id: deleteId
    })).then(() => {
      setDeleteId(null);
      setIsDeleteConfirmPopupOpen(false);
    })
  }

  const handleMultiDeleteSynergy = () => {
    const tmpArr = selectedSynergy.map((synergyId) => {
      return dispatch(deleteSynergyApi({
        synergy_id: synergyId
      }))
    })
    Promise.allSettled(tmpArr).then(() => {
      setSelectedSynergy([])
      setIsMultiDeleteConfirmPopupOpen(false);
    })
  }

  const handleSaveChanges = ({ synergyName, selectedProject }) => {

    const data = {
      "id": editId,
      "_project_id": selectedProject[0],
      "project2_id": selectedProject[1],
      "synergy_name": synergyName,
    }

    dispatch(updateSynergyApi(data)).then(() => {
      setIsEditSynergiesPopupOpen(false);
      setEditId(null);
    })
  }

  const handleFilterSynergies = (filter) => {
    let data = synergies;
    if (filter.synergyAngleValue !== '') {
      const filterArr = data.filter((synergy) => {
        return synergy.synergiesAngles.findIndex((synergy) => {
          return synergy === filter.synergyAngleValue;
        }) !== -1;
      });
      data = [...filterArr];
    }
    if (filter.sortBy !== '') {
      if (filter.sortBy === 'name') {
        const filterArr = data.sort((synergy1, synergy2) => {
          const firstLetterA = synergy1.synergyName.toLowerCase();
          const firstLetterB = synergy2.synergyName.toLowerCase();

          return firstLetterA.localeCompare(firstLetterB);
        });

        data = [...filterArr];
      }
      else if (filter.sortBy === 'date') {
        const filterArr = data.sort((synergy1, synergy2) => {
          var date1 = synergy1.date.split('/').reverse().join();
          var date2 = synergy2.date.split('/').reverse().join();
          return date1 < date2 ? -1 : (date1 > date2 ? 1 : 0);
        });
        data = [...filterArr];
      }
    }

    if (filter?.searchBy && filter.searchBy !== '') {
      const searchKeyword = filter?.searchBy?.toLowerCase();
      data = data.filter((synergy) =>
        synergy.synergyName?.toLowerCase()?.includes(searchKeyword)
      );
    }
    setFilterSynergies([...data]);
  }

  const handleSynergyAngleChange = (value) => {
    if (value.value === 'All') {
      setFilter({
        ...filter,
        synergyAngleValue: ''
      })
    }
    else {
      setFilter({
        ...filter,
        synergyAngleValue: value.value
      })
    }
  }

  const handleSearchChange = (value) => {
    setSearchStr(value)
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
    let tempData = synergiesData.map((synergy) => {
      return {
        key: synergy.id,
        synergyName: synergy.synergy_name ?? "Synergy Name",
        creatorImg: tableActor,
        creator: 'Joan of Arc',
        synergyImg: synergy.synergy_image,
        price: synergy.price,
        currency: synergy.currency,
        synergiesAngles: synergy.synergy_angles,
        date: formatDate(synergy.date),
        projects: synergy?.['project2_id'] ? [synergy['_project_id'], synergy?.['project2_id']] : [synergy['_project_id']]
      }
    })
    setSynergies([...tempData]);
    setFilterSynergies([...tempData]);
    setFilter({
      synergyAngleValue: '',
      sortBy: ''
    })
  }, [synergiesData])

  useEffect(() => {
    dispatch(getSynergyApi())
  }, [])

  useEffect(() => {
    handleFilterSynergies(filter)
  }, [filter])


  return (
    <div className='synergies_manager_content_wrapper'>
      <div className="synergies_content_header">
        <div className="synergies_content_left">
          <h2>Synergies Manager</h2>
          <div className="search_wrap">
            <CustomSearch value={searchStr} placeholder="Search" onSearchChange={(e) => handleSearchChange(e.target.value)} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          </div>
        </div>
        {isSearchOpen && <div className="mobile_search">
          <span className="icon"><SearchIcon /></span>
          <input value={searchStr} type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
        </div>}
        <div className="synergies_content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>

      <div className="synergies_page_data">
        <div className={`page_data ${isSearchOpen ? 'search_open' : ''}`}>
          <div className="synergies_page_header">
            <div className="synergy_page_header_top">
              <div className="synergies_toggleWrap">
                <button className={`synergies_toggle_btn ${activeLayout === 'TABLE' ? 'active' : ''}`} onClick={() => handleActive('TABLE')} >
                  <ListIcon />
                </button>
                <button className={`synergies_toggle_btn ${activeLayout === 'GRID' ? 'active' : ''}`} onClick={() => handleActive('GRID')} >
                  <GridIcon />
                </button>
              </div>
              <div className='synergies_page_header_button'>
                <button className="btn_gray btn_filter" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  Filters{Object.values(filter).filter(value => value !== '').length > 0 && `(${Object.values(filter).filter(value => value !== '').length})`}
                  <FilterIcon />
                </button>
              </div>
            </div>
            <div className={`synergy_page_filter ${isFilterOpen ? 'active' : ''}`}>
              <div className="angels">
                <Select
                  options={synergyAnglesOptions}
                  placeholder={'All synergies angles'}
                  onChange={(value) => {
                    handleSynergyAngleChange(value);
                  }}
                  showAllOption={true}
                  allOptionText={"All synergies angles"}
                />
              </div>
              <div className="sort">
                <Select
                  options={[
                    { label: 'Synergy Name', value: 'name' },
                    { label: 'Date', value: 'date' },
                  ]}
                  placeholder={'Sort by'}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      sortBy: value.value
                    })
                    handleFilterSynergies({
                      ...filter,
                      sortBy: value.value
                    })
                  }}
                />
              </div>
            </div>
          </div>
          {activeLayout === 'TABLE' &&
            <SynergyManagerTableLayout
              filterSynergies={filterSynergies}
              selectedSynergy={selectedSynergy}
              handleSelectAllProjects={handleSelectAllProjects}
              handleCancelSelection={handleCancelSelection}
              setIsMultiDeleteConfirmPopupOpen={setIsMultiDeleteConfirmPopupOpen}
              setIsBottomMenuOpen={setIsBottomMenuOpen}
              setEditId={setEditId}
              setIsEditSynergiesPopupOpen={setIsEditSynergiesPopupOpen}
              setDeleteId={setDeleteId}
              setIsDeleteConfirmPopupOpen={setIsDeleteConfirmPopupOpen}
              handleSelectedSynergy={handleSelectedSynergy}
            />
          }
          {activeLayout === 'GRID' &&
            <SynergyManagerGridLayout filterSynergies={filterSynergies} />
          }
        </div>
      </div>

      <DeleteConfirmPopup
        open={isDeleteConfirmPopupOpen}
        handleClose={() => {
          setDeleteId(null);
          setIsDeleteConfirmPopupOpen(false)
        }
        }
        handleDelete={() => {
          handleDeleteSynergy()
        }}
        description={`After once a delete project can't be recover...`}
        title={'Are You Sure?'}
      />

      <DeleteConfirmPopup
        open={isMultiDeleteConfirmPopupOpen}
        handleClose={() => {
          setIsMultiDeleteConfirmPopupOpen(false)
        }
        }
        handleDelete={() => {
          handleMultiDeleteSynergy()
        }}
        description={`After once a delete project can't be recover...`}
        title={'Are You Sure?'}
      />

      <EditSynergiesPopup
        open={isEditSynergiesPopupOpen}
        handleClose={() => {
          setIsEditSynergiesPopupOpen(false);
          setEditId(null);
        }}
        synergy={
          synergies.filter((synergy) => synergy.key === editId)[0]
        }
        onSave={handleSaveChanges}
      />

      <BottomMenu
        open={isBottomMenuOpen}
      >
        <button onClick={() => {
          handleCancelSelection()
          setIsBottomMenuOpen(false)
        }}>
          <CloseIcon />
          <span>Cancel </span>
        </button>

        <button onClick={() => {
          setIsMultiDeleteConfirmPopupOpen(true);
          setIsBottomMenuOpen(false);
        }}>
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </BottomMenu>

      <Loader loading={isSynergyLoading} />
    </div>
  )
}

export default SynergiesManager
