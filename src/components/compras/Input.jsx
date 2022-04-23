import React from 'react'
import './input.css'

const Input = ({ ...props }) => {

    return (
        !props.hidden && < div className="input-container" >
        <input {...props} />
        <label hidden={props.hidden} className='filled'>
            {props.labeltext}
        </label>
    </div >
        
    )
}

export default Input