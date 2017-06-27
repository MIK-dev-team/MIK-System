import reducer from '../../../app/javascript/store/reducers/reservationsReducer';

describe('Reservations reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it('should handle FETCH_RESERVATIONS_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "FETCH_RESERVATIONS_PENDING"})
        ).toEqual({
            reservations: [{}],
            fetching: true,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it('should handle FETCH_RESERVATIONS_REJECTED correctly', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_RESERVATIONS_REJECTED",
                payload: "some cool error thingy"
            })).toEqual({
                reservations: [{}],
                fetching: false,
                fetched: false,
                fetchError: "some cool error thingy",
                sending: false,
                sent: false,
                submitError: null,
                plane: 1,
                reservation_type: "harraste",
                start: "",
                end: "",
                collapsed: true,
            })
    });

    it('should handle FETCH_RESERVATIONS_FULFILLED correctly', () => {
        const payload = [{a: "asd"}, {b: "sdfg"}];
        expect(
            reducer(undefined, {
                type: "FETCH_RESERVATIONS_FULFILLED",
                payload: payload
            })).toEqual({
                reservations: payload,
                fetching: false,
                fetched: true,
                fetchError: null,
                sending: false,
                sent: false,
                submitError: null,
                plane: 1,
                reservation_type: "harraste",
                start: "",
                end: "",
                collapsed: true,
            })
    })

    it('should handle SUBMIT_RESERVATION_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_PENDING"})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: true,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it('should handle SUBMIT_RESERVATION_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_PENDING"})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: true,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it('should handle SUBMIT_RESERVATION_REJECTED correctly', () => {
        const payload = "Some sorta error?";
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_REJECTED",
                                payload: payload})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: "Some sorta error?",
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it('should handle SUBMIT_RESERVATION_FULFILLED correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_RESERVATION_FULFILLED"})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: true,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it("should handle SELECT_PLANE correctly", () => {
        const plane = 2;
        expect(
            reducer(undefined, {type: "SELECT_PLANE", payload: plane})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: plane,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });

    it("should handle SET_TYPE correctly", () => {
        const type = "opetus";
        expect(
            reducer(undefined, {type: "SET_TYPE", payload: type})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: type,
            start: "",
            end: "",
            collapsed: true,
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
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: timeSlot.start,
            end: timeSlot.end,
            collapsed: true,
        })
    });

    it("should handle SET_COLLAPSED correctly", () => {
        const collapsed = false;
        expect(
            reducer(undefined, {type: "SET_COLLAPSED", payload: collapsed})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: collapsed,
        })
    });

    it("should handle RESET_NEW_RESERVATION correctly", () => {
        expect(
            reducer(undefined, {type: "RESET_NEW_RESERVATION"})
        ).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            fetchError: null,
            sending: false,
            sent: false,
            submitError: null,
            plane: 1,
            reservation_type: "harraste",
            start: "",
            end: "",
            collapsed: true,
        })
    });
});