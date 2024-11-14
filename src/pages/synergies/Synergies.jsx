import './synergies.scss'
import searchIcon from "../../assets/search-icon.png"
import cardImg1 from "../../assets/synergy1.png"
import cardImg2 from "../../assets/synergy2.png"
import cardImg3 from "../../assets/synergy3.png"
import cardImg4 from "../../assets/synergy4.png"
import cardImg5 from "../../assets/synergy5.png"
import { GradientGraphIcon, GredientGlobalIcon, HealthIcon, StarIcon, GrammerlyIcon, LeftIcon, RightIcon } from '../../utils/SVGs/SVGs'
import Card from '../../components/synergy-card/Card'
import { useState } from 'react'
import MultiselectDropDown from '../../components/multiselect-dropdwon/MultiselectDropDown'
import cardImg from '../../assets/project-card-img-1.png'

const allCardData = [
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
        status: 'Refused',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
        status: 'Live',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
        status: 'Pending',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    },
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
        status: 'Refused',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
                icon: <StarIcon />,
                label: 'Angle50',
                tooltip: 'Angle your 50 in our Comic Books',
            }],
        status: 'Refused',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
        status: 'Pending',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
        status: 'Pending',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
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
        status: 'Pending',
        tags: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
    },
]


const Synergies = () => {
    const [activeLayout, setActiveLayout] = useState('TRENDING');

    const handleActive = (key) => {
        setActiveLayout(key);
    }


    return (
        <>
            <div className="synergies_content_Wraper">
                <div className="synergies_content_header">
                    <div className="synergies_content_left">
                        <h2>Synergies</h2>
                        <div className="search_box">
                            <img className="search_icon" src={searchIcon} alt="Search" />
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="synergies_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>

                <div className="user_synergies_page_data">
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
                                        placeholder={'All synergies angles'}
                                    >
                                    </MultiselectDropDown>
                                </div>
                            </div>
                        </div>

                        <div className="synergies_cards">
                            {
                                allCardData.map((data) => {
                                    return (
                                        <>
                                            <Card
                                                img={data.img === '' ? cardImg : data.img}
                                                name={data.name}
                                                price={data.price}
                                                tags={data.tags}
                                                status={data.status}
                                                synergiesAngles={data.synergiesAngles}
                                                description='lorem Reprehenderit aliqua sit quis cillum dolor Lorem incididunt reprehenderit est elit et.'
                                            />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="pagination">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Synergies