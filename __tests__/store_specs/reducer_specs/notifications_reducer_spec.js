import reducer from '../../../app/javascript/store/reducers/notificationsReducer';

const initialState = {
    errorMsg: null,
    successMsg: null,
    infoMsg: null,
};

describe('Notifications reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it("should handle SET_ERROR correctly", () => {
        const error = 'error here';
        expect(
            reducer(undefined, {type: "SET_ERROR", payload: error})
        ).toEqual({
            ...initialState,
            errorMsg: error,
        });
    });

    it("should handle SET_SUCCESS correctly", () => {
        const success = 'some success';
        expect(
            reducer(undefined, {type: "SET_SUCCESS", payload: success})
        ).toEqual({
            ...initialState,
            successMsg: success,
        });
    });

    it("should handle SET_NOTIFICATION correctly", () => {
        const info = 'some notification';
        expect(
            reducer(undefined, {type: "SET_NOTIFICATION", payload: info})
        ).toEqual({
            ...initialState,
            infoMsg: info,
        });
    });

    it("should handle RESET_NOTIFICATIONS correctly", () => {
        expect(
            reducer(
                {...initialState, infoMsg: 'something', successMsg: 'something else'},
                {type: "RESET_NOTIFICATIONS"}
            ))
            .toEqual({
                ...initialState,
            });
    });
});