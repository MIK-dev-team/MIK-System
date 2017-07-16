import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from './login_form';

export default class LoginPage extends React.Component {
    render() {
        return (
            <Grid>
              <LoginForm />
            </Grid>
        )
    }
}
