import axios from 'axios';
import { setAlert } from './alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';


//register user
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body =JSON.stringify({ name, email, password});

    try {
        dispatch({ 
            type: CLEAR_PROFILE 
        });
        dispatch({
            type: RESET_PROFILE_LOADING
        });
        
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        });
    }
}
