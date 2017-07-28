const initialState = {
    notifierMode: false,
    submitting: false,
    submitted: false,
    submitError: null,
    start: undefined,
    end: undefined,
};

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case "SET_NOTIFIER_MODE": {
            return {...state, notifierMode: !state.notifierMode}
        }
        case "RESET_NOTIFIER": {
            return {...initialState}
        }


        case "SUBMIT_NOTIFIER_PENDING": {
            return {...state, submitting: true}
        }
        case "SUBMIT_NOTIFIER_REJECTED": {
            return {...state, submitting: false, submitError: action.payload}
        }
        case "SUBMIT_NOTIFIER_FULFILLED": {
            return {...state, submitting: false, submitted: true}
        }
    }

    return state;
}