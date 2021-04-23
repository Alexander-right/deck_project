import React from 'react'
import {Card} from './../Card'
import {shallow} from 'enzyme'

describe('Tests for Card component', () => {
    it('CanDrag should be false', function () {
        const CardProps = {
            canDrag: false,
            img: "img-src"
        };
        const CardComponent = shallow(<Card {...CardProps}/>);
        expect(CardComponent).toMatchSnapshot()
    });
    it('canDrag should be true', function () {
        const CardProps = {
            canDrag: true,
            img: "img-src"
        };
        const CardComponent = shallow(<Card {...CardProps}/>);
        expect(CardComponent).toMatchSnapshot()
    });

    describe('deleteCard button', () => {
        it('should be called', () => {
            const props = {
              deleteCard: jest.fn(),
              img: 'src',
              canDrag: false
            };
            const wrapper = shallow(<Card {...props}/>);
            const button = wrapper.find('button');
            button.simulate('click');
            expect(wrapper.instance().props.deleteCard).toBeCalled()
        });
    })
});