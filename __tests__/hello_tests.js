import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ReservationTable from '../app/javascript/components/reservations_list/reservation_table';

describe('Welcome', () => {
    it('to the world of testing react', () => {
        expect(true).toBe(true);
    });

    it('to snapshot testing', () => {
        const component = renderer.create(
            <ReservationTable reservations={[]} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to using enzyme', () => {
        let table = shallow(<ReservationTable reservations={[]} />);
        expect(table.find('h1').text()).toEqual('Varaukset');
    });

    it('to finding arrays', () => {
        let table = shallow(<ReservationTable reservations={[]} />);
        expect(table.find('Table').length).toEqual(1);
        expect(table.find('thead').length).toEqual(1);
        expect(table.find('th').length).toEqual(5);
    })
});