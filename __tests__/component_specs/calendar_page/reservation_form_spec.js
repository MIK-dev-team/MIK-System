/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';
import { ReservationForm } from "../../../app/javascript/components/calendar_page/reservation_form";

let form;
describe('Reservation form', () => {
    let timeSlot;
    beforeAll(() => {
        // timeSlot = {
        //     start: "",
        //     end: ""
        // };
        form = shallow(<ReservationForm />);
    });

    it('has a panel header with right props', () => {
        expect(form.find('Panel').first().props().header).toEqual(<h3>Tee varaus</h3>);
    });

    it('has correct amount of form groups', () => {
        expect(form.find('FormGroup').length).toEqual(4);
    });

    it('has select for planes', () => {
        form.setProps({plane: "kone1"});
        form.update();
        expect(form.find('FormControl').at(2).props().componentClass).toEqual("select");
        expect(form.find('FormControl').at(2).props().value).toEqual("kone1");
    });

    it('has select with correct options for selecting plane', () => {
        expect(form.find('FormGroup#selectPlane > FormControl > option').length).toEqual(3);
        expect(form.find('FormGroup#selectPlane > FormControl > option').first().props().value).toEqual(1);
        expect(form.find('FormGroup#selectPlane > FormControl > option').at(1).props().value).toEqual(2);
        expect(form.find('FormGroup#selectPlane > FormControl > option').at(2).props().value).toEqual(3);
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

    it('changing type in form changes calls dispatch', () => {
        const spy = sinon.spy();
        form = shallow(<ReservationForm dispatch={spy}/>);
        expect(spy.calledOnce).toBe(false);
        expect(form.find('FormGroup#selectType > FormControl').length).toEqual(1);
        form.find('FormGroup#selectType > FormControl').simulate('change', {target: {
            value: 'opetus'
        }});
        expect(spy.calledOnce).toBe(true);
    });

    it('submitting form calls dispatch', () => {
        const spy = sinon.spy();
        form = shallow(<ReservationForm dispatch={spy}/>);
        expect(spy.calledOnce).toBe(false);
        form.find('form').simulate('submit', {preventDefault: () => {}});
        expect(spy.calledOnce).toBe(true);
    })

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