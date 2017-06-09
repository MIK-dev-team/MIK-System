import React from 'react';
import moment from 'moment';

let reservations = <tr></tr>

export default class ReservationTableContent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.reservations) !== JSON.stringify(nextProps.reservations)) {
            const ress = nextProps.reservations;
            reservations = ress.map((res) =>
                (<tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{moment(res.start).format('lll')}</td>
                    <td>{moment(res.end).format('lll')}</td>
                    <td>{res.plane_id}</td>
                    <td>{res.reservation_type}</td>
                </tr>)
            );
        }
    }

    render() {
        return(
            <tbody>
                {reservations}
            </tbody>
        )
    }
}