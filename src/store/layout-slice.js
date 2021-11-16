import { createSlice } from '@reduxjs/toolkit';

const initialLayout = { 
    operations:{

    }
}

//Slice Initialization
const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialLayout,
    reducers: {
        setLocation(state,action){
            state.location = action.payload;
        }
    }
});
export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;