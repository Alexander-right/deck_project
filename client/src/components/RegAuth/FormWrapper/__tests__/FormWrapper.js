import React from 'react'
import {LogRegister} from './../FormWrapper'
import {shallow} from 'enzyme'
import auth from './../../Auth/Auth'

describe("FormWrapper Testing", () => {
    it("isAuthenticated = false", () => {
        // auth.authenticated = true;
        const FormWrapper = shallow(<LogRegister auth={auth.authenticated}/>);
        console.log(FormWrapper.find('Route').prop('auth'));
        expect(FormWrapper).toMatchSnapshot();
        expect(FormWrapper.find('Route').prop('auth')).toBe(false);
        //expect(FormWrapper.find('button').text()).toEqual("Выход")
    });
    it('isAuthenticated = false', function () {
        auth.authenticated = true;
        const FormWrapper = shallow(<LogRegister auth={auth.authenticated}/>);
        expect(FormWrapper.find('Route').prop('auth')).toBe(true);
        expect(FormWrapper).toMatchSnapshot();
    });
});
