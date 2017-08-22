import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../app/javascript/store/actions/notificationsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notification action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            errorMsg: null,
            successMsg: null,
            infoMsg: null,
        });
    });


    it("resetNotifications dispatches correct actions", () => {
        const expectedActions = [
            { type: "RESET_NOTIFICATIONS" }
        ];
        store.dispatch(actions.resetNotifications());
        expect(store.getActions()).toEqual(expectedActions);
    });
});