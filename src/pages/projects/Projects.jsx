import './projects.scss'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { ROUTER } from '../../utils/routes/routes'
import searchIcon from "../../assets/search-icon.png"
import Card from '../../components/project-card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { getMemberApi, getProjectsAPI } from '../../api-services/projectApis'
import { GradientGraphIcon, GredientGlobalIcon } from '../../utils/SVGs/SVGs'
import { projectTypesOptions, synergyAnglesOptions } from '../../utils/constants/options'
import MultiselectDropDown from '../../components/multiselect-dropdwon/MultiselectDropDown'
import SynergyRequestSuccessfullySentPopup from '../../components/popup/synergy-request-successfully-sent-popup/SynergyRequestSuccessfullySentPopup'

const Projects = () => {
    const [activeLayout, setActiveLayout] = useState('TRENDING');
    const [isSynergyRequestSuccessfullySentPopupOpen, setIsSynergyRequestSuccessfullySentPopupOpen] = useState(false);

    const dispatch = useDispatch();

    // projects
    const data = useSelector((state) => state.project.projects)

    const featuredProjects = data.filter(project => project.featured === 1);


    const [initialProject, setInitialProject] = useState([])

    const [filterProject, setFilterProject] = useState([])

    const [filter, setFilter] = useState({
        synergyAngleValues: [],
        status: '',
        sortBy: '',
        types: [],
        searchBy: ''
    })



    const [initialFeaturedProject, setInitialFeaturedProject] = useState([])

    const [filterFeaturedProject, setFilterFeaturedProject] = useState([])


    const handleActive = (key) => {
        setActiveLayout(key);
    }

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

    const handleSearchChange = useCallback(
        debounce((value) => {
            console.log('value', value)
            setFilter((prevFilter) => ({
                ...prevFilter,
                searchBy: value,
            }));
        }, 500),
        []
    );


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
        let featuredData = initialFeaturedProject;
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

            featuredData = featuredData.filter((project) =>
                project.projectName.toLowerCase().includes(searchKeyword) ||
                project.description.toLowerCase().includes(searchKeyword)
            );

        }

        setFilterProject([...data])
        setFilterFeaturedProject(featuredData)

    }, [filter])

    const getProjectsData = (data) => {
        const projectData = [
            ...data.map((project, index) => {
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

        return projectData
    }

    useEffect(() => {
        const projectData = getProjectsData(data)

        setInitialProject([...projectData])
        setFilterProject([...projectData])

        const featuredProjectData = getProjectsData(featuredProjects)

        setInitialFeaturedProject([...featuredProjectData])
        setFilterFeaturedProject([...featuredProjectData])
    }, [data])



    return (
        <>
            <div className="project_content_Wraper">
                <div className="project_content_header">
                    <div className="project_content_left">
                        <h2>Projects</h2>
                        <div className="search_box">
                            <img className="search_icon" src={searchIcon} alt="Search" />
                            <input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
                        </div>
                    </div>
                    <div className="project_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
                <div className="project_content_body">
                    <div className="featured_project_page_data">
                        <div className="featured_projects_card_box">
                            <div className="featured_projects_card_header">
                                <div className="featured_projects_card_header_left"> Featured projects </div>
                                <div className="featured_projects_card_header_right">
                                    <Link to={ROUTER.featuredProjects} className="btn_gray">View all</Link>
                                </div>
                            </div>
                            <div className="featured_projects_card_body_main">
                                <div className="featured_projects_card_body">
                                    {
                                        filterFeaturedProject.slice(0, 4).map((data) => {
                                            return (
                                                <>
                                                    <Card
                                                        isFeatured={data.isFeatured == 1}
                                                        name={data.projectName}
                                                        img={data.synergyImg}
                                                        synergiesAngles={data.synergiesAngles}
                                                        price={data.price}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all_project_page_data">
                        <div className="all_projects_card_box">
                            <div className="all_projects_card_header">
                                <div className="all_projects_card_header_top"> All projects </div>
                                <div className="all_projects_card_header_bottom">
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
                                                console.log('currentOptions', currentOptions)
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

                            <div className="all_projects_card_body">
                                {
                                    filterProject.map((data) => {
                                        return (
                                            <>
                                                <Card
                                                    isFeatured={data.isFeatured == 1}
                                                    name={data.projectName}
                                                    img={data.synergyImg}
                                                    synergiesAngles={data.synergiesAngles}
                                                    price={data.price}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* pagination  */}
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
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
            <SynergyRequestSuccessfullySentPopup
                open={isSynergyRequestSuccessfullySentPopupOpen}
                handleClose={() => setIsSynergyRequestSuccessfullySentPopupOpen(false)}
            />
        </>
    )
}

export default Projects