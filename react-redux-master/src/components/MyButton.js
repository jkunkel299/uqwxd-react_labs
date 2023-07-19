import React from 'react'
import { useDispatch } from 'react-redux';
import increment from '../actions/index.js'

const MyButton = () => {
    let dispatch = useDispatch();//useDispatch is a hook to allow use of the Dispatch function. Dispatches the event to the store and finds out what action is to be taken, uses the appropriate reducer to do the same
    return(
        <button onClick={()=>dispatch(increment(1))}>Increase counter</button>
    );
}

export default MyButton;