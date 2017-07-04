import reducer from '../../../app/javascript/store/reducers/reservationsReducer';

describe('Reservations reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            reservations: [{}],
            fetching: false,
            fetched: false,
            error: null,
        })
    });

    it('should handle FETCH_RESERVATIONS_PENDING correctly', () => {
        expect(
            reducer(undefined, {type: "FETCH_RESERVATIONS_PENDING"})
        ).toEqual({
            reservations: [{}],
            fetching: true,
            fetched: false,
            error: null,
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
                error: "some cool error thingy",
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
                error: null,
            })
    })
});