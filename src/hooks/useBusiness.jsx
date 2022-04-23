import toast from 'react-hot-toast'
import { URL_COMPANIES } from '../services/api'
import useToken from './useToken'

const useBusiness = () => {

    const [user,uuid,checkSessionStatus] = useToken()

    const createBusiness = async ({ data, action }) => {
        if (user) { 
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
                    'Authorization': user.token_type + ' ' + user.access_token
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(URL_COMPANIES, requestOptions)
            checkSessionStatus(response.status)
            const dataResponse = await response.json()

            if (dataResponse.message === 'User saved') {
                toast.success('Empresa agregada')
                action()
            }
        }
    }

    return [createBusiness]
}

export default useBusiness