import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import formatDate from '../helpers/formatDate'
import { URL_PLREPORT } from '../services/api'
import useToken from './useToken'

const API_URL = (start, finish) => `${URL_PLREPORT}?start=${start}&finish=${finish}`

const initialData = {
    'gastos': {
        "Servicio": 0,
        "Alquiler": 0,
        "Salario": 0,
        "Propina": 0,
        "ISSS": 0,
        "Publicidad": 0,
        "Mantenimiento": 0,
        "Comisión": 0,
        "Otro": 0
    },
    'compras': {
        "compraTotal": 0,
        "compraDeducible": 0
    },
    'tickets': {
        "total": 0,
        "propina": 0
    },
    'iva': {
        "total": 0,
        "deducible": 0
    }
}

const usePLReport = () => {

    const [reportData, setReportData] = useState(initialData)
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
            toast.loading('Cargando...')
            try {
                fetch(API_URL(formatDate(Date.now()), formatDate(Date.now())), requestOptions).then(
                    (response) => {
                        checkSessionStatus(response.status)
                        return response.json()
                    }
                ).then((data) => setReportData(data))
                toast.dismiss()
            } catch (e) {
                toast.dismiss()
                toast.error('Error al cargar reporte')
            }

        }

    }, [user])

    const getPLData = async ({ start, finish }) => {
        toast.loading('Cargando...')
        try {
            const response = await fetch(API_URL(formatDate(start), formatDate(finish)), requestOptions)
            const data = await response.json()
            setReportData(data) 
            toast.dismiss()

        } catch (e) { 
            toast.dismiss()
            toast.error('Error al cargar reporte')
        }
    }
    return [reportData, getPLData]
}

export default usePLReport