import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import LoginForm from './login_form';

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

export default class LoginPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6} style={styles.colCentered}>
                        <PageHeader className="text-center">Kirjaudu sisään</PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6} style={styles.colCentered}>
                        <LoginForm />
                    </Col>
                </Row>
            </Grid>
        )
    }
}
