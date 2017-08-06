import reducer from '../../../app/javascript/store/reducers/reservationsReducer';

const initialState = {
    reservations: [],
    fetching: false,
    fetched: false,
    fetchError: null,
    sending: false,
    sent: false,
    submitError: null,
    reservation_type: "harraste",
    start: "",
    end: "",
    desc: "",
    collapsed: true,
};

describe('Reservations reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle FETCH_RESERVATIONS_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "FETCH_RESERVATIONS_PENDING"})
        ).toEqual({...initialState, fetching: true})
    });

    it('should handle FETCH_RESERVATIONS_REJECTED correctly', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_RESERVATIONS_REJECTED",
                payload: "some cool error thingy"
            })).toEqual({
                ...initialState,
                fetching: false,
                fetchError: "some cool error thingy",
            })
    });

    it('should handle FETCH_RESERVATIONS_FULFILLED correctly', () => {
        const payload = [{a: "asd"}, {b: "sdfg"}];
        expect(
            reducer(undefined, {
                type: "FETCH_RESERVATIONS_FULFILLED",
                payload: payload
            })).toEqual({
                ...initialState,
                reservations: payload,
                fetching: false,
                fetched: true,
            })
    });

    it('should handle SUBMIT_RESERVATION_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_PENDING"})
        ).toEqual({
            ...initialState,
            sending: true,
        })
    });


    it('should handle SUBMIT_RESERVATION_REJECTED correctly', () => {
        const payload = "Some sorta error?";
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_REJECTED",
                                payload: payload})
        ).toEqual({
            ...initialState,
            sending: false,
            submitError: "Some sorta error?",
        })
    });

    it('should handle SUBMIT_RESERVATION_FULFILLED correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_FULFILLED"})
        ).toEqual({
            ...initialState,
            sending: false,
            sent: true,
        })
    });

    it('should handle DESTROY_RESERVATION_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "DESTROY_RESERVATION_PENDING"})
        ).toEqual({
            ...initialState,
            sending: true,
            sent: false,
        })
    });

    it('should handle DESTROY_RESERVATION_REJECTED correctly', () => {
        const payload = "Some sorta error";
        expect(
            reducer(undefined, {type: "DESTROY_RESERVATION_REJECTED",
                                payload: payload})
        ).toEqual({
            ...initialState,
            sending: false,
            submitError: payload,
        })
    });

    it('should handle DESTROY_RESERVATION_FULFILLED correctly', () => {
        expect(
            reducer(undefined, {type: "DESTROY_RESERVATION_FULFILLED"})
        ).toEqual({
            ...initialState,
            sending:false,
            sent: true,
        })
    });

    it("should handle SET_TYPE correctly", () => {
        const type = "opetus";
        expect(
            reducer(undefined, {type: "SET_TYPE", payload: type})
        ).toEqual({
            ...initialState,
            reservation_type: type,
        })
    });

    it("should handle SET_TIMESLOT correctly", () => {
        const timeSlot = {
            start: "start time here",
            end: "end time here"
        };
        expect(
            reducer(undefined, {type: "SET_TIMESLOT", payload: timeSlot})
        ).toEqual({
            ...initialState,
            start: timeSlot.start,
            end: timeSlot.end,
        })
    });

    it("should handle SET_COLLAPSED correctly", () => {
        const collapsed = false;
        expect(
            reducer(undefined, {type: "SET_COLLAPSED", payload: collapsed})
        ).toEqual({
            ...initialState,
            collapsed: collapsed,
        })
    });

    it("should handle RESET_NEW_RESERVATION correctly", () => {
        expect(
            reducer(undefined, {type: "RESET_NEW_RESERVATION"})
        ).toEqual(initialState)
    });

    it("should handle SET_DESCRIPTION correctly", () => {
        const desc = "Awesome description of some cool stuff here";
        expect(
            reducer(undefined, {type: "SET_DESCRIPTION", payload: desc})
        ).toEqual({
            ...initialState,
            desc: desc,
        })
    });

    it("should handle SET_RESERVATIONS correctly", () => {
        const reservations = ['some', 'reservations', 'here'];
        expect(
            reducer(undefined, {type: "SET_RESERVATIONS", payload: reservations})
        ).toEqual({
            ...initialState,
            reservations: reservations,
        })
    });
});