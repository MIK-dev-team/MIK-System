/**
 * Created by owlaukka on 18/06/17.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reservations from './reservationsReducer';
import applications from './applicationsReducer';
import planes from './planesReducer';
import login from './loginReducer';
import notifiers from './notifiersReducer';
import notifications from './notificationsReducer';
import session from './sessionReducer';
import singleReservation from './singleReservationReducer';

export default combineReducers({
    reservations,
    applications,
    planes,
    login,
    notifiers,
    notifications,
    session,
    singleReservation,
    form: formReducer,
});