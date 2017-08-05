/**
 * Created by owlaukka on 30/06/17.
 */
import React from "react";
import { shallow } from "enzyme";
import MembershipAppPage from "../../../app/javascript/components/membership_application/membership_app_page";

let page;

describe('Membership Application page', () => {

    beforeAll(() => {
        page = shallow(<MembershipAppPage/>);
    });

    it('has Grid', () => {
        expect(page.find('Grid').length).toEqual(1);
    });

    it('has Jumbotron', () => {
        expect(page.find('Jumbotron').length).toEqual(1);
    });

    it('has correct h1 header', () => {
        expect(page.find('Jumbotron > h1').text()).toEqual('Liity jäseneksi!');
    });

    it('has MembershipForm', () => {
        expect(page.find('Connect(MembershipForm)').length).toEqual(1);
    });

    it('has Jumbotron with correct style', () => {
        expect(page.find('Jumbotron').props().style).toEqual({'borderRadius': '0px'})
    });

    it("has correct style for <p> inside jumbotron", () => {
        expect(page.find('Jumbotron > p').props().style).toEqual({'lineHeight': '25px'});
    });

    it("has correct style for <Col>", () => {
        expect(page.find('Col').props().style).toEqual({'float': 'none', 'margin': '0 auto'})
    });
});