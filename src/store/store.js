import authorizationReducer from './authorization-slice';
import userReducer from './user-slice';
import layoutReducer from './layout-slice';

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: { 
        authorization: authorizationReducer ,
        user: userReducer, 
        layout: layoutReducer
    }
});


export default store;