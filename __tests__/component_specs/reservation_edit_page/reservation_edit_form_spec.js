import React from "react";
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import sinon from 'sinon';

import ReservationEditForm from "../../../app/javascript/components/reservation_edit_page/reservation_edit_form";
import store from '../../../app/javascript/store/store';

describe('Confirm delete button initially', () => {
    let form, submitStub, changeStub;

    beforeAll(() => {
        submitStub = sinon.stub();
        changeStub = sinon.stub();
        form = mount(<Provider store={store}><ReservationEditForm handleSubmit={submitStub} /></Provider>);
        store.dispatch({type: "SET_PLANES", payload: [{ id: 1, name: "first" }, { id: 3, name: 'last'}]})
    });

    it('has correct static elements', () => {
        expect(form.find('form').length).toEqual(1);
        expect(form.find('ConfirmDeleteButton').length).toEqual(1);
        expect(form.find('Field').length).toEqual(7);
        expect(form.find('Button').first().props().children).toEqual('Tallenna varaus')
    });

    it('has correct props on Field elements', () => {
        expect(form.find('Field').first().props().label).toEqual('Alkupäivämäärä');
    });

    it('changing Field value triggers correct function', () => {
        form.find('Field').first().simulate('change', { target: { value: 'something' } });
        expect(submitStub.notCalled).toBe(true)
        form.simulate('submit');
        expect(submitStub.calledOnce).toBe(true)
    });

    it('has correct plane options passed to plane selection Field', () => {
        expect(form.find('Field').at(4).props().options).toEqual([{ id: 1, name: "first" }, { id: 3, name: 'last'}]);
    });
});