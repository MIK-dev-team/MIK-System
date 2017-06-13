/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ReservationTable from "../../app/javascript/components/reservations_list/reservation_table";

let table;

beforeEach(() => {
    table = shallow(<ReservationTable reservations={[]} />)
});

afterEach(() => {
    table.setProps({
        reservations: []
    })
})

describe('Reservation table', () => {

    it('has title', () => {
        expect(table.find('h1').text()).toEqual('Varaukset');
    });

    it('has one table', () => {
        expect(table.find('Table').length).toEqual(1);
    });

    it('has correct amount of table headers', () => {
        expect(table.find('th').length).toEqual(5);
    });

    it('sets reservations to state', () => {
        expect(table.state().reservations).toEqual([]);
    });

    it('has ReservationTableContent', () => {
        expect(table.find('ReservationTableContent').length).toEqual(1);
    });

    it('passes correct props to ReservationTableContent when empty array', () => {
        let content = table.find('ReservationTableContent');
        expect(content.props().reservations).toEqual([]);
    });

    it('passes correct props to ReservationTableContent when not an empty array of reservations', () => {
        let newRes = [
            {
                id: 2,
                start: moment("2017-06-09T10:30:00+03:00").toDate(),
                end: moment("2017-06-09T20:00:00+03:00").toDate(),
                plane_id: 1,
                reservation_type: "harraste"
            }
        ];
        table.setProps({
            reservations: newRes
        });
        let content = table.find('ReservationTableContent');
        expect(content.props().reservations).toEqual(newRes);
    })
});