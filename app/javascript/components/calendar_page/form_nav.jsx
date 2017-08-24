import React from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setSidebarMod } from '../../store/actions/reservationsActions';
import ReservationForm from "./reservation_form";
import CancellationForm from "./cancellation_form";

export class FormNavigation extends React.Component {

  toggleSidebarMod(eventKey) {
    if(this.props.sidebarMod && eventKey === 2) {
      this.props.dispatch(setSidebarMod(2));
    }
    if(!this.props.sidebarMod && eventKey === 1) {
      this.props.dispatch(setSidebarMod(1));
    }
  }

  render() {
    return(
      <Col id="sidebar" className={this.props.collapsed ? 'collapsed' : 'col-lg-4'}>
        <Nav bsStyle="tabs" onSelect={(eventKey) => this.toggleSidebarMod(eventKey)}>
          <NavItem eventKey={1} title="Varaus">Varaus</NavItem>
          <NavItem eventKey={2} title="Peruminen">Joukkoperuminen</NavItem>
        </Nav>
          {this.props.sidebarMod ? <ReservationForm/> : <CancellationForm/>}
      </Col>
    )
  }
}
export default connect((store) => {
    return {
        collapsed: store.reservations.collapsed,
        sidebarMod: store.reservations.sidebarMod,
    }
})(FormNavigation)
