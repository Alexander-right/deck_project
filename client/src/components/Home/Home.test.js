import React from 'react';
import { Home } from './Home'
import { shallow } from 'enzyme'

describe('Testing component', ()=> {
    it("Home test", () => {
        const HomeComponent = shallow(<Home/>);
        expect(HomeComponent.find('div').text()).toEqual('Домашняя страница')
    })
});
