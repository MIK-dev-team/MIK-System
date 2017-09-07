export default function reducer(state = {
  username: "",
  password: "",
  user_id: ""
}, action) {

    switch (action.type) {
        case "SUBMIT_LOGIN":
            return {...state, user_id: action.payload.id};
    }

    return state;
}
