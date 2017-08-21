import reducer from '../../../app/javascript/store/reducers/singleReservationReducer';

const initialState = {
    sending: false,
    sent: false,
    updateError: null,

    showModal: false,
    reservation: null,
};

describe('SingleReservationReducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it("should handle SHOW_MODAL correctly", () => {
        const reservation = {some: "reservation"};
        expect(
            reducer(undefined, {type: "SHOW_MODAL", payload: reservation})
        ).toEqual({
            ...initialState,
            reservation: reservation,
            showModal: true,
        });
    });

    it("should handle HIDE_MODAL correctly", () => {
        expect(
            reducer({...initialState, reservation: "somethig", showModal: true}, {type: "HIDE_MODAL"})
        ).toEqual({
            ...initialState,
            reservation: null,
            showModal: false,
        });
    });

    it("should handle SET_RESERVATION correctly", () => {
        const reservation = {some: "reservation"};
        expect(
            reducer(undefined, {type: "SET_RESERVATION", payload: reservation})
        ).toEqual({
            ...initialState,
            reservation: reservation,
        });
    });

    it("should handle UPDATE_RESERVATION_PENDING correctly", () => {
        expect(
            reducer(undefined, {type: "UPDATE_RESERVATION_PENDING"})
        ).toEqual({
            ...initialState,
            sending: true
        });
    });

    it("should handle UPDATE_RESERVATION_REJECTED correctly", () => {
        const error = {some: "error"};
        expect(
            reducer({...initialState, sending: true}, {type: "UPDATE_RESERVATION_REJECTED", payload: error})
        ).toEqual({
            ...initialState,
            updateError: error,
            sending: false,
        });
    });

    it("should handle UPDATE_RESERVATION_FULFILLED correctly", () => {
        expect(
            reducer({...initialState, sending: true}, {type: "UPDATE_RESERVATION_FULFILLED"})
        ).toEqual({
            ...initialState,
            sent: true,
            sending: false,
        });
    });
});