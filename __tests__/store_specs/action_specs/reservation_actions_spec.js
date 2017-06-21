import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moment from 'moment';

import * as actions from '../../../app/javascript/store/actions/reservationsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Reservation action', () => {
    let stub, promise, store;
    const response = {
        data: [
            {
                id: 1,
                start: moment("2017-06-10T18:00:00+03:00").toDate(),
                end: moment("2017-06-10T20:00:00+03:00").toDate(),
                plane_id: 2,
                reservation_type: "opetus"
            },
            {
                id: 2,
                start: moment("2017-06-09T10:30:00+03:00").toDate(),
                end: moment("2017-06-09T20:00:00+03:00").toDate(),
                plane_id: 1,
                reservation_type: "harraste"
            }
        ]
    };

    beforeEach(() => {
        store = mockStore({
            reservations: [{}],
            fetching: false,
            fetched: false,
            error: null,
        });

    });


    it('fetchReservations dispatches correct actions on succesful request', () => {
        promise = Promise.resolve(response);
        stub = sinon.stub(axios, 'get').callsFake(() => promise);
        const expectedActions = [
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
        ];

        store.dispatch(actions.fetchReservations());
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // it('fetchReservations dispatches correct actions on incorrect request', () => {
    //     const expectedActions = [
    //         { type: "FETCH_RESERVATIONS_PENDING" },
    //         { type: "FETCH_RESERVATIONS_REJECTED", payload: response.data }
    //     ];
    //
    //
    // })

    it('mapReservations returns a correct list of li-elements', () => {
        const returnedValue = actions.mapReservations(response.data);
        const expectedValue = response.data.map((res) =>
            (<tr key={res.id}>
                <td>{res.id}</td>
                <td>{moment(res.start).format('lll')}</td>
                <td>{moment(res.end).format('lll')}</td>
                <td>{res.plane_id}</td>
                <td>{res.reservation_type}</td>
            </tr>)
        )

        expect(returnedValue).toEqual(expectedValue);
    })
});