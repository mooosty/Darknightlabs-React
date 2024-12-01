import './synergiesDetails.scss'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowRight from "../../../assets/arrow-right.png"
import { useDispatch, useSelector, } from 'react-redux';
import fallBackImage from '../../../assets/DefaultImage.png'
import { getSynergyByIdApi } from '../../../api-services/synergyApi';
import { GradientGraphIcon, GradientInfiniteIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, StarIcon, InfoCircleIcon } from '../../../utils/SVGs/SVGs'
import { CustomTooltip, Loader, MultiselectDropDown } from '../../../components';

const synergyOptions = [
    { label: 'Selected', value: 'selected' },
    { label: 'Unselected', value: 'unselected' },
    { label: 'All synergies angles', value: 'allSynergies' }
]

const synergiesAnglesIcons = [
    { icon: <GredientGlobalIcon /> },
    { icon: <GradientGraphIcon /> },
    { icon: <GrammerlyIcon /> },
    { icon: <HealthIcon /> },
    { icon: <StarIcon /> },
]

const SynergiesDetails = () => {
    const { synergyId } = useParams();
    const dispatch = useDispatch();
    const synergyApiLoading = useSelector((state) => state.synergies.isLoading)

    const [synergyDetail, setSynergyDetails] = useState({});

    useEffect(() => {
        dispatch(getSynergyByIdApi(synergyId)).then((res) => {
            if (res?.payload?.success)
                setSynergyDetails(res.payload.data);
        })
    }, [synergyId])

    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Synergies</h2>
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
                            <p>{synergyDetail.synergy_name}</p>
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
                                        }} src={!synergyApiLoading ? (synergyDetail.synergy_image ?? fallBackImage) : null} alt="Project" />
                                </div>
                            </div>
                            <div className="project_page_content">
                                <div className="header">
                                    <div className="left">
                                        <p className="project_title">{synergyDetail.synergy_name}</p>
                                        <div className={`status ${synergyDetail.status === null ? 'pending' : synergyDetail?.status}`}>
                                            <div className='text'>{synergyDetail.status === null ? 'pending' : synergyDetail.status}</div>
                                            {synergyDetail.status === "refused" && <div className="info">
                                                <CustomTooltip text={'The reason why it has been refused'} place='top' style={{ width: '200px' }}>
                                                    <InfoCircleIcon />
                                                </CustomTooltip>
                                            </div>}
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
                                        {synergyDetail?.synergy_angles?.map((synergyName, index) => {
                                            return (
                                                <div key={index} className={`row ${index > 4 ? 'light' : ''}`}>
                                                    <div className="left">
                                                        <div className={`tag ${index == 0 ? 'global' : index == 1 ? 'graph' : 'white_icon'}`}>
                                                            {index < 2 ? synergiesAnglesIcons[index].icon : synergiesAnglesIcons[index % 3 + 2].icon}
                                                            <span className="text"> {synergyName}</span>
                                                        </div>
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


            <Loader loading={synergyApiLoading} />

        </>
    )
}

export default SynergiesDetails
