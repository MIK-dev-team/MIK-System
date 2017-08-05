import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../app/javascript/store/actions/planesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Plane action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            planes: [],
            selectedPlane: undefined,
        });
    });


    it("setPlanes dispatches correct actions", () => {
        const planes = [{ id:1, name: "test plane" }];
        const expectedActions = [
            { type: "SET_PLANES", payload: planes }
        ];
        store.dispatch(actions.setPlanes(planes));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("selectPlane dispatches correct actions", () => {
        const selectedPlane = { id:1, name: "test plane" };
        const expectedActions = [
            { type: "SELECT_PLANE", payload: selectedPlane }
        ];
        store.dispatch(actions.selectPlane(selectedPlane));
        expect(store.getActions()).toEqual(expectedActions);
    });
});