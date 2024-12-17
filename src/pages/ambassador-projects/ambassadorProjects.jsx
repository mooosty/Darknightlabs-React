import './ambassadorProjects.scss'
import debounce from 'lodash.debounce'
import { useCallback, useState } from 'react'
import { searchIcon, } from '../../utils/constants/images'
import { AmbassadorsCard } from '../../components'

const projectsData = [
    {
        projectId: 1,
        timeFramed: false,
        projectName: "AI Research",
        synergyImg: "https://example.com/ai-research.jpg",
        synergiesAngles: ["Machine Learning", "Data Analysis", "Artificial Intelligence"]
    },
    {
        projectId: 2,
        timeFramed: true,
        projectName: "Blockchain Development",
        synergyImg: "https://example.com/blockchain.jpg",
        synergiesAngles: ["Decentralization", "Smart Contracts", "Cryptocurrency"]
    },
    {
        projectId: 3,
        timeFramed: false,
        projectName: "Healthcare Innovation",
        synergyImg: "https://example.com/healthcare.jpg",
        synergiesAngles: ["Telemedicine", "Wearable Tech", "AI in Healthcare"]
    },
    {
        projectId: 4,
        timeFramed: false,
        projectName: "Smart Cities",
        synergyImg: "https://example.com/smart-cities.jpg",
        synergiesAngles: ["IoT", "Urban Planning", "Sustainability"]
    },
    {
        projectId: 5,
        timeFramed: true,
        projectName: "E-commerce Solutions",
        synergyImg: "https://example.com/e-commerce.jpg",
        synergiesAngles: ["Online Shopping", "Payment Solutions", "Logistics"]
    }
];


const AmbassadorProjects = () => {

    const [activeLayout, setActiveLayout] = useState('TRENDING');
    const [filter, setFilter] = useState({
        synergyAngleValues: '',
        types: '',
        searchBy: ''
    })
    console.log(filter);


    const handleActive = (key) => {
        setActiveLayout(key);
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

    return (
        <>
            <div className="ambassador_content_Wraper">
                <div className="ambassador_content_header">
                    <div className="ambassador_content_left">
                        <h2>Projects</h2>
                        <div className="search_box">
                            <img className="search_icon" src={searchIcon} alt="Search" />
                            <input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
                        </div>
                    </div>
                    <div className="ambassador_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>

                <div className="user_ambassador_page_data">
                    <div className="page_data">
                        <div className="ambassador_card_box">
                            <div className="ambassador_card_header">
                                <div className="header_top">Ambassador-exclusive projects</div>
                                <div className="header_bottom">
                                    <div className="btns">
                                        <button className={`btn ${activeLayout === 'TRENDING' ? 'active' : ''}`} onClick={() => handleActive('TRENDING')} >Trending</button>
                                        <button className={`btn ${activeLayout === 'NEWEST' ? 'active' : ''}`} onClick={() => handleActive('NEWEST')} >Newest</button>
                                        <button className={`btn ${activeLayout === 'OLDEST' ? 'active' : ''}`} onClick={() => handleActive('OLDEST')} >Oldest</button>
                                    </div>
                                </div>
                            </div>

                            <div className="ambassador_cards">
                                {projectsData
                                    .map((data, index) => {
                                        return (
                                            <div
                                                className="card_wrap"
                                                key={index}
                                            >
                                                <AmbassadorsCard
                                                    isTimeFramed={data.timeFramed}
                                                    key={data.projectId}
                                                    projectId={data.projectId}
                                                    name={data.projectName}
                                                    img={data.synergyImg}
                                                    synergiesAngles={data.synergiesAngles}
                                                />
                                            </div>
                                        );
                                    })}
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
        </>
    )
}

export default AmbassadorProjects