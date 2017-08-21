import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';

import { ReservationForm } from "../../../app/javascript/components/calendar_page/reservation_form";
import * as reservationActions from '../../../app/javascript/store/actions/reservationsActions';
import * as planesActions from '../../../app/javascript/store/actions/planesActions';

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

            const changedValue = new Date();
            form.find('#startDate').simulate('change', changedValue);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
            expect(actionStub.calledWith(changedValue))
        });

        it('for changing date in end date picker', () => {
            actionStub = sinon.stub(reservationActions, 'setReservationEnd');
            expect(actionStub.notCalled).toBe(true);

            const changedValue = new Date();
            form.find('#endDate').simulate('change', changedValue);
            expect(actionStub.calledWith(changedValue, undefined)).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('for changing time in start time picker', () => {
            actionStub = sinon.stub(reservationActions, 'changeStartTime');
            expect(actionStub.notCalled).toBe(true);

            const changedValue = '12:56';
            form.find('#startTime').simulate('change', changedValue);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
            expect(actionStub.calledWith(changedValue))
        });

        it('for changing time in end time picker', () => {
            actionStub = sinon.stub(reservationActions, 'changeEndTime');
            expect(actionStub.notCalled).toBe(true);

            const changedValue = '12:56';
            form.find('#endTime').simulate('change', changedValue);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
            expect(actionStub.calledWith(changedValue))
        });

        it('for changing plane in form', () => {
            actionStub = sinon.stub(form.instance(), 'handlePlaneChange');
            form.setProps({planes: [{ id: 1, name: "something" }]});

            expect(actionStub.notCalled).toBe(true);
            form.find('FormGroup#selectPlane > FormControl').simulate('change', { target: { value: 1 } });
            expect(actionStub.calledOnce).toBe(true);
            expect(actionStub.calledWith({ target: { value: 1 } })).toBe(true);
        });

        it('for changing plane in store through dispatch', () => {
            actionStub = sinon.stub(planesActions, 'selectPlane');
            form.setProps({planes: [{ id: 1, name: "something" }]});

            expect(actionStub.notCalled).toBe(true);
            form.find('FormGroup#selectPlane > FormControl').simulate('change', { target: { value: 1 } });
            expect(actionStub.calledOnce).toBe(true);
            expect(actionStub.calledWith({ id: 1, name: "something" })).toBe(true);
        });

        it('for changing plane to null in store through class function (handlePlaneChange)', () => {
            actionStub = sinon.stub(planesActions, 'selectPlane');
            form.setProps({planes: [{ id: 1, name: "something" }]});

            expect(actionStub.notCalled).toBe(true);
            form.find('FormGroup#selectPlane > FormControl').simulate('change', { target: { value: 1 } });
            form.find('FormGroup#selectPlane > FormControl').simulate('change', { target: { value: 'null' } });
            expect(actionStub.calledTwice).toBe(true);
            expect(actionStub.calledWith({ id: 1, name: "something" })).toBe(true);
            expect(actionStub.calledWith(undefined)).toBe(true);
        });

        // it('for submitting form', () => {
        //     actionStub = sinon.stub(reservationActions, 'massDestroyReservation');
        //     form.setProps({planes: [{ id: 1, name: "something" }]});
        //     expect(actionStub.notCalled).toBe(true);
        //     form.find('form').simulate('submit', {preventDefault: () => {}});
        //     expect(actionStub.calledOnce).toBe(true);
        //     expect(dispatchSpy.calledOnce).toBe(true);
        // });
    });

    describe('has class function', () => {
        describe('formatTime that', () => {
            it('returns undefined when given time is undefined', () => {
                expect(form.instance().formatTime()).toEqual(undefined);
            });

            it('returns properly formatted string (HH:mm) when given a datetime string', () => {
                expect(form.instance().formatTime("2017-06-06T20:00:00+03:00")).toEqual('17:00');
            });
        });


    });
});
