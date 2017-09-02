/**
 * Created by owlaukka on 30/06/17.
 */
import React from "react";
import sinon from 'sinon';
import { shallow } from "enzyme";

import { MembershipAppPage } from "../../../app/javascript/components/membership_application/membership_app_page";
import * as actions from "../../../app/javascript/store/actions/applicationActions";

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

    it('has MembershipAppForm', () => {
        expect(page.find('#membership-app-form').length).toEqual(1);
    });

    it("has correct style for <Col>", () => {
        expect(page.find('Col').first().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
        expect(page.find('Col').last().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
    });

    it('dispatches correct action when submitting MembershipAppForm', () => {
        const dispatchSpy = sinon.spy(),
            submitMembershipAppStub = sinon.stub(actions, 'submitMembershipApp');
        page.setProps({dispatch: dispatchSpy});

        expect(dispatchSpy.notCalled).toBe(true);
        expect(submitMembershipAppStub.notCalled).toBe(true);
        page.find('#membership-app-form').simulate('submit');
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(submitMembershipAppStub.calledOnce).toBe(true);
    });
});