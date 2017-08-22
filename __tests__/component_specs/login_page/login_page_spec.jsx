import React from "react";
import { shallow } from "enzyme";
import LoginPage from "../../../app/javascript/components/login_page/login_page";

let page;

describe('Login page', () => {

    beforeAll(() => {
        page = shallow(<LoginPage/>);
    });

    it('has Grid', () => {
        expect(page.find('Grid').length).toEqual(1);
    });

    it('has PageHeader', () => {
        expect(page.find('PageHeader').length).toEqual(1);
    });

    it('has correct h1 header', () => {
        expect(page.find('PageHeader').props().children).toEqual('Kirjaudu sisään');
    });

    it('has LoginForm', () => {
        expect(page.find('Connect(LoginForm)').length).toEqual(1);
    });

    it("has correct style for <Col>", () => {
        expect(page.find('Col').first().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
        expect(page.find('Col').last().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
    });
});
