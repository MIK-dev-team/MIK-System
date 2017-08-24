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
                plane: { id: 2, name: "ES1234" },
                reservation_type: "opetus"
            },
            {
                id: 2,
                start: moment().add({days: 4, hours: 2}).format(),
                end: moment().add({days: 4, hours: 3, minutes: 30}).format(),
                plane: { id: 1, name: "YG5463" },
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
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
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
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
        ];
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);

        store.dispatch(actions.fetchReservations({ id: 1, name: "YG5463" }));
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
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
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
            { type: "FETCH_RESERVATIONS_PENDING" },
            { type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data }
        ];
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);

        store.dispatch(actions.fetchMyReservations({ id: 1, name: "YG5463" }));
        expect(stub.calledWith('api/v1/planes/1/my_reservations')).toBe(true);
        expect(stub.calledWith('api/v1/all_my_reservations')).toBe(false);
        return promise.then(() => {
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
                <td>
                    <Button onClick={() => sinon.stub()} bsStyle="danger" bsSize="small">
                        Poista
                    </Button>
                </td>
            </tr>)
        );

        expect(JSON.stringify(returnedValue)).toEqual(JSON.stringify(expectedValue));
    });

    it('submitReservation dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_RESERVATION_PENDING" },
            { type: "SUBMIT_RESERVATION_FULFILLED" },
            { type: "RESET_NEW_RESERVATION" },
            { type: "SET_SUCCESS", payload: { header: "Varaus tallennettu!", text: "" } },
            { type: "FETCH_RESERVATIONS_PENDING" }
        ];

        store.dispatch(actions.submitReservation({preventDefault: () => {}}, undefined, undefined, { id: 1, name: "something" }));
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

    it('destroyReservation dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "DESTROY_RESERVATION_PENDING" },
            { type: "DESTROY_RESERVATION_FULFILLED" },
            { type: "SET_SUCCESS", payload: { header: "Varaus poistettu!", text: "" } },
            { type: "FETCH_RESERVATIONS_PENDING" },
        ];

        store.dispatch(actions.destroyReservation({ id: 1 }));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('destroyReservation dispatches correct actions on incorrect request', () => {
        const error = {response: {status: 422, data: {some: "data here"}}};
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService, 'destroy').callsFake(() => promise);
        const expectedActions = [
            { type: "DESTROY_RESERVATION_PENDING" },
            { type: "DESTROY_RESERVATION_REJECTED", payload: error.response.data }
        ];

        store.dispatch(actions.submitReservation({preventDefault: () => {}}));
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
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
    });

    it('setReservationStart dispatches correct actions when no reservations exist', () => {
        const start = 'some start';
        const expectedActions = [
            { type: "SET_RESERVATION_START", payload: start },
            { type: "SET_RESERVATIONS", payload: [] },
        ];

        store.dispatch(actions.setReservationStart(start, []));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setReservationStart dispatches correct actions when given reservations', () => {
        const start = 'some start';
        const expectedActions = [
            { type: "SET_RESERVATION_START", payload: start },
            { type: "SET_RESERVATIONS", payload: response.data },
        ];

        store.dispatch(actions.setReservationStart(start, response.data));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setReservationStart dispatches correct actions when last reservation is not from db', () => {
        const start = 'some start',
            existingEnd = moment().add({days: 6, hours: 7}),
            inputReservations = [{simulated: 'reservation'}, {
                start: moment().add({days: 6, hours: 5}).format(),
                end: existingEnd,
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedReservations = [{simulated: 'reservation'}, {
                start: start,
                end: existingEnd,
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }];
        const expectedActions = [
            { type: "SET_RESERVATION_START", payload: start },
            { type: "SET_RESERVATIONS", payload: expectedReservations },
        ];

        store.dispatch(actions.setReservationStart(start, inputReservations));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setReservationEnd dispatches correct actions when no reservations exist', () => {
        const end = 'some start';
        const expectedActions = [
            { type: "SET_RESERVATION_END", payload: end },
            { type: "SET_RESERVATIONS", payload: [] },
        ];

        store.dispatch(actions.setReservationEnd(end, []));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setReservationEnd dispatches correct actions when given reservations', () => {
        const end = 'some end';
        const expectedActions = [
            { type: "SET_RESERVATION_END", payload: end },
            { type: "SET_RESERVATIONS", payload: response.data },
        ];

        store.dispatch(actions.setReservationEnd(end, response.data));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setReservationEnd dispatches correct actions when last reservation is not from db', () => {
        const end = 'some end',
            existingStart = moment().add({days: 6, hours: 5}).format(),
            inputReservations = [{simulated: 'reservation'}, {
                start: existingStart,
                end: moment().add({days: 6, hours: 7}).format(),
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedReservations = [{simulated: 'reservation'}, {
                start: existingStart,
                end: end,
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }];
        const expectedActions = [
            { type: "SET_RESERVATION_END", payload: end },
            { type: "SET_RESERVATIONS", payload: expectedReservations },
        ];

        store.dispatch(actions.setReservationEnd(end, inputReservations));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeStartTime dispatches correct actions when no reservations exist', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            expectedActions = [
            { type: "SET_RESERVATION_START", payload: expectedNewDateTime },
            { type: "SET_RESERVATIONS", payload: [] },
        ];

        store.dispatch(actions.changeStartTime(newTimeInSeconds, previousTime, []));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeStartTime dispatches correct actions when given reservations', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            expectedActions = [
                { type: "SET_RESERVATION_START", payload: expectedNewDateTime },
                { type: "SET_RESERVATIONS", payload: response.data },
            ];

        store.dispatch(actions.changeStartTime(newTimeInSeconds, previousTime, response.data));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeStartTime dispatches correct actions when last reservation is not from db', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            inputReservations = [{simulated: 'reservation'}, {
                start: moment().add({days: 6, hours: 5}).format(),
                end: moment().add({days: 6, hours: 7}).format(),
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedReservations = [{simulated: 'reservation'}, {
                start: expectedNewDateTime,
                end: moment().add({days: 6, hours: 7}).format(),
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedActions = [
                { type: "SET_RESERVATION_START", payload: expectedNewDateTime },
                { type: "SET_RESERVATIONS", payload: expectedReservations },
            ];

        store.dispatch(actions.changeStartTime(newTimeInSeconds, previousTime, inputReservations));
        expect(store.getActions()).toEqual(expectedActions);
    });



    it('changeEndTime dispatches correct actions when no reservations exist', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            expectedActions = [
                { type: "SET_RESERVATION_END", payload: expectedNewDateTime },
                { type: "SET_RESERVATIONS", payload: [] },
            ];

        store.dispatch(actions.changeEndTime(newTimeInSeconds, previousTime, []));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeEndTime dispatches correct actions when given reservations', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            expectedActions = [
                { type: "SET_RESERVATION_END", payload: expectedNewDateTime },
                { type: "SET_RESERVATIONS", payload: response.data },
            ];

        store.dispatch(actions.changeEndTime(newTimeInSeconds, previousTime, response.data));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeEndTime dispatches correct actions when last reservation is not from db', () => {
        const newTimeInSeconds = 60,
            previousTime = moment().add({days: 6, hours: 5}).format();
        const expectedNewDateTime = moment(previousTime).startOf('day').add(newTimeInSeconds, 'seconds'),
            inputReservations = [{simulated: 'reservation'}, {
                start: moment().add({days: 6, hours: 5}).format(),
                end: moment().add({days: 6, hours: 7}).format(),
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedReservations = [{simulated: 'reservation'}, {
                start: moment().add({days: 6, hours: 5}).format(),
                end: expectedNewDateTime,
                plane: { id: 2, name: "ES1234" },
                reservation_type: "selected"
            }],
            expectedActions = [
                { type: "SET_RESERVATION_END", payload: expectedNewDateTime },
                { type: "SET_RESERVATIONS", payload: expectedReservations },
            ];

        store.dispatch(actions.changeEndTime(newTimeInSeconds, previousTime, inputReservations));
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

        store.dispatch(actions.fillForm(timeSlot, response.data));
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

        let result = actions.fillForm(timeSlot, response.data);
        expect(result).toEqual(response.data);
    });

    // TODO: these tests have to be fixed

    // it('fillForm returns original reservations if end of time slot is inside a reserved time', () => {
    //     const timeSlot = {
    //         start: moment().add({days: 5, hours: 3}).toDate(),
    //         end: moment().add({days: 5, hours: 6}).toDate(),
    //     };
    //
    //     let result = actions.fillForm(timeSlot, response.data);
    //     expect(result).toEqual(response.data);
    // });
    //
    //
    // it('fillForm returns original reservations if start of time slot is inside a reserved time', () => {
    //     const timeSlot = {
    //         start: moment().add({days: 5, hours: 5, minutes: 30}).toDate(),
    //         end: moment().add({days: 5, hours: 10}).toDate(),
    //     };
    //
    //     let result = actions.fillForm(timeSlot, response.data);
    //     expect(result).toEqual(response.data);
    // });
    //
    // it('fillForm returns original reservations if time slot completely covers a reserved time', () => {
    //     const timeSlot = {
    //         start: moment().add({days: 5, hours: 4}).toDate(),
    //         end: moment().add({days: 5, hours: 10}).toDate(),
    //     };
    //
    //     let result = actions.fillForm(timeSlot, response.data);
    //     expect(result).toEqual(response.data);
    // });
    //
    // it('fillForm returns original reservations when trying to reserve an existing time', () => {
    //     const timeSlot = {
    //         start: moment().add({days: 5, hours: 5}).toDate(),
    //         end: moment().add({days: 5, hours: 7}).toDate(),
    //     };
    //
    //     let result = actions.fillForm(timeSlot, response.data);
    //     expect(result).toEqual(response.data);
    // });
});
