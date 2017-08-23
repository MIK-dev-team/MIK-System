import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as actions from '../../../app/javascript/store/actions/singleReservationActions';
import AjaxService from '../../../app/javascript/services/ajax_service';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Single reservation action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            sending: false,
            sent: false,
            updateError: null,

            showModal: false,
            reservation: null,
        });
    });


    it("showModal dispatches correct actions", () => {
        const res = { id:1, name: "test reservation" };
        const expectedActions = [
            { type: "SHOW_MODAL", payload: res }
        ];
        store.dispatch(actions.showModal(res));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("hideModal dispatches correct actions", () => {
        const expectedActions = [
            { type: "HIDE_MODAL" }
        ];
        store.dispatch(actions.hideModal());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setReservation dispatches correct actions", () => {
        const res = { id:1, name: "test reservation" };
        const expectedActions = [
            { type: "SET_RESERVATION", payload: res }
        ];
        store.dispatch(actions.setReservation(res));
        expect(store.getActions()).toEqual(expectedActions);
    });

    describe('using ajax', () => {
        let promise, stub;

        afterEach(() => {
            stub.restore();
            promise = undefined;
        });

        it('saveChangesToReservation dispatches correct actions on successful update', () => {
            promise = Promise.resolve({something: 'here'});
            stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
            const timeoutStub = sinon.stub(window, 'setTimeout'),
                scrollToSpy = sinon.spy(window, 'scrollTo');

            const expectedActions = [
                { type: "UPDATE_RESERVATION_PENDING" },
                { type: "SET_SUCCESS", payload: { header: 'Varaus muokattu!', text: 'Varauksen uudet tiedot onnistuneesti tallennettu tietokantaan' }},
                { type: "UPDATE_RESERVATION_FULFILLED" }
            ];

            store.dispatch(actions.saveChangesToReservation({something: 'cool'}));
            return promise.then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(timeoutStub.calledOnce).toBe(true);
                expect(timeoutStub.calledWith(5000));
                expect(scrollToSpy.calledWithExactly(0, 0)).toBe(true);
                timeoutStub.restore();
                scrollToSpy.restore();
            });
        });

        it('saveChangesToReservation dispatches correct actions with correct parameters on successful update', () => {
            promise = Promise.resolve({something: 'here'});
            stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);

            store.dispatch(actions.saveChangesToReservation({id: 1, plane: 2, something: 'cool'}));
            expect(stub.calledWithExactly({
                method: 'PATCH',
                url: '/api/v1/reservations/1',
                responseType: 'json',
                data: { id:1,  something: 'cool', plane: 2, plane_id: 2 } })
            ).toBe(true)
        });

        it('saveChangesToReservation dispatches correct actions on incorrect request', () => {
            const error = {response: {status: 422}};
            const expectedActions = [
                { type: "UPDATE_RESERVATION_PENDING" },
                { type: "UPDATE_RESERVATION_REJECTED", payload: error }
            ];
            promise = Promise.resolve(error);
            stub = sinon.stub(AjaxService.service, 'request').rejects(error);

            store.dispatch(actions.saveChangesToReservation({id: 1, plane: 2, something: 'cool'}));
            return promise.catch(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('destroyReservationAndRedirect dispatches correct actions on successful update', () => {
            promise = Promise.resolve({something: 'here'});
            stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
            const timeoutStub = sinon.stub(window, 'setTimeout')

            const expectedActions = [
                { type: "DESTROY_RESERVATION_PENDING" },
                { type: "SET_SUCCESS", payload: {"header": "Varaus poistettu!", "text": ""}},
                { type: "DESTROY_RESERVATION_FULFILLED" }
            ];

            store.dispatch(actions.destroyReservationAndRedirect({something: 'cool'}, '/varaukset'));
            return promise.then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(timeoutStub.calledOnce).toBe(true);
                expect(timeoutStub.calledWith(5000));
                timeoutStub.restore();
            });
        });

        it('destroyReservationAndRedirect dispatches correct actions with correct parameters on successful update', () => {
            promise = Promise.resolve({something: 'here'});
            stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);

            store.dispatch(actions.destroyReservationAndRedirect({id: 1, plane: 2, something: 'cool'}));
            expect(stub.calledWithExactly({
                method: 'DELETE',
                url: '/api/v1/reservations/1',
                responseType: 'json' })
            ).toBe(true)
        });

        it('destroyReservationAndRedirect dispatches correct actions on incorrect request', () => {
            const error = {response: {status: 422, data: {}}};
            const expectedActions = [
                { type: "DESTROY_RESERVATION_PENDING" },
                { type: "DESTROY_RESERVATION_REJECTED", payload: error }
            ];
            promise = Promise.resolve(error);
            stub = sinon.stub(AjaxService.service, 'request').rejects(error);

            store.dispatch(actions.destroyReservationAndRedirect({id: 1, plane: 2, something: 'cool'}));
            return promise.catch(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });


});