import './synergiesManager.scss'
import debounce from 'lodash.debounce';
import { formatDate } from '../../utils/helper/helper';
import useNoScroll from '../../utils/hooks/useNoScroll';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { synergyAnglesOptions } from '../../utils/constants/options';
import { deleteSynergyApi, getSynergyApi, updateSynergyApi } from '../../api-services/synergyApi';
import { searchIcon, filterIcon, closeIcon, trashIcon, tableActor, ListIcon, GridIcon } from '../../utils/constants/images';
import { BottomMenu, DeleteConfirmPopup, EditSynergiesPopup, Loader, Select, SynergyManagerGridLayout, SynergyManagerTableLayout } from '../../components';

const SynergiesManager = () => {
  const [activeLayout, setActiveLayout] = useState('TABLE');
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isMultiDeleteConfirmPopupOpen, setIsMultiDeleteConfirmPopupOpen] = useState(false);
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [synergies, setSynergies] = useState([]);
  const [filterSynergies, setFilterSynergies] = useState([]);
  const [selectedSynergy, setSelectedSynergy] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
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

  const handleSearchChange = useCallback(
    debounce((value) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchBy: value,
      }));
    }, 500),
    []
  );


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
    <>
      <div className="synergies_content_header">
        <div className="synergies_content_left">
          <h2>Synergies Manager</h2>
          <div className="search_box">
            <img className="search_icon" src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
          </div>
        </div>
        <div className="synergies_content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>

      <div className="synergies_page_data">
        <div className="page_data">
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
                  <img src={filterIcon} alt=" " />
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
          <img src={closeIcon} alt="Add" />
          <span>Cancel </span>
        </button>

        <button onClick={() => {
          setIsMultiDeleteConfirmPopupOpen(true);
          setIsBottomMenuOpen(false);
        }}>
          <img src={trashIcon} alt="Delete" />
          <span>Delete</span>
        </button>
      </BottomMenu>

      <Loader loading={isSynergyLoading} />
    </>
  )
}

export default SynergiesManager
