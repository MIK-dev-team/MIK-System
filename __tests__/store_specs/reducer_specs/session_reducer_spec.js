import reducer from '../../../app/javascript/store/reducers/sessionReducer';

const initialState = {
    loggedIn: false,
    user_id: null,
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

    it("should handle SET_USER_ID correctly", () => {
        const user_id = 12;
        expect(
            reducer(undefined, {type: "SET_USER_ID", payload: user_id})
        ).toEqual({
            ...initialState,
            user_id: user_id,
        })
    });
});