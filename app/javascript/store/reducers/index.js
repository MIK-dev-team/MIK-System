/**
 * Created by owlaukka on 18/06/17.
 */
import { combineReducers } from 'redux';
import reservations from './reservationsReducer';

export default combineReducers({
    reservations,
});