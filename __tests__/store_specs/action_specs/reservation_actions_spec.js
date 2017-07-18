import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import AjaxService from '../../../app/javascript/services/ajax_service';
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
                plane: { id: 2, name: "ES1234" },
                reservation_type: "opetus"
            },
            {
                id: 2,
                start: moment("2017-06-09T10:30:00+03:00").toDate(),
                end: moment("2017-06-09T20:00:00+03:00").toDate(),
                plane: { id: 1, name: "YG5463" },
                reservation_type: "harraste"
            }
        ]
    };

    beforeEach(() => {
        store = mockStore({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        });

    });

    afterEach(() => {
        stub.restore();
        promise = undefined;
    });


    it('fetchReservations dispatches correct actions on succesful request', () => {
        promise = Promise.resolve(response);
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);
        const expectedActions = [
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
        ];

        store.dispatch(actions.fetchReservations());
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fetchReservations dispatches correct actions on incorrect request', () => {
        const error = {response: {status: 422}};
        const expectedActions = [
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_REJECTED", payload: error }
        ];
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService, 'get').callsFake(() => promise);

        store.dispatch(actions.fetchReservations());
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('mapReservations returns a correct list of li-elements', () => {
        const returnedValue = actions.mapReservations(response.data);
        const expectedValue = response.data.map((res) =>
            (<tr key={res.id}>
                <td>{res.id}</td>
                <td>{moment(res.start).format('lll')}</td>
                <td>{moment(res.end).format('lll')}</td>
                <td>{res.plane.name}</td>
                <td>{res.reservation_type}</td>
            </tr>)
        );

        expect(returnedValue).toEqual(expectedValue);
    });

    it('submitReservation dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_RESERVATION_PENDING" },
            { type: "SUBMIT_RESERVATION_FULFILLED" },
            { type: "RESET_NEW_RESERVATION" },
            { type: "FETCH_RESERVATIONS_PENDING" }
        ];

        store.dispatch(actions.submitReservation({preventDefault: () => {}}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('submitReservation dispatches correct actions on incorrect request', () => {
        const error = {response: {status: 422, data: {some: "data here"}}};
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService, 'post').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_RESERVATION_PENDING" },
            { type: "SUBMIT_RESERVATION_REJECTED", payload: error.response.data }
        ];


        store.dispatch(actions.submitReservation({preventDefault: () => {}}));
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it("selectPlane dispatches correct actions", () => {
        const plane = "cool Plane";
        const expectedActions = [
            { type: "SELECT_PLANE", payload: plane }
        ];
        store.dispatch(actions.selectPlane(plane));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setType dispatches correct actions", () => {
        const event = {target: {value: "great value"}};
        const expectedActions = [
            { type: "SET_TYPE", payload: event.target.value }
        ];
        store.dispatch(actions.setType(event));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setCollapsed dispatches correct actions", () => {
        const collapsed = true;
        const expectedActions = [
            { type: "SET_COLLAPSED", payload: !collapsed }
        ];
        store.dispatch(actions.setCollapsed(collapsed));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it("fillForm dispatches correct actions", () => {
        const timeSlot = {start: "2017-06-10T18:00:00+03:00", end: "2017-06-10T20:00:00+03:00"};

        store.dispatch(actions.fillForm(timeSlot));
        expect(store.getActions()).toEqual([
            { type: "SET_TIMESLOT", payload: {
                    start: new Date(timeSlot.start),
                    end: new Date(timeSlot.end)
                }
            },
            { type: "SET_COLLAPSED", payload: false }
        ]);
    })
});