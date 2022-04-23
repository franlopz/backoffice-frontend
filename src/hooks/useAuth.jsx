import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { URL_TOKEN } from '../services/api'

const useAuth = () => {

    const [user, setUser] = useState(null)
    const [state, setState] = useState('loading')
    const navigate = useNavigate()

    useEffect(() => {
        let initialUser = JSON.parse(window.localStorage.getItem('user'))
        if (initialUser) {
            const expire = new Date(initialUser.expire + 'Z').getTime()
            const date = new Date().getTime()
            const diff = expire - date
            if (diff < 60000) {
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('uuid')
                toast.error('Sesión expirada, vuelve a iniciar sesión para continuar')
                return navigate('/login', { replace: true })
            }
            setUser(initialUser)
        }
        setState('loaded')
    }, [])

    const authUser = async ({ formData }) => {
        const params = new URLSearchParams()
        params.append('username', formData.username)
        params.append('password', formData.password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
        }

        try {
            setState('loging')
            const response = await fetch(URL_TOKEN, requestOptions)
            if (response.status === 200) {
                const data = await response.json()
                setUser(data)
                window.localStorage.setItem('user', JSON.stringify(data))
                window.localStorage.setItem('uuid', data.companies[0].uuid)
                setState('loaded')
                return data
            }
            if (response.status === 401) {
                toast.error('Contraseña o usuario no válido', { id: 'invalidLogin' })
            }
            setState('loaded')

        } catch (err) {
            setState('loaded')
            toast.error('Error al iniciar sesión', { id: 'erroAtLogin' })
            return null
        }
    }

    return { user, authUser, state }
}

export default useAuth