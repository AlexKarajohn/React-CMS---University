import { createSlice } from '@reduxjs/toolkit';

const initialLayout = { 
    modal:{
        open: false,
        submit: {},
        message : '',
    },
    operations:{

    }
}

//Slice Initialization
const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialLayout,
    reducers: {
        setModal(state,action){
            state.modal.submit = action.payload.submit 
            state.modal.open = action.payload.open;
            if(action.payload.hasOwnProperty('message'))
            state.modal.message = action.payload.message ;
        }
    }
});
export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;