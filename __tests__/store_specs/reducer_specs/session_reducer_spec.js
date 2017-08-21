import reducer from '../../../app/javascript/store/reducers/sessionReducer';

const initialState = {
    loggedIn: false
};

describe('Session reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it("should handle SET_LOGGED_IN correctly", () => {
        const loggedIn = true;
        expect(
            reducer(undefined, {type: "SET_LOGGED_IN", payload: loggedIn})
        ).toEqual({
            ...initialState,
            loggedIn: loggedIn,
        })
    });
});