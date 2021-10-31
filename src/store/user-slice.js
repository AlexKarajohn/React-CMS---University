import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    name : 'Alex'
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        
    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;