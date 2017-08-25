/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialStoreState = {
    planes: { planes: [{ id: 1, name: 'AS123' }, { id: 2, name: 'DF456' }] },
    reservations: { reservations: [] }
};

import ReservationForm from "../../../app/javascript/components/calendar_page/reservation_form";
import * as reservationActions from '../../../app/javascript/store/actions/reservationsActions';
import ObjectSelectInput from '../../../app/javascript/components/form_fields/object_select_input';
import TextAreaInput from '../../../app/javascript/components/form_fields/textarea_input';
import SelectInput from '../../../app/javascript/components/form_fields/bootstrap_select_input';
import DatePickerInput from '../../../app/javascript/components/form_fields/datepicker_input';
import TimePickerInput from '../../../app/javascript/components/form_fields/timepicker_input';

describe('Reservation form', () => {
    let form, submitStub, store = mockStore(initialStoreState);
    beforeAll(() => {
        submitStub = sinon.stub();
        form = mount(<Provider store={store}><ReservationForm handleSubmit={submitStub}/></Provider>);
    });

    it('has correct amount of Fields', () => {
        expect(form.find('Field').length).toEqual(7);
    });

    it('has select for planes', () => {
        expect(form.find('Field').at(4).props().component).toEqual(ObjectSelectInput);
        expect(form.find('Field').at(4).props().label).toEqual('Lentokone');
    });

    it('has select for type', () => {
        expect(form.find('Field').at(5).props().component).toEqual(SelectInput);
        expect(form.find('Field').at(5).props().label).toEqual('Tyyppi');
    });

    it('has textarea for additional info', () => {
        expect(form.find('Field').at(6).props().component).toEqual(TextAreaInput);
        expect(form.find('Field').at(6).props().label).toEqual('Lisätiedot');
    });

    it('has select with correct options for selecting plane', () => {
        expect(form.find('Field').at(4).props().options).toEqual([{ id: 1, name: 'AS123' }, { id: 2, name: 'DF456' }]);
    });

    it('has select with correct options for selecting type', () => {
        expect(form.find('Field').at(5).props().options).toEqual(['harraste', 'opetus']);
    });

    it('has Button with type submit', () => {
        expect(form.find('Button').length).toEqual(1);
        expect(form.find('Button').first().props().type).toEqual('submit');
    });

    it('has DatePickers', () => {
        expect(form.find('Field').at(0).props().component).toEqual(DatePickerInput);
        expect(form.find('Field').at(2).props().component).toEqual(DatePickerInput);
    });

    it('has two TimePickers', () => {
        expect(form.find('Field').at(1).props().component).toEqual(TimePickerInput);
        expect(form.find('Field').at(3).props().component).toEqual(TimePickerInput);
    });

    it('uses correct function when submitting', () => {
        expect(submitStub.notCalled).toBe(true);
        form.simulate('submit');
        expect(submitStub.calledOnce).toBe(true);
    });
});