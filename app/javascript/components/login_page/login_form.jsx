import React from 'react';
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, InputGroup, Glyphicon } from 'react-bootstrap';

import * as actions from '../../store/actions/loginActions';
import * as validators from '../../store/actions/loginValidationActions';

export class LoginForm extends React.Component {
  <form>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Sähköposti
      </Col>
      <Col sm={10}>
        <FormControl type="email"/>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Salasana
      </Col>
      <Col sm={10}>
        <FormControl type="password"/>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button type="submit">
          Sign in
        </Button>
      </Col>
    </FormGroup>
  </form>
}
