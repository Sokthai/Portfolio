import {combineReducers} from 'redux';
// import resume from './resume';
import auth from './auth';
import github from './github';



export default combineReducers({
     auth, github
})