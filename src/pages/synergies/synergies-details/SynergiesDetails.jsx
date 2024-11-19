import './synergiesDetails.scss'
import Loader from '../../../components/loader/Loader';
import { Link, useParams } from 'react-router-dom';
import arrowRight from "../../../assets/arrow-right.png"
import searchIcon from "../../../assets/search-icon.png"
import {  GradientGraphIcon, GradientInfiniteIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, StarIcon, InfoCircleIcon } from '../../../utils/SVGs/SVGs'
import { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { getProjectsApiById } from '../../../api-services/projectApis';
import fallBackImage from '../../../assets/DefaultImage.png'
import MultiselectDropDown from '../../../components/multiselect-dropdwon/MultiselectDropDown';
import CustomTooltip from '../../../components/customTooltip/CustomTooltip';

const synergyOptions = [
    { label: 'Selected', value: 'selected' },
    { label: 'Unselected', value: 'unselected' },
    { label: 'All synergies angles', value: 'allSynergies' }
]

const demoData = [
    {
        head: 'IP integration',
        description: 'Integrate your IP in our Comic Books'
    },
    {
        head: 'Hosting AMAS',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle48',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle156',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle11',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle12',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle23',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle26',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        head: 'Angle36',
        description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
]
const synergiesAnglesIcons = [
    { icon: <GredientGlobalIcon /> },
    { icon: <GradientGraphIcon /> },
    { icon: <GrammerlyIcon /> },
    { icon: <HealthIcon /> },
    { icon: <StarIcon /> },
]

const SynergiesDetails = () => {
    const projectApiLoading = false;

 const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectsApiById(params.projectId))
    }, [])

    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Synergies</h2>
                    <div className="search_box">
                        <img className="search_icon" src={searchIcon} alt="Search" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="project_page_data">
                <div className="page_data">
                    <div className="page_header">
                        <div className="pagination">
                            <Link to={'/synergies'}>Synergies</Link>
                            <span>
                                <img src={arrowRight} alt="" />
                            </span>
                            <p>Project name</p>
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
                                        }} src={fallBackImage} alt="Project" />
                                </div>
                            </div>
                            <div className="project_page_content">
                                <div className="header">
                                    <div className="left">
                                        <p className="project_title">Project name</p>
                                        <div className={`status ${'refused'}`}>
                                            <div className='text'>Refused</div>
                                            <div className="info">
                                                <CustomTooltip text={'The reason why it has been refused'} place='top'>
                                                    <InfoCircleIcon />
                                                </CustomTooltip>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="right">
                                        <button className="btn_gray" >
                                            <span>Go to Chat</span>
                                        </button>
                                    </div> */}
                                </div>                                
                                <div className="synergy_container">
                                    <div className="synergy_header">
                                        <div className="left">
                                            <GradientInfiniteIcon />
                                            <span>Synergy angles</span>
                                        </div>
                                        <div className="right">
                                            <div className="selects">
                                                <MultiselectDropDown
                                                    options={synergyOptions}
                                                    placeholder={'All synergies angles'}
                                                // onApply={(currentOptions) => {
                                                // const synergiesAnglesValues = currentOptions?.map((option) => option.value)
                                                // console.log('synergiesAnglesValues', synergiesAnglesValues)
                                                // setFilter({
                                                //     ...filter,
                                                //     synergyAngleValues: synergiesAnglesValues
                                                // })
                                                // }}
                                                >
                                                </MultiselectDropDown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="synergy_body">
                                        {demoData.map((data, index) => {
                                            return (
                                                <div key={index} className={`row ${index > 4 ? 'light' : ''}`}>
                                                    <div className="left">
                                                        <div className={`tag ${index == 0 ? 'global' : index == 1 ? 'graph' : 'white_icon'}`}> {synergiesAnglesIcons[index % 5].icon}
                                                            <span className="text"> {data.head}</span> </div>
                                                    </div>
                                                    <div className="right">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <Loader loading={projectApiLoading} />
           
        </>
    )
}

export default SynergiesDetails
