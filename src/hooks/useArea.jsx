import { useEffect, useState } from 'react'
import { URL_CITIES } from '../services/api'
import useToken from './useToken'

const useArea = () => {

    const [areas, setAreas] = useState([])
    const [cities, setCities] = useState([])
    const [user, uuid, checkSessionStatus] = useToken()

    useEffect(() => {
        if (user) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Authorization': user.token_type + ' ' + user.access_token
                },
            }
            fetch(URL_CITIES, requestOptions)
                .then(response => {
                    checkSessionStatus(response.status)
                    return response.json()
                })
                .then(data => {
                    setAreas(data)
                })
        }
    }, [user])

    return [areas, cities, setCities]
}

export default useArea