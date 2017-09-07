import React from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Notifications from '../common/notifications';
import LoginForm from './login_form';
import { loginUser } from '../../store/actions/loginActions';

const styles = {
    jumbo: {
        'borderRadius': '0px'
    },
    colCentered: {
        'float': 'none',
        'margin': '0 auto'
    },
    helpSpacing: {
        'lineHeight': '25px'
    }
};

export class LoginPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6} style={styles.colCentered}>
                        <PageHeader className="text-center">Kirjaudu sisään</PageHeader>
                        <Notifications/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6} style={styles.colCentered}>
                        <LoginForm id="login-form"
                        onSubmit={(values) => this.props.dispatch(loginUser(values))} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect((store) => {
  return {}
})(LoginPage)
