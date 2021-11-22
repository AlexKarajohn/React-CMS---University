import { createSlice } from '@reduxjs/toolkit';

const initialLayout = { 
    dialog:{
        onSubmit: undefined,
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
        closeDialog(state,action){
            state.dialog.onSubmit = undefined;
        },
        createDialog(state,action){
            state.dialog ={ 
                onSubmit : action.payload.submit,
                message : action.payload.message
            }
        },
        testingDispatch(state,action){
            console.log(action.payload);
        }
    }
});
export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;