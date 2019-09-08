import axios from 'axios';
import {GET_RESUME_FAIL, GET_RESUME_SUCCESS} from './types';


export const getResume = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_RESUME_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {
        console.log(error.message);
        const errors = error.response.data.errors;
        // errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: GET_RESUME_FAIL
        })
    }
}