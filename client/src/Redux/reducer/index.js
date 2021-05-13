import { combineReducers } from 'redux'
import cards from './reducer'
import auth from './auth'
import news from './news'
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = applyMiddleware(thunkMiddleware);

export const store = createStore(combineReducers({
    cards,
    auth,
    news,
}), composedEnhancer);
