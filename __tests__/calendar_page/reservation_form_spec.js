/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';
import ReservationForm from "../../app/javascript/components/calendar_page/reservation_form";

let form;
describe('Reservation form', () => {
    let timeSlot;
    beforeEach(() => {
        timeSlot = {
            start: "",
            end: ""
        };
        form = shallow(<ReservationForm timeSlot={timeSlot} plane="kone 1" />);
    });

    it('has correct initial state', () => {
        expect(form.state()).toEqual({type: 'harraste', submitted: false});
    });

    it('has a panel header with right props', () => {
        expect(form.find('Panel').first().props().header).toEqual(<h3>Tee varaus</h3>);
    });

    it('has correct amount of form groups', () => {
        expect(form.find('FormGroup').length).toEqual(4);
    });

    it('has select for planes', () => {
        expect(form.find('FormControl').at(2).props().componentClass).toEqual("select");
        expect(form.find('FormControl').at(2).props().value).toEqual("kone 1");
    });

    it('has select with correct options for selecting plane', () => {
        expect(form.find('FormGroup#selectPlane > FormControl > option').length).toEqual(3);
        expect(form.find('FormGroup#selectPlane > FormControl > option').first().props().value).toEqual("kone1");
        expect(form.find('FormGroup#selectPlane > FormControl > option').at(1).props().value).toEqual("kone2");
        expect(form.find('FormGroup#selectPlane > FormControl > option').at(2).props().value).toEqual("kone3");
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

    it('has 1 ReservationCreator', () => {
        expect(form.find('ReservationCreator').length).toEqual(1);
    });

    it('sets correct props to ReservationCreator initially', () => {
        expect(form.find('ReservationCreator').props()).toEqual({
            reservation: {},
            submitted: false
        })
    });

    it('sets correct props to ReservationCreator when state changes change', () => {
        form.setState({
            submitted: true
        });
        form.update();
        expect(form.find('ReservationCreator').props()).toEqual({
            reservation: {},
            submitted: true
        })
    })

    it('changing type in form changes state', () => {
        expect(form.find('FormGroup#selectType > FormControl').length).toEqual(1);
        form.find('FormGroup#selectType > FormControl').simulate('change', {target: {
            value: 'opetus'
        }});
        form.update();
        expect(form.state().type).toEqual("opetus");
    });

    it('shows start adn end time as empty initially', () => {
        expect(form.find('FormControl').first().props().value).toEqual("");
        expect(form.find('FormControl').at(1).props().value).toEqual("");
    });

    it('shows start and end times when given as props in the correct format', () => {
        form.setProps({timeSlot: {
            start: "2017-06-06T20:00:00+03:00",
            end: "2017-06-06T20:30:00+03:00"
        }});
        form.update();
        expect(form.find('FormControl').first().props().value).toEqual("6. kesä 2017, klo 17.00");
        expect(form.find('FormControl').at(1).props().value).toEqual("6. kesä 2017, klo 17.30");
    });

    it('sets state correctly when submitting form', () => {
        form.find('form').simulate('submit', { preventDefault() {} });
        form.update();
        expect(form.state().submitted).toBe(true);
    });

    it('sets ReservationCreator props correctly when submitting form', () => {
        form.setState({
            type: "opetus"
        });
        form.setProps({timeSlot: {
            start: "2017-06-06T20:00:00+03:00",
            end: "2017-06-06T20:30:00+03:00"
        }});
        form.find('form').simulate('submit', { preventDefault() {} });
        form.update();
        expect(form.find('ReservationCreator').props()).toEqual({
            reservation: {
                start: "2017-06-06T20:00:00+03:00",
                end: "2017-06-06T20:30:00+03:00",
                reservation_type: "opetus",
                plane_id: 1
            },
            submitted: true
        });
    });
});