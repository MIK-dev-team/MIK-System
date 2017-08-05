const initialState = {
    isLoginSuccess: false,
    username: "",
    password: ""
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case "SUBMIT_LOGIN":
            return {...state, isLoginSuccess: true};
        case "USERNAME_CHANGED":
            return {...state, username: action.payload};
        case "PASSWORD_CHANGED":
            return {...state, password: action.payload};
    }

    return state;
}
