import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

import * as reservationsActions from '../../../app/javascript/store/actions/reservationsActions';
import * as notifiersActions from '../../../app/javascript/store/actions/notifiersActions';
import { Calendar } from "../../../app/javascript/components/calendar_page/calendar";
/**
 * Created by owlaukka on 17/06/17.
 */

let calendar;
describe('Calendar', () => {
    beforeAll(() => {
        calendar = shallow(<Calendar reservations={[]}/>);
    });

    afterEach(() => {
        calendar.setProps({reservations: []});
        calendar.update();
    });

    it('has one element with id content', () => {
        expect(calendar.find('#content').length).toEqual(1);
    });

    it('has correct amount of columns', () => {
        expect(calendar.find('Col').length).toEqual(3);
    });

    it("has Button that isn't disabled initially", () => {
        expect(calendar.find('Button').hasClass('disabled')).toBe(false);
    });

    it('has Button that calls dispatch with correct action', () => {
        const dispatch = sinon.spy();
        const setCollapsedStub = sinon.stub(reservationsActions, 'setCollapsed');
        calendar.setProps({dispatch: dispatch});
        calendar.update();
        expect(dispatch.calledOnce).toBe(false);
        expect(setCollapsedStub.calledOnce).toBe(false);
        calendar.find('Button').simulate('click');
        calendar.update();
        expect(dispatch.calledOnce).toBe(true);
        expect(setCollapsedStub.calledOnce).toBe(true);
    });

    it('has selectTimeSlot function that triggers correct function when notifierMode is on', () => {
        const dispatchSpy = sinon.spy(),
              selectTimeForNotifier = sinon.stub(notifiersActions, 'selectTimeForNotifier');
        calendar.setProps({dispatch: dispatchSpy, notifierMode: true});
        calendar.update();
        const timeSlot = {
            start: moment().add(1, 'days').toDate(),
            end: moment().add(2, 'days').toDate(),
        };
        expect(dispatchSpy.calledOnce).toBe(false);
        expect(selectTimeForNotifier.calledOnce).toBe(false);

        calendar.instance().selectTimeSlot(timeSlot);
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(selectTimeForNotifier.calledOnce).toBe(true);
    });

    it('has selectTimeSlot function that triggers correct function when notifierMode is off', () => {
        const dispatchSpy = sinon.spy(),
            fillFormNotifier = sinon.stub(reservationsActions, 'fillForm');
        calendar.setProps({dispatch: dispatchSpy, notifierMode: false});
        calendar.update();
        const timeSlot = {
            start: moment().add(1, 'days').toDate(),
            end: moment().add(2, 'days').toDate(),
        };
        expect(dispatchSpy.calledOnce).toBe(false);
        expect(fillFormNotifier.calledOnce).toBe(false);

        calendar.instance().selectTimeSlot(timeSlot);
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(fillFormNotifier.calledOnce).toBe(true);
    });

    it('has eventStyleGetter method that returns a style object', () => {
        const reservation = {
            title: 'opetus',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus'
        };
        const expectedStyle = calendar.instance().eventStyleGetter(reservation, null, null, null);
        expect(expectedStyle).toEqual({
            style: {
                backgroundColor: "#ffe99a8C",
                color: "#000000CC"
            }
        });
    });

    it('has eventStyleGetter method that returns a correct style object for harraste type', () => {
        const reservation = {
            title: 'harraste',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'harraste'
        };
        const expectedStyle = calendar.instance().eventStyleGetter(reservation, null, null, null);
        expect(expectedStyle).toEqual({
            style: {
                backgroundColor: "#00eeee8C",
                color: "#000000CC"
            }
        });
    });

    it('has eventStyleGetter method that returns a correct style object for selected timeSlot', () => {
        const reservation = {
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'selected'
        };
        const expectedStyle = calendar.instance().eventStyleGetter(reservation, null, null, null);
        expect(expectedStyle).toEqual({
            style: {
                backgroundColor: "#ff00008C",
                color: "#000000CC"
            }
        });
    });

    it('has eventStyleGetter method that returns a correct style object for selected observer timeSlot', () => {
        const reservation = {
            title: '<valittu aika tarkkailijalle>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'observer'
        };
        const expectedStyle = calendar.instance().eventStyleGetter(reservation, null, null, null);
        expect(expectedStyle).toEqual({
            style: {
                backgroundColor: "#00ff5f",
                color: "#000000CC"
            }
        });
    });

    it('has isDisabled function that return true if last reservation in props is of selected type', () => {
        const reservations = [{
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'selected'
        }];
        calendar.setProps({reservations: reservations});
        calendar.update();

        const isButtonDisabledReturn = calendar.instance().isButtonDisabled();
        expect(isButtonDisabledReturn).toBe(true);
    });

    it('has isDisabled function that return false if last reservation in props is not of selected type', () => {
        const reservations = [{
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus'
        }];
        calendar.setProps({reservations: reservations});
        calendar.update();

        const isButtonDisabledReturn = calendar.instance().isButtonDisabled();
        expect(isButtonDisabledReturn).toBe(false);
    });
});