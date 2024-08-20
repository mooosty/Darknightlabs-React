import { BackArrow, GradientGraphIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, LeftIcon, RightIcon, StarIcon } from "../../../utils/SVGs/SVGs"
import searchIcon from "../../../assets/search-icon.png"
import cardImg1 from "../../../assets/project-card-img-1.png"
import cardImg2 from "../../../assets/project-card-img-2.png"
import cardImg3 from "../../../assets/project-card-img-3.png"
import cardImg4 from "../../../assets/project-card-img-4.png"
import SynergyRequestSuccessfullySentPopup from "../../../components/popup/synergy-request-successfully-sent-popup/SynergyRequestSuccessfullySentPopup"
import { useState } from "react"
import Card from "../../../components/project-card/Card"
import './featuredAllProjects.scss'
import MultiselectDropDown from "../../../components/multiselect-dropdwon/MultiselectDropDown"

const featuredAllCardData = [
    {
        img: cardImg1,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg1,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg1,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },
    {
        img: cardImg1,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
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
                icon: StarIcon,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        price: '0,000000001',
    },

]

const FeaturedAllProjects = () => {
    const [isSynergyRequestSuccessfullySentPopupOpen, setIsSynergyRequestSuccessfullySentPopupOpen] = useState(false);

    return (
        <>
            <div className="featured_all_project_content_Wraper">
                <div className="featured_all_project_content_header">
                    <div className="featured_all_project_content_left">
                        <span onClick={()=>{window.history.back()}}>
                        <BackArrow />
                        </span>
                        <h2>Featured Projects</h2>
                    </div>
                    <div className="featured_all_project_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
                <div className="featured_project_page_data">
                    <div className="featured_projects_card_box">
                        <div className="featured_projects_card_header">
                            <div className="featured_projects_card_header_left">
                                <div className="search_box">
                                    <img className="search_icon" src={searchIcon} alt="Search" />
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                            <div className="featured_projects_card_header_right">
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
                        <div className="featured_projects_card_body_main">
                            <div className="featured_projects_card_body">
                                {
                                    featuredAllCardData.map((data) => {
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
                </div>
            </div>

            <SynergyRequestSuccessfullySentPopup
                open={isSynergyRequestSuccessfullySentPopupOpen}
                handleClose={() => setIsSynergyRequestSuccessfullySentPopupOpen(false)}
            />
        </>
    )
}

export default FeaturedAllProjects
