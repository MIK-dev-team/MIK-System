/**
 * Created by owlaukka on 13/06/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ReservationTable } from "../../../app/javascript/components/reservations_list/reservation_table";

let table;

describe('Reservation table after fetching', () => {
    beforeEach(() => {
        table = shallow(<ReservationTable reservations={[{}]} fetched={true}/>)
    });

    afterEach(() => {
        table;
    });

    it('has title', () => {
        expect(table.find('h1').text()).toEqual('Varaukset');
    });

    it('has one table', () => {
        expect(table.find('Table').length).toEqual(1);
    });

    it('has correct amount of table headers', () => {
        expect(table.find('th').length).toEqual(5);
    });

    it('has ReservationTableContent when fetched is true', () => {
        expect(table.find('ReservationTableContent').length).toEqual(1);
        expect(table.find('#load').length).toEqual(0);
    });

    it('passes correct props to ReservationTableContent when empty array', () => {
        let content = table.find('ReservationTableContent');
        expect(content.props().reservations).toEqual([{}]);
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
        table.update();
        let content = table.find('ReservationTableContent');
        expect(content.props().reservations).toEqual(newRes);
    })
});

describe('ReservationTable before fetching', () => {
    beforeEach(() => {
        table = shallow(<ReservationTable reservations={[{}]} fetching={true} fetched={false}/>)
    });

    afterEach(() => {
        table;
    });

    it('has ReactLoading', () => {
        expect(table.find('#load').length).toEqual(1);
    })
});