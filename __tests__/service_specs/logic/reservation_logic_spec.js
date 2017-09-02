import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import sinon from 'sinon';

import * as actions from '../../../app/javascript/services/logic/reservationLogic';

describe('Reservation Logic', () => {
    const reservations = [
        {
            id: 1,
            start: moment().add({days: 5, hours: 5}).format(),
            end: moment().add({days: 5, hours: 7}).format(),
            plane: { id: 2, name: "ES1234" },
            reservation_type: "opetus",
            user: { id: 1, full_name: 'Some Dude' },
        },
        {
            id: 2,
            start: moment().add({days: 4, hours: 2}).format(),
            end: moment().add({days: 4, hours: 3, minutes: 30}).format(),
            plane: { id: 1, name: "YG5463" },
            reservation_type: "harraste",
            user: { id: 1, full_name: 'Some Dude' }
        }
    ];


    it('has mapReservations function that returns a correct list of li-elements', () => {
        const returnedValue = actions.mapReservations(reservations);
        const expectedValue = reservations.map((res) =>
            (<tr key={res.id}>
                <td>{res.id}</td>
                <td>{moment(res.start).format('lll')}</td>
                <td>{moment(res.end).format('lll')}</td>
                <td>{res.plane.name}</td>
                <td>{res.reservation_type}</td>
                <td>
                    <Button onClick={() => sinon.stub()} bsStyle="danger" bsSize="small">
                        Poista
                    </Button>
                </td>
            </tr>)
        );

        expect(JSON.stringify(returnedValue)).toEqual(JSON.stringify(expectedValue));
    });
});