import { combineReducers } from 'redux'
import cards from './reducer'
import auth from './auth'
import { createStore } from "redux";

export const store = createStore(combineReducers({
    cards,
    auth
}));
