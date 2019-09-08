import {GITHUB_FAIL, GITHUB_SUCCESS} from '../actions/types';

const initialState = {
    payload: null,
    load: true,

}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case GITHUB_SUCCESS:
            return {
                ...state,
                payload: payload,
                load: false
            }
        case GITHUB_FAIL:
            return {
                payload: null,
                load: false
            }
        default: 
            return state
    }
}