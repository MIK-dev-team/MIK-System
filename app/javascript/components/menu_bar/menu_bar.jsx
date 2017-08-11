/**
 * Created by owlaukka on 10/08/17.
 */
import React from 'react';
import { Nav, NavItem, Navbar, Grid, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

export class MenuBar extends React.Component {
    settingsBar() {
        if (this.props.logged) {
            return (
                <Nav bsStyle="tabs" pullRight>
                    <NavItem data-method="delete" href="/logout">Kirjaudu ulos</NavItem>
                </Nav>
            )
        } else {
            return (
                <Nav bsStyle="tabs" pullRight>
                    <NavItem onClick={() => this.goToUrl("/liity")} href="/liity">Liity!</NavItem>
                    <NavItem onClick={() => this.goToUrl("/kirjaudu")} href="/kirjaudu">Kirjaudu</NavItem>
                </Nav>
            )
        }
    }

    goToUrl(path) {
        window.location.href = path;
    }

    render() {
        return (
            <Grid>
                <Jumbotron style={{ 'background': '#00000000', 'margin': '0 auto' }}>
                    <h1>Malmin Ilmailukerho</h1>
                </Jumbotron>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">MIK</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeHref={window.location.pathname} bsStyle="tabs">
                            <NavItem onClick={() => this.goToUrl("/")} href="/">Varauskalenteri</NavItem>
                            { this.props.logged ?
                                <NavItem onClick={() => this.goToUrl("/varaukset")} href="/varaukset">Varaukset</NavItem> :
                                null
                            }
                            <NavItem href="#">Test 2</NavItem>
                        </Nav>
                        {this.settingsBar()}
                    </Navbar.Collapse>
                </Navbar>
            </Grid>
        )
    }
}

export default connect((store) => {
    return {
        logged: store.session.loggedIn,
    }
})(MenuBar)