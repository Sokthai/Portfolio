import {LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, USER_LOADED_FAIL} from '../actions/types';


const initialState = {
    loading: true,
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("token")
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case USER_LOADED :
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS: 
            (payload.token && localStorage.setItem("token", payload.token));
            return {
                ...state,  //this state is the user
                payload, //this payload is the token
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case USER_LOADED_FAIL:
            localStorage.removeItem("token");
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}