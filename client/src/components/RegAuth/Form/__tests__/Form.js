import React from 'react'
import {shallow} from 'enzyme'
import Form from './../Form'

describe("Form testing", () => {

   it("Auth Form testing", () => {
       const AuthForm = shallow(<Form forButton={"Авторизироваться"} type={"authorization"}/>);
       expect(AuthForm.find('button').text()).toEqual("Авторизироваться");
       expect(AuthForm.find('.authorization__login').prop('name')).toEqual('login');
       expect(AuthForm.find('.authorization__password').prop('name')).toEqual('password');
   });

   it("Registration Form testing", () => {
      const RegForm = shallow(<Form forButton={"Зарегистрироваться"} type={"register"}/>);
      expect(RegForm.find('button').text()).toEqual("Зарегистрироваться");
      expect(RegForm).toMatchSnapshot()
   })
});