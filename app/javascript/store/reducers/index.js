/**
 * Created by owlaukka on 18/06/17.
 */
import { combineReducers } from 'redux';
import reservations from './reservationsReducer';
import applications from './applicationsReducer';
import planes from './planesReducer';
import login from './loginReducer';
import notifiers from './notifiersReducer';
import session from './sessionReducer';

export default combineReducers({
    reservations,
    applications,
    planes,
    login,
    notifiers,
    session,
});