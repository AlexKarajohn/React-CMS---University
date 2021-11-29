import authorizationReducer from './authorization-slice';
import userReducer from './user-slice';
import layoutReducer from './layout-slice';

import { combineReducers } from '@reduxjs/toolkit';
//import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, createStore,compose } from 'redux'
//redux history 
import { createBrowserHistory } from 'history'
import { connectRouter ,routerMiddleware} from 'connected-react-router'
import thunk from "redux-thunk"

export const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authorization: authorizationReducer ,
    user: userReducer, 
    layout: layoutReducer
  })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = function configureStore(preloadedState) {
    const store = createStore(
      createRootReducer(history),
      preloadedState, composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    )
    return store
}