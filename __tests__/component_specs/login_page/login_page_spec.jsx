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

    it('has Jumbotron', () => {
        expect(page.find('Jumbotron').length).toEqual(1);
    });

    it('has correct h1 header', () => {
        expect(page.find('Jumbotron > h1').text()).toEqual('Kirjaudu sisään');
    });

    it('has LoginForm', () => {
        expect(page.find('Connect(LoginForm)').length).toEqual(1);
    });

    it('has Jumbotron with correct style', () => {
        expect(page.find('Jumbotron').props().style).toEqual({'borderRadius': '0px'})
    });

    it("has correct style for <Col>", () => {
        expect(page.find('Col').props().style).toEqual({'float': 'none', 'margin': '0 auto'})
    });
});
