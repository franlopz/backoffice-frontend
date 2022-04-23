import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'

const useToken = () => {
    const [token, setToken] = useState(null)
    const [businessUuid, setBusinessUuid] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        let user = window.localStorage.getItem('user')
        let uuid = window.localStorage.getItem('uuid')
        if (user && uuid) {
            user = JSON.parse(user)
            const now = new Date().getTime()
            let expire = new Date(user.expire + 'Z').getTime()
            if (expire - now < 60000) {
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('uuid')
                toast.error('Sesión expirada, vuelve a iniciar sesión para continuar')
                return navigate('/login', { replace: true })
            }
            setToken(user)
            setBusinessUuid(uuid)
        }
        if (!user) {
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('uuid')
            toast.error('Sesión expirada, vuelve a iniciar sesión para continuar')
            return navigate('/login', { replace: true })
        }

    }, [])

    const checkSessionStatus = (status) => {
        if (status === 401) {
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('uuid')
            toast.error('La sesión ha expirado')
            return navigate('/login', { replace: true })
        }

    }

    return [token, businessUuid, checkSessionStatus]
}

export default useToken