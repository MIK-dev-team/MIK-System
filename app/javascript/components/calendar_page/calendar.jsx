import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Row, Col, Button, Tab, Tabs, Nav, NavItem, NavDropdown, MenuItem, NavBar } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setCollapsed, fillForm , setSidebarMod } from '../../store/actions/reservationsActions';
import { selectTimeForNotifier } from "../../store/actions/notifiersActions";
import ReservationForm from "./reservation_form";
import CancellationForm from "./cancellation_form";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export class Calendar extends React.Component {
    selectTimeSlot(timeSlot) {
        if (this.props.notifierMode) {
            this.props.dispatch(selectTimeForNotifier(timeSlot, this.props.reservations));
        } else {
            this.props.dispatch(fillForm(timeSlot, this.props.reservations));
        }
    }

    convertReservationsToCalendarEvents() {
        let newArray = [];
        for (let res of this.props.reservations) {
            newArray.push({
                title: res.reservation_type,
                start: moment(res.start).toDate(),
                end: moment(res.end).toDate(),
                reservation_type: res.reservation_type
            })
        }
        return newArray;
    }

    isButtonDisabled() {
        return this.props.reservations.length !== 0 &&
            this.props.reservations[this.props.reservations.length-1].reservation_type === 'selected'
    }

    toggleCollapse() {
        return () =>
            this.props.dispatch(setCollapsed(this.props.collapsed));
    }

    toggleSidebarMod(eventKey) {
      if(this.props.sidebarMod && eventKey === 2) {
        this.props.dispatch(setSidebarMod(2));
      }
      if(!this.props.sidebarMod && eventKey === 1) {
        this.props.dispatch(setSidebarMod(1));
      }
    }

    // TODO: put this into it's own service/library function etc
    eventStyleGetter(event, start, end, isSelected) {
        var background,
            color = "#000000CC";
        switch (event.reservation_type) {
            case "selected": {
                background = "#ff00008C";
                break;
            }
            case "observer": {
                background = "#00ff5f";
                break;
            }
            case "opetus": {
                background = "#ffe99a8C";
                break;
            }
            default:
                background = "#00eeee8C";
        }

        return ({
            style: {
                backgroundColor: background,
                color: color
            }
        })
    }

    render() {
        let initTime = moment();
        if (initTime.hours() < 9 || initTime.hours() > 21) {
            initTime.hours(7).minutes(30);
        } else {
            initTime.subtract(5, 'hours');
        }
        initTime = initTime.toDate();
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.props.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            selectable
                            {...this.props}
                            events={this.convertReservationsToCalendarEvents()}
                            defaultView="week"
                            scrollToTime={initTime}
                            onSelectEvent={(event) => alert("Tehdään tähän vaikka modaali tai muu ikkuna joka kertoo kaikki tiedot", event)}
                            onSelectSlot={(timeSlot) => this.selectTimeSlot(timeSlot)}
                            views={["month", "week", "day", "agenda"]}
                            eventPropGetter={this.eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", month: "kuukausi", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col id="sidebar" className={this.props.collapsed ? 'collapsed' : 'col-lg-4'}>
                      <Nav bsStyle="tabs" onSelect={(eventKey) => this.toggleSidebarMod(eventKey)}>
                        <NavItem eventKey={1} title="Varaus">Varaus</NavItem>
                        <NavItem eventKey={2} title="Peruminen">Joukkoperuminen</NavItem>
                      </Nav>
                        {this.props.sidebarMod ? <ReservationForm/> : <CancellationForm/>}
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Button disabled={this.isButtonDisabled()} onClick={this.toggleCollapse()}>
                            {this.props.collapsed ? "Näytä varauksesi tiedot" : "Piilota varauksesi tiedot"}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        collapsed: store.reservations.collapsed,
        reservations: store.reservations.reservations,
        resChange: store.reservations.resChange,
        notifierMode: store.notifiers.notifierMode,
        sidebarMod: store.reservations.sidebarMod,
    }
})(Calendar)
