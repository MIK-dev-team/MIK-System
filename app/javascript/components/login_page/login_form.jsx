import React from 'react';
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon, Alert } from 'react-bootstrap';

import * as actions from '../../store/actions/loginActions';
import * as validators from '../../services/validators/loginValidators';

export class LoginForm extends React.Component {

    handleFormSubmit = (e) => {this.props.dispatch(actions.loginUser(this.props.username, this.props.password, e))};

    render() {
        let alert;
        if (this.props.isLoginFailed) {
          alert =
              <Alert bsStyle="danger">
                  <h4>Kirjautumistiedoissa on virhe!</h4>
              </Alert>        }
        if (this.props.isLoginSuccess) {
          alert =
              <Alert bsStyle="success">
                  <h4>Olet kirjautunut sisään!</h4>
              </Alert>
            }

        return (
            <div>
                {alert}
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
