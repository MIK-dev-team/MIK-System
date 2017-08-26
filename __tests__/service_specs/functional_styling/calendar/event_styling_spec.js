import moment from 'moment';

import { eventStyleGetter } from "../../../../app/javascript/services/functional_styling/calendar/eventStyling"

describe('EventStyling', () => {
    it('has eventStyleGetter method that returns a style object', () => {
        const reservation = {
            title: 'opetus',
            start: moment().add(1, 'days').format(),
            end: moment().add(1, 'days').add(2, 'hours').format(),
            reservation_type: 'opetus'
        };
        const expectedStyle = eventStyleGetter(reservation, null, null, null);
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
        const expectedStyle = eventStyleGetter(reservation, null, null, null);
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
        const expectedStyle = eventStyleGetter(reservation, null, null, null);
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
        const expectedStyle = eventStyleGetter(reservation, null, null, null);
        expect(expectedStyle).toEqual({
            style: {
                backgroundColor: "#00ff5f",
                color: "#000000CC"
            }
        });
    });
});