import {combineReducers} from 'redux'

const counter = (state=0,action)=>{
    if(action.type === 'INCREMENT'){
        //this will increase the value of counter by the value passed to the increment method in ./actions/index.js
        return state+action.inc;
    }
    //returns the current value of the counter
    return state;
}

const myReducers = combineReducers({counter});
    //commbineReducers - turns an object whose values are different reducer functions into a single reducer function. It will call every child reducer and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions
    
export default myReducers;