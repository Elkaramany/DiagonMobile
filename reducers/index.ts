import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import fetchReducer from './fetchReducer';

export default combineReducers({
    SignInReducer,
    fetchReducer,
})