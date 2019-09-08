import {GITHUB_FAIL, GITHUB_SUCCESS} from './types.js';
import axios from 'axios';


export const getGithub = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/github/sokthai");
        dispatch({
            type: GITHUB_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        console.error(error.message);
        dispatch({
            type: GITHUB_FAIL
        })
    }
}

