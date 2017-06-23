import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import ReservationForm from "./reservation_form";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: this.props.reservations,
            timeSlot: {
                start: "",
                end: ""
            },
            collapsed: true
        };

        this.fillForm = this.fillForm.bind(this);
        this.setCollapsed = this.setCollapsed.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.reservations) !== JSON.stringify(nextProps.reservations)) {
            this.setState({
                reservations: nextProps.reservations
            });
        }
    }

    eventStyleGetter(event, start, end, isSelected) {
        var background = "#ffffff",
            color = "#000000";
        if (event.reservation_type === "opetus")
            background = "#ffe99a";
        else if (event.reservation_type === "selected")
            background = "#ff0000";
        else
            background = "#00eeee";

        return ({
            style: {
                backgroundColor: background,
                color: color
            }
        })
    }

    fillForm(timeSlot) {
        if (this.state.reservations[this.state.reservations.length - 1].reservation_type === 'selected')
            this.state.reservations.pop();

        for (let res of this.state.reservations) {
            if ((moment(res.start) - moment(timeSlot.start) < 0 && moment(res.end) - moment(timeSlot.start) > 0) ||
                (res.start - timeSlot.end < 0 && res.end - timeSlot.end > 0)) {
                alert("Et voi varata jo varattua aikaa");
                return;
            }
        }

        this.state.reservations.push({
            'title': '<valittu aika>',
            'start': timeSlot.start,
            'end': timeSlot.end,
            reservation_type: 'selected'
        });

        this.setState({
            timeSlot: {
                start: moment(timeSlot.start).format(),
                end: moment(timeSlot.end).format()
            },
            collapsed: false
        });
    }

    setCollapsed() {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }))
    }

    render() {
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.state.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            selectable
                            {...this.props}
                            events={this.state.reservations}
                            defaultView="week"
                            onSelectEvent={({}) => alert("Tehdään tähän vaikka modaali tai muu ikkuna joka kertoo kaikki tiedot")}
                            onSelectSlot={(timeSlot) => this.fillForm(timeSlot)}
                            views={["week", "day", "agenda"]}
                            eventPropGetter={this.eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col id="sidebar" className={this.state.collapsed ? 'collapsed' : 'col-lg-4'}>
                        <ReservationForm timeSlot={this.state.timeSlot} plane={this.props.plane} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Button disabled={this.state.reservations[this.state.reservations.length-1].reservation_type === 'selected'} onClick={this.setCollapsed}>
                            {this.state.collapsed ? "Näytä varauksesi tiedot" : "Piilota varauksesi tiedot"}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}