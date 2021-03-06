import React from 'react';
import sinon from 'sinon';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AjaxService from '../../../app/javascript/services/ajax_service';
import * as actions from '../../../app/javascript/store/actions/notifiersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notifier action', () => {
    let stub, promise, store;
    const notifier = {
            start: moment().add(1, 'days').format(),
            end: moment().add(2, 'days').format(),
            plane_id: 1,
            notifier_type: 'all',
        },
        initialState = {
            notifierMode: false,
            submitting: false,
            submitted: false,
            submitError: null,
            start: "",
            end: "",
            submitObject: {
                plane_id: undefined,
                notifier_type: 'all',
            },
        };

    beforeEach(() => {
        store = mockStore(initialState);
    });

    afterEach(() => {
        if (stub !== undefined) {
            stub.restore();
        }
        promise = undefined;
    });

    it('fetchNotifiers dispatches correct actions on succesful request', () => {
        promise = Promise.resolve({ data: [notifier] });
        stub = sinon.stub(AjaxService.service, 'get').callsFake(() => promise);
        const expectedActions = [
            { type: "FETCH_NOTIFIERS_PENDING" },
            { type: "FETCH_NOTIFIERS_FULFILLED", payload: [notifier] }
        ];

        store.dispatch(actions.fetchNotifiers());
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('selectTimeForNotifier returns original reservations if given time is in the past', () => {
        const timeSlot = {
            start: moment().subtract(2, 'days').toDate(),
            end: moment().subtract(1, 'days').toDate(),
        };
        actions.selectTimeForNotifier(timeSlot, [], store.dispatch);
        expect(store.getActions()).toEqual([])
    });

    it('selectTimeForNotifier returns new array with new notifier appended when given time is valid', () => {
        const timeSlot = {
            start: moment().add(1, 'days').toDate(),
            end: moment().add(2, 'days').toDate(),
        };
        const newArray = [
            {
                title: "<valittu aika tarkkailijalle>",
                start: timeSlot.start,
                end: timeSlot.end,
                reservation_type: 'observer'
            }
        ];

        const expectedActions = [
            { type: "SET_NOTIFIER_START", payload: timeSlot.start },
            { type: "SET_NOTIFIER_END", payload: timeSlot.end },
            { type: "SET_COLLAPSED", payload: true },
            { type: "SET_RESERVATIONS", payload: newArray },
        ];
        actions.selectTimeForNotifier(timeSlot, [], store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('selectTimeForNotifier does not put more than one event of type selected or observer into events array', () => {
        const timeSlot1 = {
                start: moment().subtract(2, 'days').toDate(),
                end: moment().subtract(1, 'days').toDate(),
            },
            timeSlot2 = {
                start: moment().add(1, 'days').toDate(),
                end: moment().add(2, 'days').toDate(),
            };
        const inputEvents = [
            {
                title: "opetus",
                start: timeSlot1.start,
                end: timeSlot1.end,
                reservation_type: 'opetus'
            },
            {
                title: "<valittu aika>",
                start: timeSlot2.start,
                end: timeSlot2.end,
                reservation_type: 'selected'
            }
        ],
            expectedNewArray = [
                {
                    title: "opetus",
                    start: timeSlot1.start,
                    end: timeSlot1.end,
                    reservation_type: 'opetus'
                },
                {
                    title: "<valittu aika tarkkailijalle>",
                    start: timeSlot2.start,
                    end: timeSlot2.end,
                    reservation_type: 'observer'
                }
            ];
        const expectedActions = [
            { type: "SET_NOTIFIER_START", payload: timeSlot2.start },
            { type: "SET_NOTIFIER_END", payload: timeSlot2.end },
            { type: "SET_COLLAPSED", payload: true },
            { type: "SET_RESERVATIONS", payload: expectedNewArray },
        ];

        actions.selectTimeForNotifier(timeSlot2, inputEvents, store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('submitNotifier dispatches correct actions on successful save', () => {
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_NOTIFIER_PENDING" },
            { type: "SUBMIT_NOTIFIER_FULFILLED" },
            { type: "RESET_NOTIFIER" },
            { type: "SET_SUCCESS", payload: { header: "Tarkkailija luotu!", text: ""} },
            { type: "FETCH_RESERVATIONS_PENDING" }
        ];

        store.dispatch(actions.submitNotifier({preventDefault: () => {}}, notifier));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("setNotifierMode dispatches correct actions", () => {
        const expectedActions = [
            { type: "SET_NOTIFIER_MODE" }
        ];
        store.dispatch(actions.setNotifierMode());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setStart dispatches correct actions", () => {
        const start = "dummy-date";
        const expectedActions = [
            { type: "SET_NOTIFIER_START", payload: start }
        ];

        store.dispatch(actions.setStart(start));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setEnd dispatches correct actions", () => {
        const end = "dummy-date";
        const expectedActions = [
            { type: "SET_NOTIFIER_END", payload: end }
        ];

        store.dispatch(actions.setEnd(end));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setNotifierType dispatches correct actions", () => {
        const type = "type here. either 'all' or 'any'";
        const expectedActions = [
            { type: "SET_NOTIFIER_TYPE", payload: type }
        ];

        store.dispatch(actions.setNotifierType(type));
        expect(store.getActions()).toEqual(expectedActions);
    });
});