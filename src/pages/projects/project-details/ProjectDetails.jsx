import './projectDetails.scss'
// import { toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useNoScroll from '../../../utils/hooks/useNoScroll';
import { getProjectsApiById } from '../../../api-services/projectApis';
import { CreateSynergyRequestPopup, Loader } from '../../../components';
import { DescriptionIcon, GradientGraphIcon, GradientInfiniteIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, InvestmentIcon, MoreIcon, ShareLinkIcon, CheckIcon, ShareOutlineIcon, StarIcon, TableStatusIcon, RightIcon, fallBackImage, autherProfile } from '../../../utils/constants/images'


const synergiesAnglesIcons = [
    { icon: <GredientGlobalIcon /> },
    { icon: <GradientGraphIcon /> },
    { icon: <GrammerlyIcon /> },
    { icon: <HealthIcon /> },
    { icon: <StarIcon /> },
]
const ProjectDetails = () => {

    const [isCopyLink, setIsCopyLink] = useState(false);
    const [activeLayout, setActiveLayout] = useState('SYNERGY');
    const { projectDetails, isLoading: projectApiLoading } = useSelector((state) => state.project)
    const [isChoosePrioritySynergiesPopupOpen, setIsChoosePrioritySynergiesPopupOpen] = useState(false);
    useNoScroll([isChoosePrioritySynergiesPopupOpen])


    const params = useParams();
    const dispatch = useDispatch();
    const toggleChoosePrioritySynergiesPopupOpen = () => setIsChoosePrioritySynergiesPopupOpen(!isChoosePrioritySynergiesPopupOpen)

    const copyText = () => {
        const text = window.location.href
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success('URL Copied')
    }
    // -- Used projectDetails in this page --
    // 1.  project_id 
    // 2.  project_name 
    // 3.  image
    // 4.  featured 
    // 5.  description
    // 6.  investments_access 

    const handleActive = (key) => {
        setActiveLayout(key);
    }

    const handleCopyLink = () => {
        copyText();
        setIsCopyLink(true)
        setTimeout(() => {
            setIsCopyLink(false);
        }, 1000);
    }

    useEffect(() => {
        dispatch(getProjectsApiById(params.projectId))
    }, [])


    return (
        <div className='project_content_details_wrapper'>
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
                                <RightIcon />
                            </span>
                            <p>{projectDetails?.project_name}</p>
                        </div>
                    </div>
                    <div className="page_body">
                        <div className="page_content">
                            <div className="project_profile">
                                <div className="project_image">
                                    <img
                                        onError={e => {
                                            e.target.src = fallBackImage
                                            e.onerror = null
                                        }} src={projectDetails?.image ?? fallBackImage} alt="Project" />
                                </div>
                            </div>
                            <div className="project_page_content">
                                <div className="header">
                                    <div className="left">
                                        <p className="project_title">{projectDetails?.project_name}</p>
                                        {projectDetails?.featured ? <div className='featuredTag'>
                                            <TableStatusIcon /> Featured
                                        </div> : <></>}
                                    </div>
                                    <div className="right">
                                        <div className="buttonGroup">
                                            <button className="button" onClick={handleCopyLink}>{isCopyLink ? <CheckIcon /> : <ShareLinkIcon />}</button>
                                            <button className="button"><ShareOutlineIcon /></button>
                                            <button className="button"><MoreIcon /></button>
                                        </div>
                                        <div className='synergizeTag' onClick={() => toggleChoosePrioritySynergiesPopupOpen()}>
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
                                    {
                                        projectDetails?.project_info?.split('#')?.filter((item) => item)?.map((data, index) => {
                                            return <div key={index} className="tag">#{data}</div>
                                        })
                                    }
                                </div>
                                <div className="description_container">
                                    <div className="description_header">
                                        <DescriptionIcon />
                                        <span>Description</span></div>
                                    <div className="description_body">
                                        {projectDetails?.description}
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
                                        {projectDetails?.synergy_angles?.map((data, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="left">
                                                        <div className={`tag ${index == 0 ? 'global' : index == 1 ? 'graph' : 'white_icon'}`}> {synergiesAnglesIcons[index % 5].icon}
                                                            <span className="text"> {data[1]}</span> </div>
                                                    </div>
                                                    <div className="right">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
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
                                        {projectDetails?.investments_access ? <>
                                            {
                                                projectDetails?.investments?.map((data, index) => {
                                                    return (

                                                        <div key={index} className="row">
                                                            <div className="left">
                                                                {data[0]} :
                                                            </div>
                                                            <div className="right">{data[1]}</div>
                                                        </div>
                                                    )
                                                })
                                            }
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
            {isChoosePrioritySynergiesPopupOpen &&
                <CreateSynergyRequestPopup
                    open={isChoosePrioritySynergiesPopupOpen}
                    handleClose={() => toggleChoosePrioritySynergiesPopupOpen()}
                    data={{
                        name: projectDetails?.project_name,
                        projectId: projectDetails?.project_id,
                        img: projectDetails?.image
                    }}
                />
            }
        </div>
    )
}

export default ProjectDetails
