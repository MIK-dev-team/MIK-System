import React from 'react';
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, InputGroup, Glyphicon } from 'react-bootstrap';

import * as actions from '../../store/actions/loginActions';
import * as validators from '../../store/actions/loginValidationActions';

export class LoginForm extends React.Component {

    handleFormSubmit = (e) => {this.props.dispatch(actions.loginUser(this.props.username, this.props.password, e))};

    render() {
        let successElement;
        if (this.props.isLoginFailed) {
            successElement = <h4>Kirjautumistiedoissa on virhe!</h4>
        }
        if (this.props.isLoginSuccess) {
            successElement = <h4>Olet kirjautunut sisään.</h4>
        }

        return (
            <div>
                {successElement}
                <form onSubmit={this.handleFormSubmit}>
                    <FormGroup controlId="username">
                        <ControlLabel>Käyttäjätunnus/Sähköposti</ControlLabel>
                        <FormControl type="text" value={this.props.username} onChange={(e) => this.props.dispatch(actions.handleUsernameValueChange(e))}/>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <ControlLabel>Salasana</ControlLabel>
                        <FormControl type="password" value={this.props.password} onChange={(e) => this.props.dispatch(actions.handlePasswordValueChange(e))}/>
                    </FormGroup>

                    <Button type="submit">Kirjaudu</Button>
                </form>
            </div>
        )
    }

}

export default connect((store) => {
    return {
      isLoginSuccess: store.login.isLoginSuccess,
      username: store.login.username,
      password: store.login.password,
      isLoginFailed: store.login.isLoginFailed
    }
})(LoginForm)
