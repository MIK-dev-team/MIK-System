import reducer from '../../../app/javascript/store/reducers/planesReducer';

const initialState = {
    planes: [],
    selectedPlane: undefined,
};

describe('Reservations reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it("should handle SET_PLANES correctly", () => {
        const planes = [{ id: 1, name: "something" }];
        expect(
            reducer(undefined, {type: "SET_PLANES", payload: planes})
        ).toEqual({
            ...initialState,
            planes: planes,
        })
    });

    it("should handle SELECT_PLANE correctly", () => {
        const selectedPlane = { id: 2, name: "something else" };
        expect(
            reducer(undefined, {type: "SELECT_PLANE", payload: selectedPlane})
        ).toEqual({
            ...initialState,
            selectedPlane: selectedPlane,
        })
    });
});