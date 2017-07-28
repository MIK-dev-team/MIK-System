import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

import * as reservationsActions from '../../../app/javascript/store/actions/reservationsActions';
import { Calendar } from "../../../app/javascript/components/calendar_page/calendar";
/**
 * Created by owlaukka on 17/06/17.
 */

let calendar;
describe('Calendar', () => {
    beforeAll(() => {
        calendar = shallow(<Calendar reservations={[{}]}/>);
    });

    afterEach(() => {
        calendar.setProps({reservations: [{}]});
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
                backgroundColor: "#ffe99a",
                color: "#000000"
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
                backgroundColor: "#00eeee",
                color: "#000000"
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
                backgroundColor: "#ff0000",
                color: "#000000"
            }
        });
    });
});