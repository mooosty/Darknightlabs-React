import { createSlice } from "@reduxjs/toolkit"
import { deleteSynergyApi, getSynergyApi } from "../../api-services/synergyApi"


const initialState={
      synergies:[],
      isLoading: false
}

const synergySlice= createSlice({
    name: 'synergies',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getSynergyApi.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                synergies: [],
            }
        })

        builder.addCase(
            getSynergyApi.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    synergies:action.payload ?? [],
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
                synergies: state.synergies.filter(synergy => synergy.id!==action.payload.synergyId)
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