import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import GenericInput from "../form_fields/generic_bootstrap_input";

import { required } from '../../services/validators/commonValidators';
import * as actions from '../../store/actions/loginActions';

export class LoginForm extends React.Component {

    render() {
      const { handleSubmit } = this.props;

        return (
                <form onSubmit={handleSubmit}>
                    <Field label="Käyttäjätunnus/Sähköposti" name="email"
                          id="login-username"  component={GenericInput}
                          validate={[required]} />
                    <Field label="Salasana" name="password" type="password"
                          id="login-password"  component={GenericInput}
                          validate={[required]} />

                    <Button type="submit">Kirjaudu</Button>
                </form>
        )
    }
}

LoginForm = reduxForm({
    form: 'LoginForm'
})(LoginForm);

LoginForm = connect((store) => {
    return {
      username: store.login.username,
      password: store.login.password,
    }
})(LoginForm)

export default LoginForm;
