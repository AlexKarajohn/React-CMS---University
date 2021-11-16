import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    user: {
        email : 'placeholder@placeholder.gr',
        facilities : [],
        alerts: [],
        sensors : []
    },
    operations: {

    }
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state,payload){
            state.user = payload
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;