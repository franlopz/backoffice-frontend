import React, { useState } from 'react'
import useModifyUser from '../../hooks/useModifyUser'
import Input from '../compras/Input'
import Container from '../Container'

const initialFormData = {
    password: '',
    newpassword: '',
    passwordconfirm: ''
}

const ChangePasswordForm = () => {


    const [formData, setFormData] = useState(initialFormData)
    const {changePassword} = useModifyUser()
    
    const handleChange = (e) => {
        setFormData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        changePassword({data:formData})
        setFormData(initialFormData)
        console.log(formData)
    }

    return (
        <Container title="Cambiar contraseña">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full p-4'>
                        <Input
                            required
                            labeltext='Contraseña actual'
                            value={formData.password}
                            type="password"
                            name='password'
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <Input
                            required
                            labeltext='Contraseña nueva'
                            value={formData.newpassword}
                            type="password"
                            name='newpassword'
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <Input
                            required
                            labeltext='Confirmación de contraseña'
                            value={formData.passwordconfirm}
                            type="password"
                            name='passwordconfirm'
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <button className='button'>Cambiar contraseña</button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default ChangePasswordForm