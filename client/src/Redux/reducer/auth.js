import {createStore} from "redux";
const InitialState = {
    authenticated: false,
    login: '',
};

const actionTypes = {
    AUTH: 'AUTH',
    LOG_OUT: 'LOG_OUT',
    SET_LOGIN: 'SET_LOGIN'
};


export default function(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.AUTH:
            return ({...state, authenticated: true});
        case actionTypes.LOG_OUT:
            return ({...state, authenticated: false});
        case actionTypes.SET_LOGIN:
            return ({...state, login: action.payload});
        default:
            return ({...state})
    }
}
