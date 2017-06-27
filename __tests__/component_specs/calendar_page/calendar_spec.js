import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";
import axios from "axios";
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
    })

    it('sets initial state correctly', () => {
        const expectedState = {
            reservations: [{}],
        };
        expect(calendar.state()).toEqual(expectedState)
    });

    it('changes state when new props are received', () => {
        const newReservations = [{some: "field", another: "field"}, {second: "object", fooor: "testing"}];
        calendar.setProps({reservations: newReservations});
        calendar.update();
        expect(calendar.state()).toEqual({
            reservations: newReservations,
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


    it('has method fillFormView that pushes new reservation to reservations state correctly', () => {
        const dispatch = sinon.spy();
        const timeSlot = {
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format()
        };
        expect(calendar.state().reservations).toEqual([{}]);
        calendar.setProps({dispatch: dispatch, reservations: [{}, {
                    'title': 'opetus',
                    'start': "2017-06-10T18:00:00+03:00",
                    'end': "2017-06-10T20:00:00+03:00",
                    reservation_type: 'opetus'
                }
            ]
        });
        calendar.update();
        expect(calendar.state().reservations).toEqual([{}, {
            'title': 'opetus',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
            reservation_type: 'opetus'
        }
        ]);

        calendar.instance().fillFormView(timeSlot);
        expect(calendar.state().reservations).toEqual([{}, {
            'title': 'opetus',
            'start': "2017-06-10T18:00:00+03:00",
            'end': "2017-06-10T20:00:00+03:00",
            reservation_type: 'opetus'
        },
            {
                'title': '<valittu aika>',
                'start': timeSlot.start,
                'end': timeSlot.end,
                reservation_type: 'selected'
            }
            ]);
    });

    it('fillForm pops a reservation out of the list if another is selected', () => {
        const dispatch = sinon.spy();
        calendar.setProps({dispatch: dispatch})
        const timeSlot = {
                start: moment().add(1, 'days').format(),
                end: moment().add(1, 'days').add(2, 'hours').format()
        },
        anotherTimeSlot = {
            start: moment().add(1, 'days').add(2, 'hours').format(),
            end: moment().add(1, 'days').add(4, 'hours').format()
        };
        expect(calendar.state().reservations).toEqual([{}]);
        calendar.instance().fillFormView(timeSlot);
        calendar.update();

        expect(calendar.state().reservations).toEqual([{}, {
            'title': '<valittu aika>',
            'start': timeSlot.start,
            'end': timeSlot.end,
            reservation_type: 'selected'
        }]);

        calendar.instance().fillFormView(anotherTimeSlot);
        calendar.update();

        expect(calendar.state().reservations).toEqual([{}, {
            'title': '<valittu aika>',
            'start': anotherTimeSlot.start,
            'end': anotherTimeSlot.end,
            reservation_type: 'selected'
        }]);
    });

    it("fillFormView doesn't allow reservations in the past", () => {
        const dispatch = sinon.spy();
        const timeSlot = {
            'start': new Date("2016-06-10T18:00:00+03:00"),
            'end': new Date("2016-06-10T20:00:00+03:00"),
        };
        calendar.setProps({dispatch: dispatch, reservations: [{}, {
                'title': 'opetus',
                'start': "2017-06-10T18:00:00+03:00",
                'end': "2017-06-10T20:00:00+03:00",
                reservation_type: 'opetus'
            }
        ]});
        calendar.instance().fillFormView(timeSlot);
        calendar.update();

        expect(calendar.state().reservations).toEqual([{}, {
                'title': 'opetus',
                'start': "2017-06-10T18:00:00+03:00",
                'end': "2017-06-10T20:00:00+03:00",
                reservation_type: 'opetus'
            }
        ]);
    });

    it("fillForm doesn't allow overlapping reservations", () => {
        let spy = sinon.spy(window, 'alert');
        const timeSlot = {
                start: moment().add(1, 'days').add(1, 'hours').format(),
                end: moment().add(1, 'days').add(1, 'hours').add(30, 'minutes').format()
        },
        reservation = {
            title: 'opetus',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus'
        };
        calendar.setProps({reservations: [{}, reservation]});
        calendar.update();
        calendar.instance().fillFormView(timeSlot);
        calendar.update();
        expect(spy.calledOnce).toBe(true);
        expect(calendar.state().reservations).toEqual([{}, {
            title: 'opetus',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus'
        }]);
        spy.restore();
    });

    it('has Button that calls dispatch', () => {
        const dispatch = sinon.spy();
        calendar.setProps({dispatch: dispatch});
        calendar.update();
        calendar.find('Button').simulate('click');
        calendar.update();
        expect(dispatch.calledOnce).toBe(true);
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
            reservation_type: 'opetus'
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