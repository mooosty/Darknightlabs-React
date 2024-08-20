import './projects.scss'
import searchIcon from "../../assets/search-icon.png"
import cardImg1 from "../../assets/project-card-img-1.png"
import cardImg2 from "../../assets/project-card-img-2.png"
import cardImg3 from "../../assets/project-card-img-3.png"
import cardImg4 from "../../assets/project-card-img-4.png"
import cardImg5 from "../../assets/project-card-img-5.png"
import cardImg6 from "../../assets/project-card-img-6.png"
import cardImg7 from "../../assets/project-card-img-7.png"
import cardImg8 from "../../assets/project-card-img-8.png"
import cardImg9 from "../../assets/project-card-img-9.png"
import cardImg10 from "../../assets/project-card-img-10.png"
import cardImg11 from "../../assets/project-card-img-11.png"
import cardImg13 from "../../assets/project-card-img-13.png"
import cardImg14 from "../../assets/project-card-img-14.png"
import cardImg15 from "../../assets/project-card-img-15.png"
import { GradientGraphIcon, GredientGlobalIcon, HealthIcon, StarIcon, GrammerlyIcon, LeftIcon, RightIcon } from '../../utils/SVGs/SVGs'
import Card from '../../components/project-card/Card'
import { useState } from 'react'
import MultiselectDropDown from '../../components/multiselect-dropdwon/MultiselectDropDown'
import SynergyRequestSuccessfullySentPopup from '../../components/popup/synergy-request-successfully-sent-popup/SynergyRequestSuccessfullySentPopup'
import { Link } from 'react-router-dom'
import { ROUTER } from '../../utils/routes/routes'

const featuredCardData = [
    {
        img: cardImg1,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg2,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg3,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg4,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
]

const allCardData = [
    {
        img: cardImg5,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg6,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg7,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg8,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg9,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg10,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg11,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg14,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg13,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg14,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg15,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg14,
        name: 'Project Name',
        synergiesAngles: [
            {
                icon: <GredientGlobalIcon />,
                label: 'IP integration',
                tooltip: 'Integrate your IP in our Comic Books',
            },
            {
                icon: <GradientGraphIcon />,
                label: 'Hosting AMAS',
                tooltip: 'Hosting your AMAS in our Comic Books',
            },
            {
                icon: <GrammerlyIcon />,
                label: 'Angle48',
                tooltip: 'Angle your 48 in our Comic Books',
            },
            {
                icon: <HealthIcon />,
                label: 'Angle49',
                tooltip: 'Angle your 49 in our Comic Books',
            },
            {
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
]



const Projects = () => {
    const [activeLayout, setActiveLayout] = useState('TRENDING');
    const [isSynergyRequestSuccessfullySentPopupOpen, setIsSynergyRequestSuccessfullySentPopupOpen] = useState(false);

    const handleActive = (key) => {
        setActiveLayout(key);
    }


    return (
        <>
            <div className="project_content_Wraper">
                <div className="project_content_header">
                    <div className="project_content_left">
                        <h2>Projects</h2>
                        <div className="search_box">
                            <img className="search_icon" src={searchIcon} alt="Search" />
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="project_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
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
                                    featuredCardData.map((data) => {
                                        return (
                                            <>
                                                <Card
                                                    name={data.name}
                                                    img={data.img}
                                                    synergiesAngles={data.synergiesAngles}
                                                    price={data.price}
                                                > </Card>
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
                                        options={[
                                            { label: 'IP integration', value: 'iPIntegration' },
                                            { label: 'Hosting AMAS', value: 'hostingAMAS' },
                                            { label: 'Angle48', value: 'angle48' },
                                            { label: 'Hosting AMAS', value: 'angle49' },
                                            { label: 'Angle48', value: 'angle50' },
                                            { label: 'Hosting AMAS', value: 'hostingAMAS1' },
                                            { label: 'Angle48', value: 'angle481' },
                                            { label: 'Hosting AMAS', value: 'hostingAMAS3' },
                                            { label: 'Angle49', value: 'angle491' },
                                            { label: 'IP integration', value: 'iPIntegration1' }
                                        ]}
                                        placeholder={'All synergies angles'}
                                    >
                                    </MultiselectDropDown>
                                    <MultiselectDropDown
                                        options={[
                                            { label: 'IP integration', value: 'iPIntegrations' },
                                            { label: 'Hosting AMAS', value: 'hostingAMASs' },
                                            { label: 'Angle48', value: 'angle48s' },
                                            { label: 'Hosting AMAS', value: 'angle49s' },
                                            { label: 'Angle48', value: 'angle50s' },
                                            { label: 'Hosting AMAS', value: 'hostingAMAS1s' },
                                            { label: 'Angle48', value: 'angle481s' },
                                            { label: 'Hosting AMAS', value: 'hostingAMAS3s' },
                                            { label: 'Angle49', value: 'angle491s' },
                                            { label: 'IP integration', value: 'iPIntegration1s' }
                                        ]}
                                        placeholder={'All project types'}
                                    >
                                    </MultiselectDropDown>
                                </div>
                            </div>
                        </div>

                        <div className="all_projects_card_body">
                            {
                                allCardData.map((data) => {
                                    return (
                                        <>
                                            <Card
                                                name={data.name}
                                                img={data.img}
                                                synergiesAngles={data.synergiesAngles}
                                                price={data.price}
                                            />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="project_page_pagination">
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