import { createSlice } from '@reduxjs/toolkit';

const initialAuthorizationState = { 
    authorizationStatus: localStorage.getItem('token') ? true : false,
    operations:{
        login: {
            status:'',
            error:'',
        },
        signup:{
            status:'',
            error:''
        },
        forgotPassword:{
            status:'',
            error:''
        },
        updatePassword:{
            status:'',
            error:''
        }
    }
}

//Slice Initialization
const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: initialAuthorizationState,
    reducers: {
        setAuthorizationStatus(state,action) {
            state.authorizationStatus = action.payload;
        },
        setOperations(state,action){
            const data = action.payload;
            state.operations[data.function] = {
                status : data.status || 'Missing Status',
                error : data.error || undefined
            }
        }

    }
});
export const authorizationActions = authorizationSlice.actions;
export default authorizationSlice.reducer;