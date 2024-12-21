import './ambassadorProjects.scss'
import debounce from 'lodash.debounce'
import { useCallback, useState, useEffect } from 'react'
import { SearchIcon } from '../../utils/constants/images'
import { AmbassadorsCard } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsAPI } from "../../api-services/projectApis";


const AmbassadorProjects = () => {
    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.project)
    const [filterProject, setFilterProject] = useState([]);

    const [activeLayout, setActiveLayout] = useState('TRENDING');
    const [filter, setFilter] = useState({
        synergyAngleValues: '',
        types: '',
        searchBy: ''
    })

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

    useEffect(() => {
        let data = projects;
        if (filter.searchBy !== "") {
            const searchKeyword = filter.searchBy.toLowerCase();
            data = data.filter(
                (project) =>
                    project?.project_name?.toLowerCase().includes(searchKeyword) ||
                    project?.description?.toLowerCase().includes(searchKeyword)
            );
        }
        setFilterProject([...data]);
    }, [filter]);


    useEffect(() => {
        dispatch(getProjectsAPI());
    }, []);

    return (
        <>
            <div className="ambassador_content_Wraper">
                <div className="ambassador_content_header">
                    <div className="ambassador_content_left">
                        <h2>Projects</h2>
                        <div className="search_box">
                            <span className="search_icon"><SearchIcon /></span>
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
                                {filterProject?.map((data, index) => {
                                    return (
                                        <div
                                            className="card_wrap"
                                            key={index}
                                        >
                                            <AmbassadorsCard
                                                isTimeFramed={data?.timeFramed}
                                                key={data?.project_id}
                                                projectId={data?.project_id}
                                                name={data?.project_name}
                                                img={data?.image}
                                                synergiesAngles={data?.synergy_angles}
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