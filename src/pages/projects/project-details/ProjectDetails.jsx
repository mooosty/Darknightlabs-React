import './projectDetails.scss'
import Loader from '../../../components/loader/Loader';
import { Link, useParams } from 'react-router-dom';
import arrowRight from "../../../assets/arrow-right.png"
import autherProfile from "../../../assets/auther-profile.png"
// import cardImg from '../../../assets/project-card-img-1.png'
import { DescriptionIcon, GradientGraphIcon, GradientInfiniteIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, InvestmentIcon, MoreIcon, ShareLinkIcon, ShareOutlineIcon, StarIcon, TableStatusIcon } from '../../../utils/SVGs/SVGs'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsApiById } from '../../../api-services/projectApis';

const synergiesAngles = [
    {
        icon: <GredientGlobalIcon />,
        label: 'IP integration',
        text: 'Integrate your IP in our Comic Books'
    },
    {
        icon: <GradientGraphIcon />,
        label: 'Hosting AMAS',
        text: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        icon: <GrammerlyIcon />,
        label: 'Angle48',
        text: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        icon: <HealthIcon />,
        label: 'Angle49',
        text: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        icon: <StarIcon />,
        label: 'Angle50',
        text: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    }]

const ProjectDetails = () => {
    const projectApiLoading = false;
    const [activeLayout, setActiveLayout] = useState('SYNERGY');
    const [data, setData] = useState({});

    const params = useParams();
    const dispatch = useDispatch();

    console.log('Data', data);

    // -- Used data in this page --
    // 1.  project_id 
    // 2.  project_name 
    // 3.  image
    // 4.  featured 
    // 5.  description
    // 6.  investments_access 

    const handleActive = (key) => {
        setActiveLayout(key);
    }

    useEffect(() => {
        dispatch(getProjectsApiById(params.projectId)).then((res) => {
            setData(res?.payload);
        });
    }, [])


    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Projects</h2>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="project_page_data">
                <div className="page_data">
                    <div className="page_header">
                        <div className="pagination">
                            <Link to={'/projects'}>All projects</Link>
                            <span>
                                <img src={arrowRight} alt="" />
                            </span>
                            <p>Project name 111</p>
                        </div>
                    </div>
                    <div className="page_body">
                        <div className="page_content">
                            <div className="project_profile">
                                <div className="project_image">
                                    <img src={data?.image} alt="Project" />
                                </div>
                            </div>
                            <div className="project_page_content">
                                <div className="header">
                                    <div className="left">
                                        <p className="project_title">{data?.project_name}</p>
                                        {data.featured ? <div className='featuredTag'>
                                            <TableStatusIcon /> Featured
                                        </div> : <></>}
                                    </div>
                                    <div className="right">
                                        <div className="buttonGroup">
                                            <button className="button"><ShareLinkIcon /></button>
                                            <button className="button"><ShareOutlineIcon /></button>
                                            <button className="button"><MoreIcon /></button>
                                        </div>
                                        <div className='synergizeTag'>
                                            <GradientInfiniteIcon /> <span className='text'>Synergize</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="project_author">
                                    <span className="created_by">Created by</span>
                                    <img className="auther_profile" src={autherProfile} alt="Author" />
                                    <span className="auther_name">Joan of Arc</span>
                                </div>
                                <div className='synergize_btn'>
                                    <GradientInfiniteIcon /> <span className='text'>Synergize</span>
                                </div>
                                <div className="tags">
                                    <div className="tag">#{data?.project_info}</div>
                                    {/* <div className="tag">#AI</div> */}
                                    {/* <div className="tag">#Metaverse</div> */}
                                </div>
                                <div className="description_container">
                                    <div className="description_header">
                                        <DescriptionIcon />
                                        <span>Description</span></div>
                                    <div className="description_body">
                                        {data?.description}
                                    </div>
                                </div>
                                <div className="toggleButtons">
                                    <button className={`toggle_btn ${activeLayout === 'SYNERGY' ? 'active' : ''}`} onClick={() => handleActive('SYNERGY')} >
                                        <span>Synergy</span>
                                    </button>
                                    <button className={`toggle_btn ${activeLayout === 'INVESTMENT' ? 'active' : ''}`} onClick={() => handleActive('INVESTMENT')} >
                                        <span>Investment</span>
                                    </button>
                                </div>
                                {activeLayout === 'SYNERGY' && <div className="synergy_container">
                                    <div className="synergy_header">
                                        <GradientInfiniteIcon />
                                        <span>Synergy angles</span></div>
                                    <div className="synergy_body">
                                        {synergiesAngles.map((data, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="left">
                                                        <div className={`tag ${index == 0 ? 'global' : index == 1 ? 'graph' : 'white_icon'}`}> {data.icon}
                                                            <span className="text"> {data.label}</span> </div>
                                                    </div>
                                                    <div className="right">{data.text}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>}
                                {activeLayout === 'INVESTMENT' && <div className="investment_container">
                                    <div className="investment_header">
                                        <InvestmentIcon />
                                        <span>Investment info</span></div>
                                    <div className="investment_body">
                                        {data?.investments_access ? <>
                                            <div className="row">
                                                <div className="left">
                                                    Token name:
                                                </div>
                                                <div className="right">$RIFT</div>
                                            </div>
                                            <div className="row">
                                                <div className="left">
                                                    Round:
                                                </div>
                                                <div className="right">Strategiv</div>
                                            </div>
                                            <div className="row">
                                                <div className="left">
                                                    Current backers:
                                                </div>
                                                <div className="right">Morningstar Ventures, lorem ipsum</div>
                                            </div>
                                            <div className="row">
                                                <div className="left">
                                                    Confirmed listings :
                                                </div>
                                                <div className="right">Kucoin, Binance</div>
                                            </div>
                                        </>
                                            : <span>This project is not open for Investments at the moment</span>}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <Loader loading={projectApiLoading} />
        </>
    )
}

export default ProjectDetails
