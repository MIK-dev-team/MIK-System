import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from "./login_page";
import store from '../../store/store';

export default class LoginIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
    }
}
