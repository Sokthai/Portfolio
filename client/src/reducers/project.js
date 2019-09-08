import {PROJECT_LOADED, PROJECT_LOADED_FAIL} from '../actions/types';


const initialState = {
    loading: true,
    project: null,
    isAuthenticated: false,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case PROJECT_LOADED :
            return {
                ...state,
                project: payload,
                isAuthenticated: true,
                loading: false
            }
        case PROJECT_LOADED_FAIL:
            return {
                project: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}