import PropTypes from 'prop-types';
import { cardImage, GradientGraphIcon, GredientGlobalIcon, TableStatusIcon } from '../../utils/constants/images';
import { EmptyData } from '../../components';


const ProjectManagerGridLayout = ({ filterProject = [] }) => {

    return (
        <div className='card_container'>{filterProject.length == 0 ?
            <EmptyData />
            :
            <>
                {
                    filterProject.map((rowData, index) => {
                        return (
                            <div key={index} className="card_wrap">
                                <div className={`card ${rowData.isFeatured ? 'highlighted' : ''}`}>

                                    {rowData.isFeatured ? <>
                                        <div className="isFeaturedCard"> <TableStatusIcon /></div>
                                    </> : ''}
                                    <div className="card_image">
                                        <img src={rowData.synergyImg} alt=" " onError={(e) => e.target.src = cardImage} />
                                    </div>
                                    <div className="card_body">
                                        <div className="name">
                                            {rowData.projectName}
                                        </div>
                                        <div className='description'>
                                            {rowData.description}
                                        </div>
                                        <div className="tabs">
                                            {
                                                rowData?.synergiesAngles?.slice(0, 3)?.map((Angle, index) => (
                                                    <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                                        <div className='angle_tag'>
                                                            <>{index === 0 && <div className='icon'><GredientGlobalIcon /></div>}</>
                                                            <>{index === 1 && <div className='icon'><GradientGraphIcon /></div>}</>
                                                            <span className='text'>
                                                                <span>{Angle.label}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {rowData.synergiesAngles.length > 3 ?
                                                <div className="angle_tag">
                                                    <span className='angle_tag_count'>+{rowData.synergiesAngles.length - 3}</span>
                                                </div>
                                                : ''}
                                        </div>
                                        <div className='tabs'>
                                            {
                                                rowData.type.map((type, index) => (
                                                    <div key={index} className='angle_tag'>
                                                        <span className='text'>
                                                            <span>{type}</span>
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        }
        </div>
    )
}

ProjectManagerGridLayout.propTypes = {
    filterProject: PropTypes.array.isRequired,
}


export default ProjectManagerGridLayout