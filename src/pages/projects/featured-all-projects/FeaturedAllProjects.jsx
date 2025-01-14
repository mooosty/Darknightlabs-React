import './featuredAllProjects.scss'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDate } from '../../../utils/helper/helper'
import { getMemberApi, getProjectsAPI } from "../../../api-services/projectApis"
import { BackArrow, GradientGraphIcon, GredientGlobalIcon, SearchIcon } from "../../../utils/constants/images"
import { projectTypesOptions, synergyAnglesOptions } from "../../../utils/constants/options"
import { CustomSearch, MultiselectDropDown, ProjectCard } from '../../../components'

const FeaturedAllProjects = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.project.projects)
    const featuredProjects = data.filter(project => project.featured === 1);
    const [initialProject, setInitialProject] = useState([])
    const [filterProject, setFilterProject] = useState([])
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchStr, setSearchStr] = useState('')

    const [filter, setFilter] = useState({
        synergyAngleValues: [],
        status: '',
        sortBy: '',
        types: [],
        searchBy: ''
    })

    const getSynergyAngles = (project) => {
        const selectedLabels = Object.values(project.synergy_angles)?.map((v, i) => {
            if (i === 0) {
                return {
                    label: v,
                    icon: <GredientGlobalIcon />
                }
            }

            if (i === 1) {
                return {
                    label: v,
                    icon: <GradientGraphIcon />
                }
            }

            return {
                label: v
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
        if (data.length === 0)
            dispatch(getProjectsAPI()).then((res) => {
                if (res?.payload?.length > 0) {
                    res.payload.map((project) => {
                        dispatch(getMemberApi(project.project_id))
                    })
                }
            });
    }, [])

    useEffect(() => {
        let data = initialProject;
        // Filter by Synergy Angle Values (for multiple selected options)
        if (filter.synergyAngleValues && filter.synergyAngleValues.length > 0) {
            data = data.filter((project) =>
                filter.synergyAngleValues.some((angleValue) =>
                    project.synergiesAngles.some((synergy) => synergy.label === angleValue)
                )
            );
        }


        if (filter.types && filter.types.length > 0) {

            const filterArr = data.filter((project) => {
                // Normalize and check if the project type matches any filter type (case insensitive, without spaces)
                const projectTypes = project.type?.map(typeVal => typeVal.replace(/^#/, '').trim().toUpperCase());
                return filter.types.some(filterType => projectTypes.includes(filterType.toUpperCase()));
            });
            data = [...filterArr];
        }

        if (filter.searchBy !== '') {
            const searchKeyword = filter.searchBy.toLowerCase();
            data = data.filter((project) =>
                project.projectName.toLowerCase().includes(searchKeyword) ||
                project.description.toLowerCase().includes(searchKeyword)
            );
        }

        setFilterProject([...data])
    }, [filter])

    useEffect(() => {
        const projectData = [
            ...featuredProjects.map((project, index) => {
                let tags = project.project_info?.split('#') || [];
                tags = tags.filter(tag => tag).map(tag => `#${tag}`);

                // let synergy_angles = Object.keys(project.synergy_angles)
                //     .map(key => project.synergy_angles[key] ? { label: project.synergy_angles[key] } : null)
                //     .filter(item => item);


                let synergy_angles = getSynergyAngles(project)

                const row = {
                    key: index,
                    checked: false,
                    projectName: project.project_name,
                    teamMembers: project?.teamMembers ?? [],
                    synergyImg: project.image ?? '',
                    synergiesAngles: synergy_angles,
                    type: tags,
                    isFeatured: project.featured,
                    date: formatDate(project.date),
                    disabled: false,
                    description: project.description,
                    projectId: project.project_id,
                }
                return row;
            })
        ]
        setInitialProject([...projectData])
        setFilterProject([...projectData])
    }, [data])

    return (
        <>
            <div className="featured_all_project_content_Wrapper">
                <div className="featured_all_project_content_header">
                    <div className="featured_all_project_content_left">
                        <span onClick={() => { window.history.back() }}>
                            <BackArrow />
                        </span>
                        <h2>Featured Projects</h2>
                    </div>
                    <div className="featured_all_project_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
                <div className="featured_project_page_data">
                    <div className={`featured_projects_card_box `}>
                        <div className="featured_projects_card_header">
                            <div className="featured_projects_card_header_left">
                                <div className="search_wrap">
                                    <CustomSearch value={searchStr} placeholder="Search" onSearchChange={(e) => handleSearchChange(e.target.value)} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
                                </div>
                            </div>
                            {isSearchOpen && <div className="mobile_search">
                                <span className="icon"><SearchIcon /></span>
                                <input value={searchStr} type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
                            </div>}
                            <div className="featured_projects_card_header_right">
                                <div className="selects">
                                    <MultiselectDropDown
                                        options={synergyAnglesOptions}
                                        placeholder={'All synergies angles'}
                                        onApply={(currentOptions) => {
                                            setFilter({
                                                ...filter,
                                                synergyAngleValues: currentOptions?.map((option) => option.value)
                                            })
                                        }}
                                    >
                                    </MultiselectDropDown>
                                    <MultiselectDropDown
                                        options={projectTypesOptions}
                                        placeholder={'All project types'}
                                        onApply={(currentOptions) => {
                                            setFilter({
                                                ...filter,
                                                types: currentOptions?.map((option) => option.value)
                                            })
                                        }}
                                    >
                                    </MultiselectDropDown>
                                </div>
                            </div>
                        </div>
                        <div className="featured_projects_card_body_main">
                            <div className="featured_projects_card_body">
                                {
                                    filterProject.map((data, index) => {
                                        return (
                                            <div className='card_wrap' key={index} >
                                                <ProjectCard
                                                    isFeatured={data.isFeatured}
                                                    name={data.projectName}
                                                    img={data.synergyImg}
                                                    synergiesAngles={data.synergiesAngles}
                                                    price={data.price}
                                                    projectId={data.projectId}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* pagination */}
                            {/* <div className="project_page_pagination">
                                <div className="project_page_pagination_content">
                                    <div className="project_page_pagination_content_text">
                                        <span className='pagination_head'>Row per page:</span>
                                        <span className='pagination_dropdown'>
                                            <select name="cars" id="cars" >
                                                <option value="10">12</option>
                                                <option value="11">11</option>
                                                <option value="12">10</option>
                                                <option value="13">9</option></select></span>
                                        <span className='pagination_pages'>1-5 of 13</span>
                                        <div className="project_page_pagination_content_arrows">
                                            <button className={`table_pagination_content_button`}>
                                                <LeftIcon />
                                            </button>
                                            <button className={`table_pagination_content_button`}>
                    <RightIcon />
                </button>
            </div>
        </div >
                                </div >
                            </div > */}
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}

export default FeaturedAllProjects
