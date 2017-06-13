import React from 'react';
import renderer from 'react-test-renderer';
import ReservationTable from '../app/javascript/components/reservations_list/reservation_table';

describe('Welcome', () => {
    it('to snapshot testing', () => {
        const component = renderer.create(
            <ReservationTable reservations={[]} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});