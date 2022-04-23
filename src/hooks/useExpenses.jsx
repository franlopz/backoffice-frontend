import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import formatDate from '../helpers/formatDate'
import { URL_EXPENSES } from '../services/api'
import useToken from './useToken'

const API_URL = (start, finish) => `${URL_EXPENSES}?start=${start}&finish=${finish}`

const useExpenses = () => {

    const [expenses, setExpenses] = useState([])
    const [user, uuid, checkSessionStatus] = useToken()

    const getExpenses = async ({ start, end }) => {
        const startDate = formatDate(start)
        const endDate = formatDate(end)
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
        try {
            const toadLoading = toast.loading('Cargando...', { id: 'loading' })
            const response = await fetch(API_URL(startDate, endDate), requestOptions)
            checkSessionStatus(response.status)
            const data = await response.json()
            toast.dismiss(toadLoading)
            setExpenses(data)
        } catch (err) {
            toast.dismiss()
            toast.error('Error al obtener registros: ' + err)
        }
    }

    const deleteExpenses = async ({ id }) => {

        let url = URL_EXPENSES + '?gastosId=' + id

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE',
                'Authorization': user?.token_type + ' ' + user?.access_token,
                'uuid': uuid
            },
        }

        try {
            const toastDel = toast.loading('Borrando...', { id: 'deleting' })
            const response = await fetch(url, requestOptions)
            checkSessionStatus(response.status)
            const data = await response.json()
            toast.dismiss(toastDel)
            if (data > 0) {
                toast.success('Registro eliminado', { id: 'deleted' })
            }
        } catch (err) {
            toast.dismiss()
            toast.error('Error al eliminar registro: ' + err)
        }
    }

    const addExpenses = async ({ data, action }) => {

        if (data.length > 0) {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Authorization': user?.token_type + ' ' + user?.access_token,
                    'uuid': uuid
                },
                body: JSON.stringify(data)
            }

            try {
                const addingExpenses = toast.loading('Guardando gastos...', { id: 'addingExpenses' })
                const response = await fetch(URL_EXPENSES, requestOptions);
                checkSessionStatus(response.status)
                const data = await response.json();
                toast.dismiss(addingExpenses)
                if (data > 0) {
                    toast.success('Gastos guardadas', { id: 'expenses' })
                    action([])
                    localStorage.setItem('gastos', JSON.stringify([]))

                }
            } catch (err) {
                toast.dismiss()
                toast.error('Error al guardar gastos: ' + err, { id: 'expensesError' })
            }
        } else {
            toast.error('No hay gastos que guardar', { id: 'expensesError' })
        }
    }

    return { addExpenses, expenses, getExpenses, deleteExpenses }


}



export default useExpenses