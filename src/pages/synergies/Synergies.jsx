import './synergies.scss'
import debounce from 'lodash.debounce'
import { formatDate } from '../../utils/helper/helper'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { getSynergyApi } from '../../api-services/synergyApi'
import { synergyAnglesOptions } from '../../utils/constants/options'
import { SearchIcon, tableActor, defaultImg } from '../../utils/constants/images'
import { CheckCircleIcon } from '../../utils/SVGs/SVGs'
import { CustomSearch, Loader, MultiselectDropDown, SynergyCard } from '../../components'


const Synergies = () => {
    const dispatch = useDispatch()

    const [activeLayout, setActiveLayout] = useState('TRENDING');
    const [synergies, setSynergies] = useState([]);
    const [filterSynergies, setFilterSynergies] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchStr, setSearchStr] = useState('')

    const [filter, setFilter] = useState({
        synergyAngleValues: '',
        types: '',
        searchBy: ''
    })
    console.log(filterSynergies);

    const { synergies: synergiesData, isLoading: isSynergyLoading } = useSelector((state) => state.synergies)

    const handleActive = (key) => {
        setActiveLayout(key);
    }

    const getSynergyAngles = (angles) => {
        const selectedLabels = angles?.map((v) => {
            // if (i === 0) {
            //     return {
            //         label: v,
            //         icon: < CheckCircleIcon />
            //     }
            // }

            // if (i === 1) {
            //     return {
            //         label: v,
            //         icon: < CheckCircleIcon />
            //     }
            // }

            return {
                label: v,
                icon: <CheckCircleIcon />
            }
        })


        return selectedLabels
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
        let data = synergies;
        // Filter by Synergy Angle Values (for multiple selected options)
        if (filter.synergyAngleValues && filter.synergyAngleValues.length > 0) {
            data = data.filter((synergy) =>
                filter.synergyAngleValues.some((angleValue) =>
                    synergy.synergiesAngles.some((synergy) => synergy.label === angleValue)
                )
            );
        }

        if (filter.searchBy !== '') {
            const searchKeyword = filter.searchBy?.toLowerCase();
            data = data.filter((synergy) =>
                synergy.synergyName?.toLowerCase().includes(searchKeyword)
            );

        }

        setFilterSynergies([...data])
    }, [filter])

    useEffect(() => {
        let tempData = synergiesData.map((synergy) => {
            const angles = getSynergyAngles(synergy.synergy_angles)

            return {
                id: synergy.id,
                synergyName: synergy.synergy_name ?? "Synergy Name",
                creatorImg: tableActor,
                creator: 'Joan of Arc',
                synergyImg: synergy.synergy_image,
                price: synergy.price,
                currency: synergy.currency,
                synergiesAngles: angles,
                date: formatDate(synergy.date),
                projects: synergy?.['project2_id'] ? [synergy['_project_id'], synergy?.['project2_id']] : [synergy['_project_id']],
                status: synergy.status === null ? 'pending' : synergy.status
            }
        })
        setSynergies([...tempData]);
        setFilterSynergies([...tempData]);
        setFilter({
            synergyAngleValues: '',
            types: [],
            searchBy: ''
        })

    }, [synergiesData])

    useEffect(() => {
        dispatch(getSynergyApi())
    }, [])

    return (
        <>
            <div className="synergies_content_Wraper">
                <div className="synergies_content_header">
                    <div className="synergies_content_left">
                        <h2>Synergies</h2>
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

                <div className="user_synergies_page_data">
                    <div className={`page_data ${isSearchOpen ? 'search_open' : ''}`}>
                        <div className="synergies_card_box">
                            <div className="synergies_card_header">
                                <div className="header_top"> Available synergies </div>
                                <div className="header_bottom">
                                    <div className="btns">
                                        <button className={`btn ${activeLayout === 'TRENDING' ? 'active' : ''}`} onClick={() => handleActive('TRENDING')} >Trending</button>
                                        <button className={`btn ${activeLayout === 'NEWEST' ? 'active' : ''}`} onClick={() => handleActive('NEWEST')} >Newest</button>
                                        <button className={`btn ${activeLayout === 'OLDEST' ? 'active' : ''}`} onClick={() => handleActive('OLDEST')} >Oldest</button>
                                    </div>
                                    <div className="selects">
                                        <MultiselectDropDown
                                            options={synergyAnglesOptions}
                                            placeholder={'All synergies angles'}
                                            onApply={(currentOptions) => {
                                                const synergiesAnglesValues = currentOptions?.map((option) => option.value)
                                                setFilter({
                                                    ...filter,
                                                    synergyAngleValues: synergiesAnglesValues
                                                })
                                            }}
                                        >
                                        </MultiselectDropDown>
                                    </div>
                                </div>
                            </div>

                            <div className="synergies_cards">
                                {
                                    filterSynergies.map((data, index) => {
                                        return (
                                            <div key={index} className='card_wrap'>
                                                <SynergyCard img={(data.synergyImg === '' || !data.synergyImg) ? defaultImg : data.synergyImg}
                                                    name={data.synergyName}
                                                    price={data.price}
                                                    tags={data.tags || ['#Metaverse', '#AI', '#Gaming']}
                                                    // tags={data.tags || ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming']}
                                                    status={data.status}
                                                    description='lorem Reprehenderit aliqua sit quis cillum dolor Lorem incididunt reprehenderit est elit et.'
                                                    synergiesAngles={data.synergiesAngles}
                                                    synergyId={data.id}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* pagination  */}
                        {/* <div className="pagination">
                        <div className="pagination_content">
                            <div className="pagination_content_text">
                                <span className='pagination_head'>Row per page:</span>
                                <span className='pagination_dropdown'>
                                    <select name="cars" id="cars" >
                                        <option value="10">12</option>
                                        <option value="11">11</option>
                                        <option value="12">10</option>
                                        <option value="13">9</option></select></span>
                                <span className='pagination_pages'>1-5 of 13</span>
                                <div className="pagination_content_arrows">
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

            <Loader loading={isSynergyLoading} />
        </>
    )
}

export default Synergies