/**
 * Created by owlaukka on 30/06/17.
 */
const membershipTypes = [
    {id: 1, name: 'Täysjäsen'},
    {id: 2, name: 'Nuorisojäsen (alle 18v)'},
    {id: 3, name: 'Kannatusjäsen'}
];

export default function reducer(state = {
    membershipTypes: membershipTypes,
    sending: false,
    sent: false,
    successMsg: null,
    submitError: null,

    // Mandatory fields (for validations)
    username: "",
    email: "",
    repeatEmail: "",
    birthday: "",
    member_type: "",
    full_name: "",
    address: "",
    phone: "",
    postal_code: "",
    city: "",

    // Object that will be used for submitting
    submitObject: {}

}, action) {

    switch(action.type) {
        case "SUBMIT_APPLICATION_PENDING": {
            return {...state, sending: true}
        }
        case "SUBMIT_APPLICATION_REJECTED": {
            return {...state, sending: false, submitError: action.payload}
        }
        case "SUBMIT_APPLICATION_FULFILLED": {
            return {
                ...state,
                sending: false,
                sent: true,
                successMsg: action.payload,
            }
        }

        case "SET_USERNAME": {
            return {
                ...state,
                username: action.payload,
                submitObject: {
                    ...state.submitObject,
                    username: action.payload
                }
            };
        }
        case "SET_EMAIL": {
            return {
                ...state,
                email: action.payload,
                submitObject: {
                    ...state.submitObject,
                    email: action.payload
                }
            }
        }
        case "SET_REPEAT_EMAIL": {
            return {
                ...state,
                repeatEmail: action.payload,
                submitObject: {
                    ...state.submitObject,
                }
            }
        }
        case "SET_BIRTHDAY": {
            return {
                ...state,
                birthday: action.payload,
                submitObject: {
                    ...state.submitObject,
                    birthday: action.payload
                }
            }
        }
        case "SET_MEMBER_TYPE": {
            return {
                ...state,
                member_type: action.payload,
                submitObject: {
                    ...state.submitObject,
                    member_type: action.payload
                }
            }
        }
        case "SET_FULL_NAME": {
            return {
                ...state,
                full_name: action.payload,
                submitObject: {
                    ...state.submitObject,
                    full_name: action.payload
                }
            }
        }
        case "SET_ADDRESS": {
            return {
                ...state,
                address: action.payload,
                submitObject: {
                    ...state.submitObject,
                    address: action.payload
                }
            }
        }
        case "SET_POSTAL_CODE": {
            return {
                ...state,
                postal_code: action.payload,
                submitObject: {
                    ...state.submitObject,
                    postal_code: action.payload
                }
            }
        }
        case "SET_CITY": {
            return {
                ...state,
                city: action.payload,
                submitObject: {
                    ...state.submitObject,
                    city: action.payload
                }
            }
        }
        case "SET_PHONE_NUMBER": {
            return {
                ...state,
                phone: action.payload,
                submitObject: {
                    ...state.submitObject,
                    phone: action.payload
                }
            }
        }
        case "SET_LICENCES": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    licences: action.payload
                }
            }
        }
        case "SET_ENGINE_EXP": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    experience_with_engine: action.payload
                }
            }
        }
        case "SET_OTHER_EXP": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    other_experience: action.payload
                }
            }
        }
        case "SET_OTHER_MEMBERSHIPS": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    other_memberships: action.payload
                }
            }
        }
        case "SET_SIL_MEMBERSHIP": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    join_sil: action.payload
                }
            }
        }
        case "SET_SIL_NUMBER": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    sil_membership_number: action.payload
                }
            }
        }
        case "SET_ADDITIONAL_INFO": {
            return {
                ...state,
                submitObject: {
                    ...state.submitObject,
                    extra_information: action.payload
                }
            }
        }
        case "SET_SUCCESS_MSG": {
            return {
                ...state,
                successMsg: action.payload
            }
        }
        case "RESET_ERROR_MSG": {
            return {
                ...state,
                submitError: null
            }
        }
    }

    return state;
}