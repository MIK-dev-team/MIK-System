/**
 * Created by owlaukka on 30/06/17.
 */
const membershipTypes = [
    { id: 'Täysjäsen', name: 'Täysjäsen' },
    { id: 'Nuorisojäsen (alle 18v)', name: 'Nuorisojäsen (alle 18v)' },
    { id: 'Kannatusjäsen', name: 'Kannatusjäsen' }
];

export default function reducer(state = {
    membershipTypes: membershipTypes,
    sending: false,
    sent: false,
}, action) {

    switch(action.type) {
        case "SUBMIT_APPLICATION_PENDING": {
            return {...state, sending: true}
        }
        case "SUBMIT_APPLICATION_REJECTED": {
            return {...state, sending: false}
        }
        case "SUBMIT_APPLICATION_FULFILLED": {
            return {
                ...state,
                sending: false,
                sent: true,
            }
        }
    }

    return state;
}