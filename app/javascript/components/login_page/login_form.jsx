import React from 'react';
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, InputGroup, Glyphicon } from 'react-bootstrap';

import * as actions from '../../store/actions/loginActions';
import * as validators from '../../store/actions/loginValidationActions';

export class LoginForm extends React.Component {
  render() {
    return(
      <form>
          <FormGroup controlId="username">
                      <ControlLabel>Käyttäjätunnus/Sähköposti</ControlLabel>
                      <FormControl type="text"/>
          </FormGroup>

          <FormGroup controlId="username">
                      <ControlLabel>Salasana</ControlLabel>
                      <FormControl type="password"/>
          </FormGroup>

          <Button type="submit">
              Kirjaudu
          </Button>
      </form>
    )
    }
}

export default connect((store) => {
    return {
        //applications: store.applications,
        //submitObject: store.applications.submitObject,
    }
})(LoginForm)
