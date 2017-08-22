import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AjaxService from '../../../app/javascript/services/ajax_service';
import * as actions from '../../../app/javascript/store/actions/loginActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginActions', () => {
    let stub, promise, store;
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

    it('logOutAndRedirect dispatches correct actions on successful logout', () => {
        promise = Promise.resolve({something: 'here'});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const timeoutStub = sinon.stub(window, 'setTimeout');

        const expectedActions = [
            { type: "SET_SUCCESS", payload: { header: 'Olet kirjautunut ulos', text: '' } },
            { type: "SET_LOGGED_IN", payload: false }
        ];

        store.dispatch(actions.logOutAndRedirect());
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(timeoutStub.calledOnce).toBe(true);
            console.log('FIRST')
            expect(timeoutStub.calledWith(5000));
            timeoutStub.restore();
        });
    });

    it('logOutAndRedirect dispatches correct actions with correct parameters on successful update', () => {
        promise = Promise.resolve({something: 'here'});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);

        store.dispatch(actions.logOutAndRedirect());
        expect(stub.calledWithExactly({
            method: 'DELETE',
            url: '/api/v1/logout',
            responseType: 'json' })
        ).toBe(true)
    });
});