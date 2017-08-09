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
        {id: 1, name: 'Täysjäsen'},
        {id: 2, name: 'Nuorisojäsen (alle 18v)'},
        {id: 3, name: 'Kannatusjäsen'}
    ],
    sending: false,
    sent: false,
    submitError: null,

    username: "",
    email: "",
    birthday: "",
    member_type: "",
    full_name: "",
    address: "",
    phone: "",
    postal_code: "",
    city: "",

    submitObject: {}
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
        const submitObject = {
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
            { type: "RESET_ERROR_MSG" },
            { type: "SUBMIT_APPLICATION_PENDING" },
            { type: "SUBMIT_APPLICATION_FULFILLED", payload: "Hakemuksenne on lähetetty onnistuneesti." },
            { type: "SET_SUCCESS", payload: {header: "Hakemuksenne on lähetetty onnistuneesti.", text: "Vahvistussähköposti on lähetetty antamaanne sähköpostiosoitteeseen. Teidät uudelleenohjataan etusivulle piakkoin" } }
        ];

        store.dispatch(actions.submitApplication(submitObject, submitObject.repeat_email, {preventDefault: () => {}}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('submitApplication dispatches correct actions on incorrect request', () => {
        const submitObject = {
            username: "asdfasdf"
        };
        const error = {response: {status: 422, data: {some: "data here"}}};
        promise = Promise.resolve(error);
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "SUBMIT_APPLICATION_PENDING" },
            { type: "SUBMIT_APPLICATION_REJECTED", payload: error.response.data }
        ];


        store.dispatch(actions.submitApplication(submitObject, null, {preventDefault: () => {}}));
        return promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('submitApplication dispatches correct actions when submitted object is not valid', () => {
        const submitObject = {
            username: "wrong"
        };
        promise = Promise.resolve({});
        stub = sinon.stub(AjaxService.service, 'request').callsFake(() => promise);
        const expectedActions = [
            { type: "RESET_ERROR_MSG" },
            { type: "SUBMIT_APPLICATION_REJECTED", payload: ["Tarkasta täyttämäsi kentät"] },
            { type: "SET_ERROR", payload: { header: "Tarkista täyttämäsi kentät", data: [] } },
        ];

        store.dispatch(actions.submitApplication(submitObject, null, {preventDefault: () => {}}));
        return promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("setUsername dispatches correct actions", () => {
        const username = "username";
        const expectedActions = [
            { type: "SET_USERNAME", payload: username }
        ];
        store.dispatch(actions.setUsername(username));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setEmail dispatches correct actions", () => {
        const email = "asdf@asdf.fi";
        const expectedActions = [
            { type: "SET_EMAIL", payload: email }
        ];
        store.dispatch(actions.setEmail(email));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setBirthday dispatches correct actions", () => {
        const birthday = "12.12.12";
        const expectedActions = [
            { type: "SET_BIRTHDAY", payload: birthday }
        ];
        store.dispatch(actions.setBirthday(birthday));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setMemberType dispatches correct actions", () => {
        const member_type = "asdf@asdf.fi";
        const expectedActions = [
            { type: "SET_MEMBER_TYPE", payload: member_type }
        ];
        store.dispatch(actions.setMemberType(member_type));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setFullName dispatches correct actions", () => {
        const full_name = "My Name";
        const expectedActions = [
            { type: "SET_FULL_NAME", payload: full_name }
        ];
        store.dispatch(actions.setFullName(full_name));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setAddress dispatches correct actions", () => {
        const address = "some kinda address 12";
        const expectedActions = [
            { type: "SET_ADDRESS", payload: address }
        ];
        store.dispatch(actions.setAddress(address));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setPostalCode dispatches correct actions", () => {
        const postal_code = 12345;
        const expectedActions = [
            { type: "SET_POSTAL_CODE", payload: postal_code }
        ];
        store.dispatch(actions.setPostalCode(postal_code));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setCity dispatches correct actions", () => {
        const city = "Helsinki";
        const expectedActions = [
            { type: "SET_CITY", payload: city }
        ];
        store.dispatch(actions.setCity(city));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setPhoneNumber dispatches correct actions", () => {
        const number = "123456";
        const expectedActions = [
            { type: "SET_PHONE_NUMBER", payload: number }
        ];
        store.dispatch(actions.setPhoneNumber(number));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setLicences dispatches correct actions", () => {
        const licences = "some licences";
        const expectedActions = [
            { type: "SET_LICENCES", payload: licences }
        ];
        store.dispatch(actions.setLicences(licences));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setEngineExp dispatches correct actions", () => {
        const exp = 12;
        const expectedActions = [
            { type: "SET_ENGINE_EXP", payload: exp }
        ];
        store.dispatch(actions.setEngineExp(exp));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setOtherExperience dispatches correct actions", () => {
        const exp = "some other exp";
        const expectedActions = [
            { type: "SET_OTHER_EXP", payload: exp }
        ];
        store.dispatch(actions.setOtherExp(exp));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setOtherMemberships dispatches correct actions", () => {
        const memberships = "other memberships to other clubs";
        const expectedActions = [
            { type: "SET_OTHER_MEMBERSHIPS", payload: memberships }
        ];
        store.dispatch(actions.setOtherMemberships(memberships));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setSilMembership dispatches correct actions", () => {
        const sil = "will join";
        const expectedActions = [
            { type: "SET_SIL_MEMBERSHIP", payload: sil }
        ];
        store.dispatch(actions.setSilMembership(sil));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setSilNumber dispatches correct actions", () => {
        const number = 123456;
        const expectedActions = [
            { type: "SET_SIL_NUMBER", payload: number }
        ];
        store.dispatch(actions.setSilNumber(number));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("setAdditionalInfo dispatches correct actions", () => {
        const info = "Lorem ipsum etc...";
        const expectedActions = [
            { type: "SET_ADDITIONAL_INFO", payload: info }
        ];
        store.dispatch(actions.setAdditionalInfo(info));
        expect(store.getActions()).toEqual(expectedActions);
    });
});