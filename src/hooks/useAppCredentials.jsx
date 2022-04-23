import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { URL_CREDENTIALS } from '../services/api'
import useToken from './useToken'

const useAppCredentials = () => {

    const [user, uuid, checkSessionStatus] = useToken()
    const [appCredentials, setAppCredentials] = useState({
appId:'',
appKey:'',
    })
    
console.log(appCredentials)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET',
            'Authorization': user?.token_type + ' ' + user?.access_token,
            'uuid': uuid
        },
    }

    useEffect(() => {
        if (user) {
            toast.loading('Cargando...')
            try {
                fetch(URL_CREDENTIALS, requestOptions).then(
                    (response) => {
                        checkSessionStatus(response.status)
                        return response.json()
                    }
                ).then(
                    (data) => setAppCredentials(data)
                )
            } catch (e) {
                toast.dismiss()
                toast.error('No se obtuvieron credenciales de app')

            }
            toast.dismiss()
        }
    }, [user])
    return [appCredentials, uuid]
}


export default useAppCredentials