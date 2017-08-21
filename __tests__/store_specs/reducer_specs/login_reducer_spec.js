import reducer from '../../../app/javascript/store/reducers/loginReducer';

const initialState = {
  isLoginSuccess: false,
  isLoginFailed: false,

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
            isLoginSuccess: true, user_id: 1})
    });

    it('should handle USERNAME_CHANGED correctly', () => {
        const un = "someusername"
        expect(
            reducer(undefined, {type: "USERNAME_CHANGED", payload: un})
        ).toEqual({...initialState, username: un})
    });

    it('should handle PASSWORD_CHANGED correctly', () => {
      const pw = "qwerty"
        expect(
            reducer(undefined, {type: "PASSWORD_CHANGED", payload: pw})
        ).toEqual({...initialState, password: pw})
    });

    it('should handle LOGIN_FAILED correctly', () => {
        expect(
            reducer(undefined, {type: "LOGIN_FAILED"})
        ).toEqual({...initialState, isLoginFailed: true, isLoginSuccess: false})
    });
  });
