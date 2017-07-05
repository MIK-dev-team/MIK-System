import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


import LoginForm from './login_form';

const styles = {
    colCentered: {
        'float': 'none',
        'margin': '0 auto'
    }
};

export default class LoginPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={6} md={6} sm={6} style={styles.colCentered}>
                        <LoginForm />
                    </Col>
                </Row>
            </Grid>
        )
    }
}
