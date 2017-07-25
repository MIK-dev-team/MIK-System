/**
 * Created by owlaukka on 12/06/17.
 */
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ReservationTableContent from "../../../app/javascript/components/reservations_list/reservation_table_content";

moment.locale('fi');

let tableContent;
let reservations = [
    {
        id: 1,
        start: moment("2017-06-10T18:00:00+03:00").toDate(),
        end: moment("2017-06-10T20:00:00+03:00").toDate(),
        plane: { id: 2, name: "ES1234" },
        reservation_type: "opetus"
    },
    {
        id: 2,
        start: moment("2017-06-09T10:30:00+03:00").toDate(),
        end: moment("2017-06-09T20:00:00+03:00").toDate(),
        plane: { id: 1, name: "YG9324" },
        reservation_type: "harraste"
    }
];

beforeEach(() => {
    tableContent = shallow(<ReservationTableContent reservations={[]} />);
});

afterEach(() => {
    tableContent.setProps({ reservations: [] });
});

describe('Reservation table content', () => {

    it('displays nothing extra if no props given', () => {
        expect(tableContent.find('tr').length).toEqual(1);
        expect(tableContent.find('td').length).toEqual(0);
    });

    it('displays correct amount of rows', () => {
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('tr').length).toEqual(2);
    });

    it('displays correct amount of columns', () => {
        expect(tableContent.find('td').length).toEqual(0);
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('td').length).toEqual(10);
    });

    it('displays all reservations', () => {
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('tr').length).toEqual(2);
        expect(tableContent.find('tr').first()
            .find('td').first().text()).toEqual("1");
        expect(tableContent.find('tr').at(1)
            .find('td').first().text()).toEqual("2");
        expect(tableContent.find('tr').at(2)
            .find('td').first().text()).toEqual("")
    });

    it('displays id correctly', () => {
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('tr').first()
            .find('td').first().text()).toEqual("1");
        expect(tableContent.find('tr').at(1)
            .find('td').first().text()).toEqual("2");
    });

    it('displays start time in correct format', () => {
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('tr').first()
            .find('td').at(1).text()).toEqual("10. kesä 2017, klo 15.00");
    });

    it('displays end time in correct format', () => {
        tableContent.setProps({ reservations: reservations });
        expect(tableContent.find('tr').at(1)
            .find('td').at(2).text()).toEqual("9. kesä 2017, klo 17.00");
    });
});