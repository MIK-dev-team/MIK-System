const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: false,

  submitObject: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN_PENDING:
      return {...state, isLoginPending: true}

    case SUBMIT_LOGIN_SUCCESS:
      return {...state, isLoginSuccess: true}

    case SUBMIT_LOGIN_ERROR:
      return {...state, loginError: true}

    default:
      return state;
  }
}
