import React from 'react'
import './input.css'

const Select = ({ ...props }) => {
    return (
        !props.hidden && < div className='select-container'>
            <select {...props}>
                <option value="" disabled>
                    Elige una opción
                </option>
                {Array.isArray(props.data) ?
                    props.data.map((item) => {
                        return <option className='option' key={item} value={item}>{item}</option>
                    }) : props.fromKeys?
                        Object.values(props.data).map((item) => {
                            return <option className='option' key={item} value={item}>{item}</option>
                        })
                        : Object.keys(props.data).map((item) => {
                            return <option className='option' key={item} value={item}>{item}</option>
                        })}
            </select>
            <label hidden={props.hidden} className='filled'>
                {props.labeltext}
            </label>
        </div >

    )
}

export default Select