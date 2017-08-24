/**
 * Created by owlaukka on 30/06/17.
 */
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AjaxService from '../../../app/javascript/services/ajax_service';

import * as actions from '../../../app/javascript/store/actions/applicationActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStoreState = {
    membershipTypes: [
        { id: 'Täysjäsen', name: 'Täysjäsen' },
        { id: 'Nuorisojäsen (alle 18v)', name: 'Nuorisojäsen (alle 18v)' },
        { id: 'Kannatusjäsen', name: 'Kannatusjäsen' }
    ],
    sending: false,
    sent: false,
};

describe('Application Actions', () => {
    let stub, promise, store;

    beforeEach(() => {
        store = mockStore(initialStoreState);
    });

    afterEach(() => {
        stub.restore();
        promise = undefined;
    });


    it('submitApplication dispatches correct actions on successful save', () => {
        const values = {
            username: "asdfasdf",
            email: "asdf@asdf.fi",
            repeat_email: "asdf@asdf.fi",
            birthday: "12.12.1980",
            full_name: "Hermo Menee",
            address: "Jokutie 30 A 4",
            postal_code: 12345,
            city: "Yli-Ii",
        };
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_APPLICATION_PENDING" },
            { type: "SUBMIT_APPLICATION_FULFILLED" },
            { type: "SET_SUCCESS", payload: {header: "Hakemuksenne on lähetetty onnistuneesti.", text: "Vahvistussähköposti on lähetetty antamaanne sähköpostiosoitteeseen. Teidät uudelleenohjataan etusivulle piakkoin" } }
        ];

        store.dispatch(actions.submitMembershipApp(values));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // TODO: can't get failing requests to run...
});