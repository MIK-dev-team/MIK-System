import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

import * as reservationsActions from '../../../app/javascript/store/actions/reservationsActions';
import * as notifiersActions from '../../../app/javascript/store/actions/notifiersActions';
import * as singleReservationAction from '../../../app/javascript/store/actions/singleReservationActions';
import { Calendar } from "../../../app/javascript/components/calendar_page/calendar";
/**
 * Created by owlaukka on 17/06/17.
 */

let calendar, clock;
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

    it('has isDisabled function that return true if last reservation in props is of selected type and user is logged', () => {
        const reservations = [{
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'selected',
            user: { id: 1 },
        }];
        calendar.setProps({reservations: reservations, logged: true, user_id: 1});
        calendar.update();

        const isButtonDisabledReturn = calendar.instance().isButtonDisabled();
        expect(isButtonDisabledReturn).toBe(true);
    });

    it('has isDisabled function that return false if last reservation in props is not of selected type and user is logged', () => {
        const reservations = [{
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus',
            user: { id: 1 },
        }];
        calendar.setProps({reservations: reservations, logged: true, user_id: 1});
        calendar.update();

        const isButtonDisabledReturn = calendar.instance().isButtonDisabled();
        expect(isButtonDisabledReturn).toBe(false);
    });

    it('has isDisabled function that return true if user is not logged', () => {
        const reservations = [{
            title: '<valittu aika>',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus',
            user: { id: 2 }
        }];
        calendar.setProps({reservations: reservations, logged: false});
        calendar.update();

        const isButtonDisabledReturn = calendar.instance().isButtonDisabled();
        expect(isButtonDisabledReturn).toBe(true);
    });

    describe('dispatches correct action', () => {
        let dispatchSpy, actionStub;

        beforeEach(() => {
            dispatchSpy = sinon.spy();
            calendar.setProps({dispatch: dispatchSpy});
            calendar.update();
        });

        afterEach(() => {
            actionStub.restore();
        });


        it('when Button for showing form is pressed', () => {
            actionStub = sinon.stub(reservationsActions, 'setCollapsed');
            calendar.setProps({dispatch: dispatchSpy});
            calendar.update();
            expect(dispatchSpy.calledOnce).toBe(false);
            expect(actionStub.calledOnce).toBe(false);
            calendar.find('Button').simulate('click');
            calendar.update();
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when selectTimeSlot is called and notifierMode is on', () => {
            actionStub = sinon.spy(notifiersActions, 'selectTimeForNotifier');
            calendar.setProps({dispatch: dispatchSpy, notifierMode: true});
            calendar.update();
            const timeSlot = {
                start: moment().add(1, 'days').toDate(),
                end: moment().add(2, 'days').toDate(),
            };
            expect(dispatchSpy.calledOnce).toBe(false);
            expect(actionStub.calledOnce).toBe(false);

            calendar.instance().selectTimeSlot(timeSlot);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when selectTimeSlow is called and notifierMode is off', () => {
            actionStub = sinon.spy(reservationsActions, 'fillForm');
            calendar.setProps({dispatch: dispatchSpy, notifierMode: false});
            calendar.update();
            const timeSlot = {
                start: moment().add(1, 'days').toDate(),
                end: moment().add(2, 'days').toDate(),
            };
            expect(dispatchSpy.calledOnce).toBe(false);
            expect(actionStub.calledOnce).toBe(false);

            calendar.instance().selectTimeSlot(timeSlot);
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when selecting an event on the calendar', () => {
            actionStub = sinon.stub(singleReservationAction, 'showModal');
            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.find('#calendar').simulate('selectEvent');
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
        });

        it('when selecting timeslot from calendar', () => {
            actionStub = sinon.stub(calendar.instance(), 'selectTimeSlot');
            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.find('#calendar').simulate('selectSlot');
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
        });

        it('when toggleSidebarMod is called, sidebarMod is true and given eventkey is 1', () => {
            actionStub = sinon.stub(reservationsActions, 'setSidebarMod');
            calendar.setProps({sidebarMod: true});
            calendar.update();

            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.instance().toggleSidebarMod(1);
            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
        });

        it('when toggleSidebarMod is called, sidebarMod is true and given eventkey is 2', () => {
            actionStub = sinon.stub(reservationsActions, 'setSidebarMod');
            calendar.setProps({sidebarMod: true});
            calendar.update();

            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.instance().toggleSidebarMod(2);
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
            actionStub.calledWithExactly(2);
        });

        it('when toggleSidebarMod is called, sidebarMod is false and given eventkey is 1', () => {
            actionStub = sinon.stub(reservationsActions, 'setSidebarMod');
            calendar.setProps({sidebarMod: false});
            calendar.update();

            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.instance().toggleSidebarMod(1);
            expect(actionStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
            actionStub.calledWithExactly(1);
        });

        it('when toggleSidebarMod is called, sidebarMod is false and given eventkey is 2', () => {
            actionStub = sinon.stub(reservationsActions, 'setSidebarMod');
            calendar.setProps({sidebarMod: false});
            calendar.update();

            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
            calendar.instance().toggleSidebarMod(2);
            expect(actionStub.notCalled).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
        });
    });

    it('has correct time for scrollToTime when time is between 9-21', () => {
        let expectedDate = moment('2017-03-15T12:00:00').toDate();
        let clock = sinon.useFakeTimers(new Date(2017, 2, 15).getTime());
        clock.tick(60*60*17*1000);
        calendar = shallow(<Calendar reservations={[]}/>);
        expect(calendar.find('#calendar').props().scrollToTime).toEqual(expectedDate);
        clock.restore();
    });

    it('has correct time for scrollToTime when time is between 21-9', () => {
        let expectedDate = moment('2017-03-15T07:30:00').toDate();
        let clock = sinon.useFakeTimers(new Date(2017, 2, 15).getTime());
        clock.tick(60*60*2*1000);
        calendar = shallow(<Calendar reservations={[]}/>);
        expect(calendar.find('#calendar').props().scrollToTime).toEqual(expectedDate);
        clock.restore();
    });
});