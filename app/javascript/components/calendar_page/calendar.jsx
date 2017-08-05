import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCollapsed, fillForm } from '../../store/actions/reservationsActions';

import ReservationForm from "./reservation_form";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            reservations: []
        };

        this.fillFormView = this.fillFormView.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.reservations !== nextProps.reservations) {
            this.setState({reservations: nextProps.reservations});
        }
    }

    fillFormView(timeSlot) {
        if (timeSlot.start < new Date()) {
            alert('Älä varaa aikaa menneisyydestä!');
            return;
        }

        for (let res of this.props.reservations) {
            if ((timeSlot.end > res.start && timeSlot.end <= res.end) ||
                (timeSlot.start >= res.start && timeSlot.start < res.end) ||
                (timeSlot.start <= res.start && timeSlot.end >= res.end)) {
                alert("Et voi varata jo varattua aikaa");
                return;
            }
        }

        let newArray = [];
        for (let o of this.props.reservations) {
            newArray.push(o);
        }
        if (this.props.reservations.length !== 0 && this.props.reservations[this.props.reservations.length-1].title === '<valittu aika>') {
            newArray.pop();
        }

        const res = {
            title: "<valittu aika>",
            start: timeSlot.start,
            end: timeSlot.end,
            reservation_type: 'selected',
        };
        newArray.push(res);

        this.setState({reservations: newArray});
        this.props.dispatch(fillForm(timeSlot))
    }

    isButtonDisabled() {
        if (this.state.reservations.length !== 0 && this.state.reservations[this.state.reservations.length-1].title === '<valittu aika>') {
            return true;
        }
        return false;
    }



    eventStyleGetter(event, start, end, isSelected) {
        var background = "#ffffff",
            color = "#000000";
        if (event.title === "<valittu aika>")
            background = "#ff0000";
        else if (event.reservation_type === "opetus")
            background = "#ffe99a";
        else
            background = "#00eeee";

        return ({
            style: {
                backgroundColor: background,
                color: color
            }
        })
    }

    render() {
        let initTime = new Date();
        initTime.setHours(8, 30);
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.props.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            selectable
                            {...this.props}
                            events={this.state.reservations}
                            defaultView="week"
                            scrollToTime={initTime}
                            onSelectEvent={(event) => alert("Tehdään tähän vaikka modaali tai muu ikkuna joka kertoo kaikki tiedot", event)}
                            onSelectSlot={(timeSlot) => this.fillFormView(timeSlot)}
                            views={["month", "week", "day", "agenda"]}
                            eventPropGetter={this.eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col id="sidebar" className={this.props.collapsed ? 'collapsed' : 'col-lg-4'}>
                        <ReservationForm />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Button disabled={this.isButtonDisabled()} onClick={() => this.props.dispatch(setCollapsed(this.props.collapsed))}>
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
    }
})(Calendar)