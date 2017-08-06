/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';

import { ReservationForm } from "../../../app/javascript/components/calendar_page/reservation_form";
import * as reservationActions from '../../../app/javascript/store/actions/reservationsActions';

let form;
describe('Reservation form', () => {
    beforeAll(() => {
        form = shallow(<ReservationForm planes={[{ id: 1, name: "something" }]}/>);
    });

    it('has a panel header with right props', () => {
        expect(form.find('Panel').first().props().header).toEqual(<h3>Tee varaus</h3>);
    });

    it('has correct amount of form groups', () => {
        expect(form.find('FormGroup').length).toEqual(7);
    });

    it('has select for planes', () => {
        form.setProps({selectedPlane: { id: 2, name: "something else!"}});
        form.update();
        expect(form.find('FormControl').first().props().componentClass).toEqual("select");
        expect(form.find('FormControl').first().props().value).toEqual(2);
    });

    it('has select with correct options for selecting plane', () => {
        expect(form.find('FormGroup#selectPlane > FormControl > option').length).toEqual(2);
        expect(form.find('FormGroup#selectPlane > FormControl > option').first().props().value).toEqual('null');
        expect(form.find('FormGroup#selectPlane > FormControl > option').at(1).props().value).toEqual(1);
    });

    it('has select with correct options for selecting type', () => {
        expect(form.find('FormGroup#selectType > FormControl > option').length).toEqual(2);
        expect(form.find('FormGroup#selectType > FormControl > option').first().props().value).toEqual("opetus");
        expect(form.find('FormGroup#selectType > FormControl > option').at(1).props().value).toEqual("harraste");
    });

    it('has Button with type submit', () => {
        expect(form.find('Button').length).toEqual(1);
        expect(form.find('Button').first().props().type).toEqual('submit');
    });

    it('has DatePickers', () => {
        expect(form.find('#startDate').length).toEqual(1);
        expect(form.find('#endDate').length).toEqual(1);
    });

    it('has two TimePickers', () => {
        expect(form.find('#startTime').length).toEqual(1);
        expect(form.find('#endTime').length).toEqual(1);
    });

    describe('dispatches correct actions', () => {
        let actionStub, dispatchSpy;

        beforeAll(() => {
            dispatchSpy = sinon.spy();
            form.setProps({dispatch: dispatchSpy});
        });

        afterAll(() => {
            form.setProps({dispatch: undefined});
        });

        afterEach(() => {
            actionStub.restore();
            dispatchSpy.reset();
        });


        it('for changing date in start date picker', () => {
            actionStub = sinon.stub(reservationActions, 'setReservationStart');
            expect(actionStub.notCalled).toBe(true);

            form.find('#startDate').simulate('change', { target: { value: new Date() } });
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('for changing date in end date picker', () => {
            actionStub = sinon.stub(reservationActions, 'setReservationEnd');
            expect(actionStub.notCalled).toBe(true);

            const changedValue = new Date();
            form.find('#endDate').simulate('change', changedValue);
            console.log(actionStub.getCall(0).args)
            expect(actionStub.calledWith(changedValue, undefined)).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('for changing time in start time picker', () => {
            actionStub = sinon.stub(reservationActions, 'changeStartTime');
            expect(actionStub.notCalled).toBe(true);

            form.find('#startTime').simulate('change', { target: { value: '12:56' } });
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('for changing type in form', () => {
            actionStub = sinon.stub(reservationActions, 'setType');
            form.setProps({planes: [{ id: 1, name: "something" }]});

            expect(actionStub.notCalled).toBe(true);
            form.find('FormGroup#selectType > FormControl').simulate('change', {target: {
                value: 'opetus'
            }});
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true)
        });

        it('for submitting form', () => {
            actionStub = sinon.stub(reservationActions, 'submitReservation');
            form.setProps({planes: [{ id: 1, name: "something" }]});
            expect(actionStub.notCalled).toBe(true);
            form.find('form').simulate('submit', {preventDefault: () => {}});
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
        });

    });

    describe("with start and end times", () => {
        afterEach(() => {
            form.setProps({start: undefined, end: undefined});
            form.update();
        });

        it('shows start adn end time as empty initially', () => {
            form.setProps({start: "", end: ""});
            form.update();
            expect(form.find('FormControl').first().props().value).toEqual("");
            expect(form.find('FormControl').at(1).props().value).toEqual("");
        });

        it('shows start and end times when given as props in the correct format', () => {
            form.setProps({
                start: "2017-06-06T20:00:00+03:00",
                end: "2017-06-06T20:30:00+03:00"
            });
            form.update();
            expect(form.find('FormControl').first().props().value).toEqual("6. kesä 2017, klo 17.00");
            expect(form.find('FormControl').at(1).props().value).toEqual("6. kesä 2017, klo 17.30");
        });
    });
});