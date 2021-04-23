import React from 'react'
import auth from './../Auth'

describe('Auth Test', () => {
    it("isAuthenticated method", () => {
        expect(auth.isAuthenticated()).toBeFalsy();

    });
    it('Login method', function () {
        auth.login();
        expect(auth.isAuthenticated()).toBeTruthy();
    });
    it('LogOut method', function () {
        auth.logout();
        expect(auth.isAuthenticated()).toBeFalsy();
    });
});