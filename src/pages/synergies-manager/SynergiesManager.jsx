import './synergiesManager.scss'
import searchIcon from "../../assets/search-icon.png";
import filterIcon from "../../assets/filter.svg";
import addIcon from "../../assets/add-icon.png"
import globalIcon from "../../assets/global.svg";
import tableActor from "../../assets/tableActorImage.jpg";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.png";
import AddSynergiesPopup from '../../components/popup/add-synergies-popup/AddSynergiesPopup';
import { GradientGraphIcon, GredientGlobalIcon, GridIcon, ListIcon, MoreIcon } from '../../utils/SVGs/SVGs';
import { useEffect, useState } from 'react';
import DeleteConfirmPopup from '../../components/popup/delete-confirm-popup/DeleteConfirmaPopup';
import Accordion from '../../components/accordion/Accordion';
import CreateSynergiesPopup from '../../components/popup/create-synergies-popup/CreateSynergiesPopup';
import EditSynergiesAngelPopup from '../../components/popup/edit-synergies-angel-popup/EditSynergiesAngelPopup';
import ConfirmSynergiesPopup from '../../components/popup/confirm-senergies-popup/ConfirmSynergiesPopup';
import SynergieaCreatedSuccessfullyPopup from '../../components/popup/synergiea-created-successfully-popup/SynergieaCreatedSuccessfullyPopup';
import EditSynergiesPopup from '../../components/popup/edit-synergies-popup/EditSynergiesPopup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSynergyApi, getSynergyApi, updateSynergyApi } from '../../api-services/synergyApi';
import closeIcon from "../../assets/X-icon.png";
import BottomMenu from '../../components/buttom-menu/BottomMenu';
import Select from '../../components/select/Select';
import Loader from '../../components/loader/Loader';
import cardImg from '../../assets/project-card-img-1.png'

const synergyAnglesOptions = [
  {
    label: 'Getting whitelist spots',
    value: 'Getting whitelist spots',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Giving whitelists spots',
    value: 'Giving whitelists spots',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Hosting AMAs',
    value: 'Hosting AMAs',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Integrating branded game assets',
    value: 'Integrating branded game assets',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Integrating your own branded assets',
    value: 'Integrating your own branded assets',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Getting early alpha',
    value: 'Getting early alpha',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'Sharing early alpha',
    value: 'Sharing early alpha',
    tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
  },
  {
    label: 'IP integration',
    value: 'IP integration',
    tooltip: 'IP integration'
  }
]


const SynergiesManager = () => {
  const [activeLayout, setActiveLayout] = useState('TAB');
  const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isMultiDeleteConfirmPopupOpen, setIsMultiDeleteConfirmPopupOpen] = useState(false);
  const [isEditSynergiesAngelPopupOpen, setIsEditSynergiesAngelPopupOpen] = useState(false);
  const [isEditSynergiesPopupOpen, setIsEditSynergiesPopupOpen] = useState(false);
  const [isCreateSynergiesPopupOpen, setIsCreateSynergiesPopupOpen] = useState(false);
  const [isConfirmSynergiesPopupOpen, setIsConfirmSynergiesPopupOpen] = useState(false);
  const [isSynergieaCreatedSuccessfullyPopupOpen, setIsSynergieaCreatedSuccessfullyPopupOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [synergies, setSynergies] = useState([]);
  const [filterSynergies, setFilterSynergies] = useState([]);
  const [selectedSynergy, setSelectedSynergy] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState({
    synergyAngleValue: '',
    sortBy: ''
  })

  const data = useSelector((state) => state.synergies.synergies)
  const synergyApiLoading = useSelector((state) => state.synergies.isLoading)

  const dispatch = useDispatch();

  const handleActive = (key) => {
    setActiveLayout(key);
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
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

    // let tempSynergies = [...synergies.map((synergy) => {
    //   if (synergy.key === editId) {
    //     return {
    //       ...synergy,
    //       synergyName: synergyName,
    //       projects: selectedProject
    //     }
    //   }
    //   else return synergy;
    // })]
    // setSynergies([...tempSynergies])
    // setFilterSynergies([...tempSynergies])
    // setIsEditSynergiesPopupOpen(false);
    // setEditId(null);
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
    setFilterSynergies([...data]);
  }

  const handleSynergyAngleChange = (value) => {
    if (value.value === 'All') {
      setFilter({
        ...filter,
        synergyAngleValue: ''
      })
      handleFilterSynergies({
        ...filter,
        synergyAngleValue: ''
      });
    }
    else {
      setFilter({
        ...filter,
        synergyAngleValue: value.value
      })
      handleFilterSynergies({
        ...filter,
        synergyAngleValue: value.value
      });
    }
  }

  useEffect(() => {
    let tempData = data.map((synergy) => {
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
  }, [data])

  useEffect(() => {
    dispatch(getSynergyApi())
  }, [])



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
        <div className="page_data">
          <div className="synergies_page_header">
            <div className="synergy_page_header_top">
              <div className="synergies_toggleWrap">
                <button className={`synergies_toggle_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
                  <ListIcon />
                </button>
                <button className={`synergies_toggle_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
                  <GridIcon />
                </button>
              </div>
              <div className='synergies_page_header_button'>
                <button className="btn_gray btn_filter" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  Filters{Object.values(filter).filter(value => value !== '').length > 0 && `(${Object.values(filter).filter(value => value !== '').length})`}
                  <img src={filterIcon} alt=" " />
                </button>
                {/* <button className={`btn_gray`}> Add new synergy
                  <img src={addIcon} alt=" " />
                </button> */}
                {/* <button className={`btn_gray active`} onClick={() => setIsCreateSynergiesPopupOpen(true)}> Synergize </button> */}
                {/* <button className={`btn_gray`} disabled> Next Page </button> */}
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
          {activeLayout === 'TAB' &&
            <div className="synergies_page_body">
              <div className={`synergy_page_table_handler ${selectedSynergy.length > 0 ? 'active' : ''}`}>
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
                <div className="table_actions">
                  <button className="btn_cancle btn_gray" onClick={handleCancelSelection}>
                    <img src={closeIcon} alt="Add" />
                    <span>Cancel</span>
                  </button>
                  <button className="btn_delete" onClick={() => {
                    setIsMultiDeleteConfirmPopupOpen(true);
                  }}>
                    <img src={trashIcon} alt="Delete" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="table_actions_button">
                  <button className="button_delete " onClick={() => {
                    setIsMultiDeleteConfirmPopupOpen(true);
                  }}>
                    <img src={trashIcon} alt="Delete" />
                  </button>
                  <button className="menu_button" onClick={() => setIsBottomMenuOpen(true)}>
                    <MoreIcon />
                  </button>
                </div>
              </div>
              <div className="synergies_page_table">
                {/* // ! loader set in table body when data is not fetched */}
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
                                <img src={rowData.synergyImg} alt=" " />
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
                                  <img src={trashIcon} alt=" " />
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
          }
          {activeLayout === 'LAYOUT' &&
            <div className='card_container'>
              {filterSynergies.map((cardData, index) => {
                const cardImage = cardData.synergyImg                
                return (
                  <>
                    <div key={index} className={`card `}>
                      <div className="card_image">
                        {/* synergyImg */}
                        <img src={!cardImage ? cardImg : cardImage} alt=" " />
                      </div>
                      <div className="card_body">
                        <div className="name">
                          {cardData.synergyName}
                        </div>
                        <div className="creator">
                          <img src={cardData.creatorImg} alt="" />
                        <span className="creator_name">{cardData.creator}</span> 
                        </div>
                        <div className="tabs">
                          {
                            cardData.synergiesAngles.slice(0, 3).map((Angle, index) => (
                              <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                <div className='angle_tag'>
                                  <>{index === 0 && <div className='icon'><GredientGlobalIcon /></div>}</>
                                  <>{index === 1 && <div className='icon'><GradientGraphIcon /></div>}</>
                                  <span className='text'>
                                    <span>{Angle}</span>
                                  </span>
                                </div>
                              </div>
                            ))
                          }
                          {/* {cardData.synergiesAngles.length > 3 ?
                            <div className="angle_tag">
                              <span className='angle_tag_count'>+{cardData.synergiesAngles.length - 3}</span>
                            </div>
                            : ''} */}
                        </div>
                        {/* <div className='tabs'>
                          {cardData.date}
                        </div> */}
                      </div>
                    </div>
                  </>
                )
              })
              }
            </div>
          }
        </div>
      </div>

      <AddSynergiesPopup
        open={isAddAngelPopupOpen}
        handleClose={() => setIsAddAngelPopupOpen(false)}
      />

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

      <SynergieaCreatedSuccessfullyPopup
        open={isSynergieaCreatedSuccessfullyPopupOpen}
        handleClose={() => setIsSynergieaCreatedSuccessfullyPopupOpen(false)}
      />

      <CreateSynergiesPopup
        open={isCreateSynergiesPopupOpen}
        handleClose={() => setIsCreateSynergiesPopupOpen(false)}
      />

      <EditSynergiesAngelPopup
        open={isEditSynergiesAngelPopupOpen}
        handleClose={() => setIsEditSynergiesAngelPopupOpen(false)}
      />

      <ConfirmSynergiesPopup
        open={isConfirmSynergiesPopupOpen}
        handleClose={() => setIsConfirmSynergiesPopupOpen(false)}
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

      <Loader loading={synergyApiLoading} />
    </>
  )
}

export default SynergiesManager
