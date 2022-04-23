import { useEffect, useState } from 'react'
import formateDate from '../helpers/formatDate'
import toast from 'react-hot-toast';
import { URL_SUMMARY } from '../services/api';
import useToken from './useToken';

const API_URL = (start, finish) => `${URL_SUMMARY}?start=${start}&finish=${finish}`

const initialData = {
    "summary": [],
    "bytype": {},
    "byhour": {},
    "bytypeporc": {},
    "bypayment": [],
    "byitem": []
}

const useFetchDashboard = () => {

    const [dashboardData, setDashboardData] = useState(initialData)
    const [user, uuid, checkSessionStatus] = useToken()

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

            const loading = toast.loading('Cargando')
            let today = formateDate(Date.now())
            fetch(API_URL(today, today), requestOptions)
                .then(value => {
                    checkSessionStatus(value.status)
                    return value.json()
                })
                .then(data => setDashboardData(data))
                .then(() => toast.remove(loading))
        }
    }, [user])

    const fetchDashboardData = async ({ start, finish }) => {

        if (!finish || !start) return toast.error('Seleccionar rango de fechas', { id: 'rangeDate' })

        const loading = toast.loading('Cargando')
        const startDate = formateDate(start)
        const endDate = formateDate(finish)
        const response = await fetch(API_URL(startDate, endDate), requestOptions)
        checkSessionStatus(response.status)
        const data = await response.json()
        setDashboardData(data)
        toast.remove(loading)

    }

    return [dashboardData, fetchDashboardData]
}

export default useFetchDashboard