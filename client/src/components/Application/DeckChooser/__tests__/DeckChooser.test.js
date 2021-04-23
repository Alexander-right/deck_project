import React from 'react'
import {DeckChooser} from "./../DeckChooser"
import {shallow} from 'enzyme'


describe('DeckChooser', function () {
    describe('addDeck method', () => {
        const props = {
          Decks: [1,2]
        };
        it('should return true',  () => {
            const wrapper = shallow(<DeckChooser {...props} AddDeck={jest.fn(() => true)}/>);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.instance().props.AddDeck()).toBeTruthy()
        });
        it('should return false', function () {
            const wrapper = shallow(<DeckChooser {...props} AddDeck={jest.fn(() => false)}/>);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.instance().props.AddDeck()).toBeFalsy()
        });
    });
    describe('render decks', () => {
        it('should be 4 Decks', function () {
            const props = {
                Decks: [1,2,3,4]
            };
            const wrapper = shallow(<DeckChooser {...props}/>);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.state('deckLinks').length).toEqual(4);
            expect(wrapper.state('mapDeckRoutes').length).toEqual(4);
        });
    })
});