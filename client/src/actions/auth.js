import axios from 'axios';
import { USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,  USER_LOADED_FAIL, PROJECT_LOADED_FAIL } from './types';
import setAuthToken from '../utility/setAuthToken';



//loading user to redux store
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/profile/all');

        const resProject = await axios.get('/api/profile/project/all');
        // console.log(resProject.data);
        // console.log(res.data);
        res.data[0].project = resProject.data;
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

 
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: USER_LOADED_FAIL
        });
        dispatch({
            type: PROJECT_LOADED_FAIL
        });
     
    }
    // console.log("set token done");
    // console.log(axios.defaults.headers.common['auth-token']);
}





//log user in
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    console.log({email, password});
    try {
        const res = await axios.post('/api/login', { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (error) {
   
        dispatch({
            type: LOGIN_FAIL
        })
    }
}



//log out
export const logout = () => async dispatch => {
  
    dispatch({
        type: LOGOUT
    });
}