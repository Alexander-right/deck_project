import React from 'react'
import * as actionTypes from '../../../Redux/actionTypes';
import {cardsForMyCards} from "../reducer";
import InitialState from "../../InitialState";


describe('Reducer Test', () => {

    it("ADD_CARD", () => {
        const newAction = {
            type: actionTypes.ADDCARD,
            payload: {
                card: {
                    cost: 1,
                    name: "Paladin"
                },
                index: 0,
            }
        };
        expect(cardsForMyCards(InitialState, newAction)).toEqual([[{"cost": 1, "name": "Paladin"}]]);
    });
    it("DELETE_CARD", () => {
        const newAction = {
            type: actionTypes.DELETECARD,
            payload: {
                cardIndex: 1,
                index: 1,
            }
        };
        let state = [[], [{cost: 4, name: "Juggernaut"}, {cost: 3, name: "Shaker"}, {
            cost: 1,
            name: "Paladin"
        }, {cost: 9, name: "Crystal Maiden"}], []];

        expect(cardsForMyCards(state, newAction)).toEqual([[], [{"cost": 4, "name": "Juggernaut"}, {"cost": 1, "name": "Paladin"}, {"cost": 9, "name": "Crystal Maiden"}], []]

        )
    });
    it('ADD_DECK', function () {
        const newAction = {
            type: actionTypes.ADDDECK
        };
        expect(cardsForMyCards(InitialState, newAction)).toEqual([[{"cost": 1, "name": "Paladin"}], []])
    });
});