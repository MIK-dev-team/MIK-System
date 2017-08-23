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

    it('has PageHeader', () => {
        expect(page.find('PageHeader').length).toEqual(1);
    });

    it('has correct h1 header', () => {
        expect(page.find('PageHeader').props().children).toEqual('Liity jäseneksi!');
    });

    it('has MembershipForm', () => {
        expect(page.find('Connect(MembershipAppForm)').length).toEqual(1);
    });

    it("has correct style for <Col>", () => {
        expect(page.find('Col').first().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
        expect(page.find('Col').last().props().style).toEqual({'float': 'none', 'margin': '0 auto'})

    });
});