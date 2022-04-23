import React from 'react'
import './inputDataPicker.css'

const InputDatePicker = React.forwardRef(({ ...props }, ref) => (
    < div className = "input-container" >
    <input type="text" className='rounded-sm border bg-sky-400' {...props} ref={ref} readOnly />
    <label className='filled'>
        {props.labeltext}
    </label>
</div >
));

export default InputDatePicker