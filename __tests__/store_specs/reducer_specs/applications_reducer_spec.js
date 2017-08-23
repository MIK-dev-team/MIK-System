/**
 * Created by owlaukka on 30/06/17.
 */
import reducer from '../../../app/javascript/store/reducers/applicationsReducer';

const initialState = {
    membershipTypes: [
        { id: 'Täysjäsen', name: 'Täysjäsen' },
        { id: 'Nuorisojäsen (alle 18v)', name: 'Nuorisojäsen (alle 18v)' },
        { id: 'Kannatusjäsen', name: 'Kannatusjäsen' }
    ],
    sending: false,
    sent: false,
};

describe('Applications Reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SUBMIT_APPLICATION_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_APPLICATION_PENDING"})
        ).toEqual({...initialState, sending: true})
    });

    it('should handle SUBMIT_APPLICATION_REJECTED correctly', () => {
        const payload = {some: "error", msg: "here"}
        expect(
            reducer(undefined, {type: "SUBMIT_APPLICATION_REJECTED", payload: payload})
        ).toEqual({...initialState, sending: false})
    });

    it('should handle SUBMIT_APPLICATION_FULFILLED correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_APPLICATION_FULFILLED"})
        ).toEqual({...initialState, sending: false, sent: true})
    });
});