import React from 'react';
import sinon from 'sinon';
import { Button } from 'react-bootstrap';
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
                start: moment().add({days: 5, hours: 5}).format(),
                end: moment().add({days: 5, hours: 7}).format(),
                plane: {id: 2, name: "ES1234"},
                reservation_type: "opetus"
            },
            {
                id: 2,
                start: moment().add({days: 4, hours: 2}).format(),
                end: moment().add({days: 4, hours: 3, minutes: 30}).format(),
                plane: {id: 1, name: "YG5463"},
                reservation_type: "harraste"
            }
        ]
    };

    beforeEach(() => {
        store = mockStore({
            reservations: [],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            reservation_type: "harraste",
            start: "",
            end: "",
            desc: "",
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
            {type: "FETCH_RESERVATIONS_PENDING"},
            {type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data}
        ];

        store.dispatch(actions.fetchReservations());
        expect(stub.calledWith('/api/v1/planes/1/reservations')).toBe(false);
        expect(stub.calledWith('/api/v1/reservations')).toBe(true);
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fetchReservations dispatches correct actions on correct request when given plane', () => {
        promise = Promise.resolve(response);
        const expectedActions = [
            {type: "FETCH_RESERVATIONS_PENDING"},
            {type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data}
        ];
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);

        store.dispatch(actions.fetchReservations({id: 1, name: "YG5463"}));
        expect(stub.calledWith('/api/v1/planes/1/reservations')).toBe(true);
        expect(stub.calledWith('/api/v1/reservations')).toBe(false);
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('fetchMyReservations dispatches correct actions on succesful request', () => {
        promise = Promise.resolve(response);
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);
        const expectedActions = [
            {type: "FETCH_RESERVATIONS_PENDING"},
            {type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data}
        ];

        store.dispatch(actions.fetchMyReservations());
        expect(stub.calledWith('api/v1/planes/1/my_reservations')).toBe(false);
        expect(stub.calledWith('api/v1/all_my_reservations')).toBe(true);
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fetchMyReservations dispatches correct actions on correct request when given plane', () => {
        promise = Promise.resolve(response);
        const expectedActions = [
            {type: "FETCH_RESERVATIONS_PENDING"},
            {type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data}
        ];
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);

        store.dispatch(actions.fetchMyReservations({id: 1, name: "YG5463"}));
        expect(stub.calledWith('api/v1/planes/1/my_reservations')).toBe(true);
        expect(stub.calledWith('api/v1/all_my_reservations')).toBe(false);
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('submitReservation dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            {"type": "SUBMIT_RESERVATION_PENDING"},
            {"type": "SUBMIT_RESERVATION_FULFILLED"},
            {"payload": {"header": "Varaus tallennettu!", "text": ""}, "type": "SET_SUCCESS"},
            {"type": "RESET_NEW_RESERVATION"}, {"meta": {"form": "ReservationForm"}, "type": "@@redux-form/RESET"},
            {"type": "FETCH_RESERVATIONS_PENDING"}
        ];

        store.dispatch(actions.submitReservation({
            preventDefault: () => {
            }
        }, undefined, undefined, {id: 1, name: "something"}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('submitReservation dispatches correct actions on incorrect request', () => {
        const error = {response: {status: 422, data: {some: "data here"}}};
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService, 'post').callsFake(() => promise);
        const expectedActions = [
            {type: "SUBMIT_RESERVATION_PENDING"},
            {type: "SUBMIT_RESERVATION_REJECTED", payload: error.response.data}
        ];


        store.dispatch(actions.submitReservation({
            preventDefault: () => {
            }
        }));
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('destroyReservation dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            {type: "DESTROY_RESERVATION_PENDING"},
            {type: "DESTROY_RESERVATION_FULFILLED"},
            {type: "SET_SUCCESS", payload: {header: "Varaus poistettu!", text: ""}},
            {type: "FETCH_RESERVATIONS_PENDING"},
        ];

        store.dispatch(actions.destroyReservation({id: 1}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('destroyReservation dispatches correct actions on incorrect request', () => {
        const error = {response: {status: 422, data: {some: "data here"}}};
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService, 'destroy').callsFake(() => promise);
        const expectedActions = [
            {type: "DESTROY_RESERVATION_PENDING"},
            {type: "DESTROY_RESERVATION_REJECTED", payload: error.response.data}
        ];

        store.dispatch(actions.submitReservation({
            preventDefault: () => {
            }
        }));
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('massDestroyReservations dispatches correct actions on correct request', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            {type: "MASS_DESTROY_RESERVATION_PENDING"},
            {type: "MASS_DESTROY_RESERVATION_FULFILLED"},
            {type: "SET_SUCCESS", payload: {header: "Varaukset poistettu!", text: ""}},
            {type: "RESET_NEW_RESERVATION" },
            {type: "@@redux-form/RESET", meta: { form: "ReservationForm" } },
            {type: "FETCH_RESERVATIONS_PENDING"},
        ];

        store.dispatch(actions.massDestroyReservation({id: 1}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("setType dispatches correct actions", () => {
        const event = {target: {value: "great value"}};
        const expectedActions = [
            {type: "SET_TYPE", payload: event.target.value}
        ];
        store.dispatch(actions.setType(event));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setCollapsed dispatches correct actions", () => {
        const collapsed = true;
        const expectedActions = [
            {type: "SET_COLLAPSED", payload: !collapsed}
        ];
        store.dispatch(actions.setCollapsed(collapsed));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setSidebarMod dispatches correct actions", () => {
        const newSelect = false;
        const expectedActions = [
            {type: "TOGGLE_SIDEBARMOD", payload: newSelect}
        ];
        store.dispatch(actions.setSidebarMod(newSelect));
        expect(store.getActions()).toEqual(expectedActions);
    });

    describe('has function that requires dispatching', () => {
        let dispatchSpy;
        beforeAll(() => {
            dispatchSpy = sinon.spy();
        });

        afterEach(() => {
            dispatchSpy.reset();
        });


        it('setReservationStart dispatches correct actions when no reservations exist', () => {
            const start = 'some start';
            const expectedActions = [
                {type: "SET_RESERVATION_START", payload: start},
                {type: "SET_RESERVATIONS", payload: []},
            ];

            actions.setReservationStart(start, [], store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('setReservationStart dispatches correct actions when given reservations', () => {
            const start = 'some start';
            const expectedActions = [
                {type: "SET_RESERVATION_START", payload: start},
                {type: "SET_RESERVATIONS", payload: response.data},
            ];

            actions.setReservationStart(start, response.data, store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('setReservationStart dispatches correct actions when last reservation is not from db', () => {
            const start = 'some start',
                existingEnd = moment().add({days: 6, hours: 7}),
                inputReservations = [{simulated: 'reservation'}, {
                    start: moment().add({days: 6, hours: 5}).format(),
                    end: existingEnd,
                    plane: {id: 2, name: "ES1234"},
                    reservation_type: "selected"
                }],
                expectedReservations = [{simulated: 'reservation'}, {
                    start: start,
                    end: existingEnd,
                    plane: {id: 2, name: "ES1234"},
                    reservation_type: "selected"
                }];
            const expectedActions = [
                {type: "SET_RESERVATION_START", payload: start},
                {type: "SET_RESERVATIONS", payload: expectedReservations},
            ];

            actions.setReservationStart(start, inputReservations, store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('setReservationEnd dispatches correct actions when no reservations exist', () => {
            const end = 'some start';
            const expectedActions = [
                {type: "SET_RESERVATION_END", payload: end},
                {type: "SET_RESERVATIONS", payload: []},
            ];

            actions.setReservationEnd(end, [], store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('setReservationEnd dispatches correct actions when given reservations', () => {
            const end = 'some end';
            const expectedActions = [
                {type: "SET_RESERVATION_END", payload: end},
                {type: "SET_RESERVATIONS", payload: response.data},
            ];

            actions.setReservationEnd(end, response.data, store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('setReservationEnd dispatches correct actions when last reservation is not from db', () => {
            const end = 'some end',
                existingStart = moment().add({days: 6, hours: 5}).format(),
                inputReservations = [{simulated: 'reservation'}, {
                    start: existingStart,
                    end: moment().add({days: 6, hours: 7}).format(),
                    plane: {id: 2, name: "ES1234"},
                    reservation_type: "selected"
                }],
                expectedReservations = [{simulated: 'reservation'}, {
                    start: existingStart,
                    end: end,
                    plane: {id: 2, name: "ES1234"},
                    reservation_type: "selected"
                }];
            const expectedActions = [
                {type: "SET_RESERVATION_END", payload: end},
                {type: "SET_RESERVATIONS", payload: expectedReservations},
            ];

            actions.setReservationEnd(end, inputReservations, store.dispatch);
            expect(store.getActions()).toEqual(expectedActions);
        });




        it("fillForm dispatches correct actions on appropriate parameters", () => {
            const timeSlot = {
                start: moment().add(3, 'hours').format(),
                end: moment().add({hours: 4, minutes: 30}).format()
            };
            let expectedSetReservationsPayload = [];
            for (let res of response.data) {
                expectedSetReservationsPayload.push(res)
            }

            expectedSetReservationsPayload.push({
                title: '<valittu aika>',
                start: timeSlot.start,
                end: timeSlot.end,
                reservation_type: "selected"
            });

            actions.fillForm(timeSlot, response.data, true, store.dispatch);
            expect(store.getActions()).toEqual([
                { type: "SET_TIMESLOT", payload: {
                    start: timeSlot.start,
                    end: timeSlot.end
                }
                },
                { type: "SET_COLLAPSED", payload: false },
                { type: "SET_RESERVATIONS", payload: expectedSetReservationsPayload }
            ]);
        });

        it('fillForm returns original reservations if time is in the past', () => {
            const timeSlot = {
                start: moment('2016-05-05T18:00:00+03:00').format(),
                end: moment('2016-05-05T19:00:00+03:00').format(),
            };

            actions.fillForm(timeSlot, response.data, true, store.dispatch);
            expect(store.getActions()).toEqual([]);
        });
    });
});
