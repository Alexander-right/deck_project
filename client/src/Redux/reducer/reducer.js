import * as actionTypes from '../actionTypes';
import InitialState from '../InitialState'

export default function(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.ADDDECK:
            state.push([]);
            return ([...state]);
        case actionTypes.ADDCARD:
            state[action.payload.index] = [...state[action.payload.index], action.payload.card];
            return ([...state]);
        case actionTypes.DELETECARD:
            state[action.payload.index].splice(action.payload.cardIndex, 1);
            return ([...state]);
        default:
            return ([...state])
    }
}
