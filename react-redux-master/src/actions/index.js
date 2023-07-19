//creating incrementation function. val is the value to increase the counter by every time the button is clicked

const increment = (val) =>{
    return {
        type: 'INCREMENT',
        inc: val
    }
}

export default increment;