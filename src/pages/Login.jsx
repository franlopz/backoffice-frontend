import React, { useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import { RiArrowRightCircleLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Login = () => {


    const { authUser, state } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        keepsession: false
    })

    const statusIcon = {
        'loging': <AiOutlineLoading
            className={`animate-spin absolute right-2 top-1 w-8 h-8`}
        />,
        'loaded': <RiArrowRightCircleLine
            className={`absolute right-2 top-1 w-8 h-8 
                    ${(formData.password && formData.username !== '' ?
                    'text-gray-500' :
                    'text-gray-300')}`} />
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = await authUser({ formData: formData })
        if (user) {navigate(from, { replace: true })}

    }

    return (
        <div className='h-screen w-screen flex bg-blue-200 bg-opacity-10'>
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='m-6'>Iniciar sesión en TechPOS</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <input
                            className='h-10 w-80 rounded-t-md pl-2 border shadow-sm outline-blue-600'
                            type='text'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                            required={true}
                            placeholder='Cuenta de sesión'
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange} />
                        <div className='relative h-10 w-80'>
                            <button disabled={(formData.password || formData.username !== '' ? false : true)}>
                                {statusIcon[state]}
                            </button>
                            <input
                                className='w-full h-full rounded-b-md pl-2 border shadow-sm outline-blue-600'
                                type='password'
                                autoComplete='off'
                                required={true}
                                placeholder='Contraseña'
                                value={formData.password}
                                name='password'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex items-center justify-center gap-2 m-6'>
                            <label >
                                <input
                                    className={`w-4 h-4 relative top-0.5 right-1`}
                                    type='checkbox'
                                    name='keepsession'
                                    onChange={handleInputChange}
                                    checked={formData.keepsession}
                                />
                            Permanecer conectado
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login