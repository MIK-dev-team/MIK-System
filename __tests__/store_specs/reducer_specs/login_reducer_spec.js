import reducer from '../../../app/javascript/store/reducers/loginReducer';

const initialState = {
  username: "",
  password: "",
  user_id: "",

};

describe('Login Reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SUBMIT_LOGIN correctly', () => {
        expect(
            reducer(undefined, {type: "SUBMIT_LOGIN", payload: { id: 1 }})
        ).toEqual({
            ...initialState,
            user_id: 1})
    });
  });
