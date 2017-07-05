/**
 * Created by owlaukka on 30/06/17.
 */
import reducer from '../../../app/javascript/store/reducers/applicationsReducer';

const initialState = {
    membershipTypes: [
        {name: 'Täysjäsen'},
        {name: 'Nuorisojäsen (alle 18v)'},
        {name: 'Kannatusjäsen'}
    ],
    sending: false,
    sent: false,
    successMsg: null,
    submitError: null,

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

    submitObject: {}
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
        ).toEqual({...initialState, sending: false, submitError: payload})
    });

    it('should handle SUBMIT_APPLICATION_FULFILLED correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_APPLICATION_FULFILLED", payload: "Success!!"})
        ).toEqual({...initialState, sending: false, sent: true, successMsg: "Success!!"})
    });

    it('should handle SET_USERNAME correctly', () => {
        const username = "minasinahan"
        expect(
            reducer(undefined, {type: "SET_USERNAME", payload: username})
        ).toEqual({
            ...initialState,
            username: username,
            submitObject: {
                ...initialState.submitError,
                username: username
            }}
        )
    })

    it('should handle SET_EMAIL correctly', () => {
        const email = "email@emaili.co"
        expect(
            reducer(undefined, {type: "SET_EMAIL", payload: email})
        ).toEqual({
            ...initialState,
            email: email,
            submitObject: {
                ...initialState.submitError,
                email: email
            }}
        )
    });

    it('should handle SET_REPEAT_EMAIL correctly', () => {
        const repeatEmail = "email@emaili.co"
        expect(
            reducer(undefined, {type: "SET_REPEAT_EMAIL", payload: repeatEmail})
        ).toEqual({
            ...initialState,
            repeatEmail: repeatEmail,
            submitObject: {
                ...initialState.submitError
            }}
        )
    });

    it('should handle SET_BIRTHDAY correctly', () => {
        const birthday = "15.12.1989";
        expect(
            reducer(undefined, {type: "SET_BIRTHDAY", payload: birthday})
        ).toEqual({
            ...initialState,
            birthday: birthday,
            submitObject: {
                ...initialState.submitError,
                birthday: birthday
            }}
        )
    });

    it('should handle SET_MEMBER_TYPE correctly', () => {
        const member_type = "paras jäsen";
        expect(
            reducer(undefined, {type: "SET_MEMBER_TYPE", payload: member_type})
        ).toEqual({
            ...initialState,
            member_type: member_type,
            submitObject: {
                ...initialState.submitError,
                member_type: member_type
            }}
        )
    });

    it('should handle SET_FULL_NAME correctly', () => {
        const full_name = "Jeesseee Kulma";
        expect(
            reducer(undefined, {type: "SET_FULL_NAME", payload: full_name})
        ).toEqual({
            ...initialState,
            full_name: full_name,
            submitObject: {
                ...initialState.submitError,
                full_name: full_name
            }}
        )
    });

    it('should handle SET_ADDRESS correctly', () => {
        const address = "Tamakatu tällä kohdalla";
        expect(
            reducer(undefined, {type: "SET_ADDRESS", payload: address})
        ).toEqual({
            ...initialState,
            address: address,
            submitObject: {
                ...initialState.submitError,
                address: address
            }}
        )
    });

    it('should handle SET_POSTAL_CODE correctly', () => {
        const postal_code = "Tamakatu tällä kohdalla";
        expect(
            reducer(undefined, {type: "SET_POSTAL_CODE", payload: postal_code})
        ).toEqual({
            ...initialState,
            postal_code: postal_code,
            submitObject: {
                ...initialState.submitError,
                postal_code: postal_code
            }}
        )
    });

    it('should handle SET_CITY correctly', () => {
        const city = "Helsinki";
        expect(
            reducer(undefined, {type: "SET_CITY", payload: city})
        ).toEqual({
            ...initialState,
            city: city,
            submitObject: {
                ...initialState.submitError,
                city: city
            }}
        )
    });

    it('should handle SET_PHONE_NUMBER correctly', () => {
        const number = "123456";
        expect(
            reducer(undefined, {type: "SET_PHONE_NUMBER", payload: number})
        ).toEqual({
            ...initialState,
            phone: number,
            submitObject: {
                ...initialState.submitError,
                phone: number
            }}
        )
    });

    it('should handle SET_LICENCES correctly', () => {
        const licences = "monia hassuja lupia";
        expect(
            reducer(undefined, {type: "SET_LICENCES", payload: licences})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                licences: licences
            }}
        )
    });

    it('should handle SET_ENGINE_EXP correctly', () => {
        const engine_exp = 12;
        expect(
            reducer(undefined, {type: "SET_ENGINE_EXP", payload: engine_exp})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                experience_with_engine: engine_exp
            }}
        )
    });

    it('should handle SET_OTHER_EXP correctly', () => {
        const other_exp = "vähän muutakin kokemusta";
        expect(
            reducer(undefined, {type: "SET_OTHER_EXP", payload: other_exp})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                other_experience: other_exp
            }}
        )
    });

    it('should handle SET_OTHER_MEMBERSHIPS correctly', () => {
        const other_memberships = "monia hassuja jäsenyyksiä";
        expect(
            reducer(undefined, {type: "SET_OTHER_MEMBERSHIPS", payload: other_memberships})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                other_memberships: other_memberships
            }}
        )
    });

    it('should handle SET_SIL_MEMBERSHIP correctly', () => {
        const sil_membership = "Haluan liittyä";
        expect(
            reducer(undefined, {type: "SET_SIL_MEMBERSHIP", payload: sil_membership})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                join_sil: sil_membership
            }}
        )
    });

    it('should handle SET_SIL_NUMBER correctly', () => {
        const sil_number = 123456;
        expect(
            reducer(undefined, {type: "SET_SIL_NUMBER", payload: sil_number})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                sil_membership_number: sil_number
            }}
        )
    });

    it('should handle SET_ADDITIONAL_INFO correctly', () => {
        const extra_info = "Lorem ipsum jne....";
        expect(
            reducer(undefined, {type: "SET_ADDITIONAL_INFO", payload: extra_info})
        ).toEqual({
            ...initialState,
            submitObject: {
                ...initialState.submitError,
                extra_information: extra_info
            }}
        )
    });
});