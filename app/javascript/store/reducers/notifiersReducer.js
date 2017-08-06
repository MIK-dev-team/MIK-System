const initialState = {
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

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case "SET_NOTIFIER_MODE": {
            return {...state, notifierMode: !state.notifierMode}
        }
        case "SET_NOTIFIER_START": {
            return {
                ...state,
                start: action.payload,
                submitObject: {
                    ...state.submitObject,
                    start: action.payload,
                }
            }
        }
        case "SET_NOTIFIER_END": {
            return {
                ...state,
                end: action.payload,
                submitObject: {
                    ...state.submitObject,
                    end: action.payload,
                }
            }
        }
        case "SET_NOTIFIER_PLANE": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    plane_id: action.payload.id,
                }
            }
        }
        case "SET_NOTIFIER_TYPE": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    notifier_type: action.payload,
                }
            }
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