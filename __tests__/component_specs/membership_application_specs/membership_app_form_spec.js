import React from "react";
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialStoreState = {
    applications: {
        membershipTypes: []
    }
};

import MembershipAppForm from "../../../app/javascript/components/membership_application/membership_app_form";
import ObjectSelectInput from '../../../app/javascript/components/form_fields/object_select_input';
import TextAreaInput from '../../../app/javascript/components/form_fields/textarea_input';

describe('MembershipAppForm', () => {
    let form, submitStub, store = mockStore(initialStoreState);
    beforeAll(() => {
        submitStub = sinon.stub();
        form = mount(<Provider store={store}><MembershipAppForm handleSubmit={submitStub} /></Provider>);
    });

    it('has correct static elements', () => {
        expect(form.find('form').length).toEqual(1);
        expect(form.find('hr').length).toEqual(1);
        expect(form.find('p').length).toEqual(1);
        expect(form.find('i').length).toEqual(1);
        expect(form.find('Button').length).toEqual(1);
    });

    it('has correct amount of Fields', () => {
        expect(form.find('Field').length).toEqual(17);
    });

    it('uses correct function when submitting', () => {
        expect(submitStub.notCalled).toBe(true);
        form.simulate('submit');
        expect(submitStub.calledOnce).toBe(true);
    });

    it('has correct component for select Fields', () => {
        expect(form.find('Field').at(4).props().component).toEqual(ObjectSelectInput);
        expect(form.find('Field').at(13).props().component).toEqual(ObjectSelectInput);
    });

    it('has correct component for textarea Fields', () => {
        expect(form.find('Field').at(12).props().component).toEqual(TextAreaInput);
        expect(form.find('Field').at(16).props().component).toEqual(TextAreaInput);
    });
});