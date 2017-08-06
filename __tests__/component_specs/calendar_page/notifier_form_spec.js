/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';

import { NotifierForm } from "../../../app/javascript/components/calendar_page/notifier_form";
import * as notifiersActions from '../../../app/javascript/store/actions/notifiersActions';

describe('Notifier form', () => {
    let form, dispatchSpy, actionStub;
    beforeAll(() => {
        form = shallow(<NotifierForm />);
    });

    it('has Form component with inline prop', () => {
        expect(form.find('Form').length).toEqual(1);
        expect(form.find('Form').props().inline).toBe(true)
    });

    it('has correct number of form groups', () => {
        expect(form.find('FormGroup').length).toEqual(3)
    });

    it('has correct options for notifier type select', () => {
        expect(form.find({ componentClass: 'select' }).find('option').length).toEqual(2);
        expect(form.find({ componentClass: 'select' }).find('option').first().text()).toEqual('Kaikki varaukset peruttu');
        expect(form.find({ componentClass: 'select' }).find('option').last().text()).toEqual('Mikä tahansa varaus peruttu');
    });

    it('has correct fields', () => {
        expect(form.find('ControlLabel').first().props().children).toEqual('Alku');
        expect(form.find('ControlLabel').at(1).props().children).toEqual('Loppu');
        expect(form.find('ControlLabel').last().props().children).toEqual('Tarkkailijatyyppi');
    });

    it('has a submit Button with correct text', () => {
        expect(form.find('Button').length).toEqual(1);
        expect(form.find('Button').props().type).toEqual('submit');
        expect(form.find('Button').props().children).toEqual('Luo tarkkailija')
    });

    describe('trigger function', () => {
        beforeAll(() => {
            dispatchSpy = sinon.spy();
            form.setProps({dispatch: dispatchSpy})
        });

        afterEach(() => {
            dispatchSpy.reset();
            if (actionStub !== undefined)
                actionStub.restore();
        });

        it('setStart when start field is changed', () => {
            actionStub = sinon.stub(notifiersActions, 'setStart');
            expect(actionStub.calledOnce).toBe(false);
            form.find('FormControl').first().simulate('change', { target: { value: 'd'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('setEnd when end field is changed', () => {
            actionStub = sinon.stub(notifiersActions, 'setEnd');
            expect(actionStub.calledOnce).toBe(false);
            form.find('FormControl').at(1).simulate('change', { target: { value: 'd'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('setNotifierType when notifier type field is changed', () => {
            actionStub = sinon.stub(notifiersActions, 'setNotifierType');
            expect(actionStub.calledOnce).toBe(false);
            form.find('FormControl').last().simulate('change', { target: { value: 'all'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('submitNotifier when form is submitted', () => {
            actionStub = sinon.stub(notifiersActions, 'submitNotifier');
            expect(actionStub.calledOnce).toBe(false);
            form.find('Form').simulate('submit', {preventDefault: () => {}});
            expect(actionStub.calledOnce).toBe(true);
        });
    });

    describe('has function', () => {
        it('formatTimes that returns empty string if parameter is empty string', () => {
            expect(form.instance().formatTimes("")).toEqual("");
        });

        it('formatTimes that returns correctly formatted string when given valid datetime string', () => {
            const inputString = "2018-07-23T18:00:00+03:00";
            expect(form.instance().formatTimes(inputString)).toEqual("23. heinä 2018, klo 15.00")
        });
    });

    // it('has select for planes', () => {
    //     form.setProps({selectedPlane: { id: 2, name: "something else!"}});
    //     form.update();
    //     expect(form.find('FormControl').at(2).props().componentClass).toEqual("select");
    //     expect(form.find('FormControl').at(2).props().value).toEqual(2);
    // });
    //
    // it('has select with correct options for selecting plane', () => {
    //     expect(form.find('FormGroup#selectPlane > FormControl > option').length).toEqual(2);
    //     expect(form.find('FormGroup#selectPlane > FormControl > option').first().props().value).toEqual('null');
    //     expect(form.find('FormGroup#selectPlane > FormControl > option').at(1).props().value).toEqual(1);
    // });
    //
    // it('has select with correct options for selecting type', () => {
    //     expect(form.find('FormGroup#selectType > FormControl > option').length).toEqual(2);
    //     expect(form.find('FormGroup#selectType > FormControl > option').first().props().value).toEqual("opetus");
    //     expect(form.find('FormGroup#selectType > FormControl > option').at(1).props().value).toEqual("harraste");
    // });
    //
    // it('has Button with type submit', () => {
    //     expect(form.find('Button').length).toEqual(1);
    //     expect(form.find('Button').first().props().type).toEqual('submit');
    // });
    //
    // it('changing type in form changes calls dispatch', () => {
    //     const spy = sinon.spy();
    //     form = shallow(<ReservationForm dispatch={spy} planes={[{ id: 1, name: "something" }]}/>);
    //     expect(spy.calledOnce).toBe(false);
    //     expect(form.find('FormGroup#selectType > FormControl').length).toEqual(1);
    //     form.find('FormGroup#selectType > FormControl').simulate('change', {target: {
    //         value: 'opetus'
    //     }});
    //     expect(spy.calledOnce).toBe(true);
    // });
    //
    // it('submitting form calls dispatch', () => {
    //     const spy = sinon.spy();
    //     form = shallow(<ReservationForm dispatch={spy} planes={[{ id: 1, name: "something" }]}/>);
    //     expect(spy.calledOnce).toBe(false);
    //     form.find('form').simulate('submit', {preventDefault: () => {}});
    //     expect(spy.calledOnce).toBe(true);
    // });
    //
    // describe("with start and end times", () => {
    //     afterEach(() => {
    //         form.setProps({start: undefined, end: undefined});
    //         form.update();
    //     });
    //
    //     it('shows start adn end time as empty initially', () => {
    //         form.setProps({start: "", end: ""});
    //         form.update();
    //         expect(form.find('FormControl').first().props().value).toEqual("");
    //         expect(form.find('FormControl').at(1).props().value).toEqual("");
    //     });
    //
    //     it('shows start and end times when given as props in the correct format', () => {
    //         form.setProps({
    //             start: "2017-06-06T20:00:00+03:00",
    //             end: "2017-06-06T20:30:00+03:00"
    //         });
    //         form.update();
    //         expect(form.find('FormControl').first().props().value).toEqual("6. kesä 2017, klo 17.00");
    //         expect(form.find('FormControl').at(1).props().value).toEqual("6. kesä 2017, klo 17.30");
    //     });
    // });
});