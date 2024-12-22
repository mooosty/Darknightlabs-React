import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircleIcon, angelBg, CLeseCircleIcon, GlobalIcon } from '../../../utils/constants/images';
import { editSynergyRequest } from '../../../api-services/synergyApi';
import CreateSynergiesPopup from '../create-synergies-popup/CreateSynergiesPopup';
import { synergyAnglesOptions } from '../../../utils/constants/options';
import Loader from '../../loader/Loader';


const buttons = synergyAnglesOptions.map((data, index) => ({
    ...data,
    id: index + 1,
    checked: false
}))

const EditSynergyAnglePopup = ({ isOpen, setIsOpen, selectedSynergyData }) => {
    const dispatch = useDispatch()
    const [synergyAngles, setSynergyAngles] = useState([...buttons])
    const [checkedSynergies, setCheckedSynergies] = useState([])
    const { editSynergyRequestLoading } = useSelector((state) => state.synergies)


    const handleCheckSynergiesAngles = (selectedAngles) => {
        let tmpChecked = [...checkedSynergies]
        if (tmpChecked.includes(selectedAngles)) {
            tmpChecked = tmpChecked.filter((data) => data !== selectedAngles)
        } else {
            tmpChecked.push(selectedAngles)
        }
        setCheckedSynergies(tmpChecked)
    };

    const handleUpdateSynergyAngles = () => {
        if (selectedSynergyData?.id) {
            dispatch(editSynergyRequest({
                synergy_angles: [...checkedSynergies],
                id: selectedSynergyData?.id,
                _uid: 9
            })).then((response) => {
                if (response?.payload?.response?.success) {
                    resetPopup()
                } else {
                    toast.error('Synergy Angles Not Updated')
                }
            })
        }
    }

    const resetPopup = () => {
        setIsOpen(false)
        setSynergyAngles([...buttons])
    }


    const renderedAngles = useMemo(() => {
        return synergyAngles.map((data) => (
            <div key={data.id} className='angel_tab'>
                <input
                    type="checkbox"
                    checked={checkedSynergies.includes(data.label)}
                    onChange={() => handleCheckSynergiesAngles(data.label)}
                    name="angleName"
                    id={`angle1+${data.id}`}
                    className='checkbox_input'
                />
                <label
                    htmlFor={`angle1+${data.id}`}
                    className='checkbox_label'
                >
                    <div className="checkbox_label_text">
                        <GlobalIcon />
                        <span className='checkbox_label_text_head'>{data.label}</span>
                    </div>
                    <div className="angel_add">
                        <AddCircleIcon />
                    </div>
                    <div className="angel_remove">
                        <CLeseCircleIcon />
                    </div>
                </label>
            </div>
        ));
    }, [synergyAngles, checkedSynergies]);

    useEffect(() => {
        if (selectedSynergyData) {
            const tmpChecked = synergyAngles.filter((data) => selectedSynergyData?.synergy_angles?.includes(data.label)).map((data) => data.label);
            setCheckedSynergies(tmpChecked);
        }
    }, [selectedSynergyData]);

    return (
        <CreateSynergiesPopup
            title={selectedSynergyData?.synergy_name}
            open={isOpen}
            onClose={resetPopup}
            body={
                <>
                    <div className='model_body'>
                        <div className="model_data">
                            <div className="image">
                                <img src={angelBg} alt="" />
                            </div>
                            <div className={`page active`}>
                                <div className="angel_model_data_head">
                                    <div className="title">Synergy angles </div>
                                </div>
                                <div className="angel_model_data_body">
                                    <div className="angels_container">
                                        {renderedAngles}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            footer={<>
                <button className='refuse_btn' onClick={resetPopup}>Refuse</button>
                <button
                    className='next_btn'
                    onClick={() => {
                        handleUpdateSynergyAngles()
                    }}
                    disabled={editSynergyRequestLoading}
                >
                    {editSynergyRequestLoading && <Loader isItForButton={true} loading={editSynergyRequestLoading} />
                    }
                    Confirm
                </button>
            </>}
        />
    )
}

EditSynergyAnglePopup.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    selectedSynergyData: PropTypes.object,
}

export default EditSynergyAnglePopup