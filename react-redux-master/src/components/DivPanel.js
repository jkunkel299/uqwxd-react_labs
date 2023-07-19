import React from 'react'
import {useSelector} from 'react-redux';

const DivPanel = () => {
    let counterVal = useSelector(state => state.counter) //useSelector is used to select the state from the store whose value you want to access
    return(
        <div>
            The present value of counter is {counterVal}
        </div>
    );
}

export default DivPanel;