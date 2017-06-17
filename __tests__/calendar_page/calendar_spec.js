import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";
import axios from "axios";
import Calendar from "../../app/javascript/components/calendar_page/calendar";
/**
 * Created by owlaukka on 17/06/17.
 */

let calendar;
describe('Calendar', () => {
    beforeEach(() => {
        calendar = shallow(<Calendar plane="kone1" reservations={[{}]} />);
    });

    it('sets initial state correctly', () => {
        const expectedState = {
            reservations: [{}],
            timeSlot: {
                start: "",
                end: "",
            },
            collapsed: true
        };
        expect(calendar.state()).toEqual(expectedState)
    });

    it('changes state when new props are received', () => {
        const newReservations = [{some: "field", another: "field"}, {second: "object", fooor: "testing"}];
        calendar.setProps({reservations: newReservations});
        calendar.update();
        expect(calendar.state()).toEqual({
            reservations: newReservations,
            timeSlot: {
                start: "",
                end: "",
            },
            collapsed: true
        });
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

    it('has method fillForm that pushes new reservation to reservations correctly', () => {
        const timeSlot = {
            start: "2017-06-10T18:00:00+03:00",
            end: "2017-06-10T20:00:00+03:00"
        };
        expect(calendar.state().reservations).toEqual([{}]);

        calendar.instance().fillForm(timeSlot);
        calendar.update();
        expect(calendar.state().reservations).toEqual([{}, {
            'title': '<valittu aika>',
            'start': timeSlot.start,
            'end': timeSlot.end,
            reservation_type: 'selected'
        }]);
    });

    it('fillForm method sets state correctly', () => {
        const timeSlot = {
            start: "2017-06-10T18:00:00+03:00",
            end: "2017-06-10T20:00:00+03:00"
        };
        expect(calendar.state()).toEqual({
            reservations: [{}],
            timeSlot: {
                start: "",
                end: ""
            },
            collapsed: true
        });
        calendar.instance().fillForm(timeSlot);
        calendar.update();

        expect(calendar.state()).toEqual({
            reservations: [{}, {
                'title': '<valittu aika>',
                'start': timeSlot.start,
                'end': timeSlot.end,
                reservation_type: 'selected'
            }],
            timeSlot: {
                start: moment("2017-06-10T18:00:00+03:00").format(),
                end: moment("2017-06-10T20:00:00+03:00").format()
            },
            collapsed: false
        });
    });

    it('fillForm pops a reservation out of the list if another is selected', () => {
        const timeSlot = {
            start: "2017-06-10T18:00:00+03:00",
            end: "2017-06-10T20:00:00+03:00"
        },
        anotherTimeSlot = {
            start: "2017-06-10T21:00:00+03:00",
            end: "2017-06-10T22:00:00+03:00"
        };
        expect(calendar.state().reservations).toEqual([{}]);
        calendar.instance().fillForm(timeSlot);
        calendar.update();

        expect(calendar.state().reservations).toEqual([{}, {
            'title': '<valittu aika>',
            'start': timeSlot.start,
            'end': timeSlot.end,
            reservation_type: 'selected'
        }]);

        calendar.instance().fillForm(anotherTimeSlot);
        calendar.update();

        expect(calendar.state().reservations).toEqual([{}, {
            'title': '<valittu aika>',
            'start': anotherTimeSlot.start,
            'end': anotherTimeSlot.end,
            reservation_type: 'selected'
        }]);
    });

    it("fillForm doesn't allow overlapping reservations", () => {
        let spy = sinon.spy(window, 'alert');
        const timeSlot = {
            start: "2017-06-10T19:00:00+03:00",
            end: "2017-06-10T19:30:00+03:00"
        },
        reservation = {
            'title': 'opetus',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
            reservation_type: 'opetus'
        };
        calendar.setProps({reservations: [{}, reservation]});
        calendar.update();
        calendar.instance().fillForm(timeSlot);
        calendar.update();
        expect(spy.calledOnce).toBe(true);
        expect(calendar.state().reservations).toEqual([{}, {
            'title': 'opetus',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
            reservation_type: 'opetus'
        }]);
        spy.restore();
    });

    it('has Button that calls method setCollapsed and sets state correctly', () => {
        expect(calendar.state().collapsed).toBe(true);
        calendar.find('Button').simulate('click');
        calendar.update();
        expect(calendar.state().collapsed).toBe(false);
    });

    it('has eventStyleGetter method that returns a style object', () => {
        const reservation = {
            'title': 'opetus',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
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
            'title': 'harraste',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
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

    it('has eventStyleGetter method that returns a correct style object for selected type', () => {
        const reservation = {
            'title': 'selected',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
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