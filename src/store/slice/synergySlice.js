import { createSlice } from "@reduxjs/toolkit"
import { createSynergyApi, deleteSynergyApi, getSynergyApi, updateSynergyApi } from "../../api-services/synergyApi"


const initialState = {
    synergies: [],
    isLoading: false
}

const synergySlice = createSlice({
    name: 'synergies',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createSynergyApi.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(
            createSynergyApi.fulfilled, (state, action) => {
                const tmpArr = action.payload.response.split(' ');
                return {
                    ...state,
                    isLoading: false,
                    synergies: [...state.synergies, {
                        ...action.payload.data,
                        "creator_name": null,
                        "creator_profile_image": null,
                        "id": Number(tmpArr[tmpArr.length - 1])
                    }]
                }
            }
        )

        builder.addCase(createSynergyApi.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })

        builder.addCase(getSynergyApi.pending, (state) => {
            if (state.synergies.length === 0) {
                return {
                    ...state,
                    isLoading: true,
                    synergies: [],
                }
            }
            else{
                return {
                    ...state
                }
            }
        })

        builder.addCase(
            getSynergyApi.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    synergies: action.payload ?? [],
                }
            }
        )

        builder.addCase(getSynergyApi.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                synergies: [],
            }
        })

        builder.addCase(updateSynergyApi.pending, (state) => {
            return {
                ...state,
                isLoading: true,
            }
        })

        builder.addCase(
            updateSynergyApi.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    synergies: [...state.synergies.map((synergy) => {
                        if (synergy.id === action.payload.data.id) {
                            return {
                                ...synergy,
                                _project_id: action.payload.data['_project_id'],
                                project2_id: action.payload.data['project2_id'],
                                synergy_name: action.payload.data.synergy_name
                            }
                        }
                        else {
                            return synergy;
                        }
                    })]
                }
            }
        )

        builder.addCase(updateSynergyApi.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })

        builder.addCase(deleteSynergyApi.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(deleteSynergyApi.fulfilled, (state, action) => {

            return {
                ...state,
                isLoading: false,
                synergies: state.synergies.filter(synergy => synergy.id !== action.payload.synergyId)
            };
        });

        builder.addCase(deleteSynergyApi.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default synergySlice.reducer