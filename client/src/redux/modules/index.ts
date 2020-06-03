import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import snack from './snack'
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    snack,
    pender: penderReducer
});