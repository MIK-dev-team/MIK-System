const initialState = {
    isLoginSuccess: false,
    isLoginFailed: false,
    username: "",
    password: "",
    user_id: ""
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case "SUBMIT_LOGIN":
            return {...state, isLoginSuccess: true, user_id: action.payload.id};
        case "USERNAME_CHANGED":
            return {...state, username: action.payload};
        case "PASSWORD_CHANGED":
            return {...state, password: action.payload};
        case "LOGIN_FAILED":
            return {...state, isLoginFailed: true, isLoginSuccess: false};
    }

    return state;
}
