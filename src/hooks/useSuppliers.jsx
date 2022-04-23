import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { URL_SUPPLIERS } from '../services/api'
import useToken from './useToken'

const useSuppliers = () => {

    const [suppliers, setSuppliers] = useState([])
    const [user, uuid, checkSessionStatus] = useToken()

    useEffect(() => {
        if (user) {
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
            fetch(URL_SUPPLIERS, requestOptions)
                .then((response) => {
                    checkSessionStatus(response.status)
                    return response.json()
                })
                .then((data) => setSuppliers(data))
        }

    }, [user])

    const addSupplier = async ({ nrc, supplierName, actions }) => {
        const date = new Date().toISOString()

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Authorization': user?.token_type + ' ' + user?.access_token,
                'uuid': uuid
            },
            body: JSON.stringify([
                {
                    "nombre": supplierName,
                    "nrc": nrc,
                    "guardado": date,
                    "id": 0
                }
            ])
        }

        try {

            const response = await fetch(URL_SUPPLIERS, requestOptions)
            checkSessionStatus(response.status)

            if (response.status === 200) {
                setSuppliers((state) => [
                    ...state,
                    {
                        "nombre": supplierName,
                        "nrc": nrc,
                        "guardado": date,
                        "id": 0
                    }
                ])
                actions.setFormData((state) => ({ ...state, supplier: supplierName, supplierName: '' }))
                actions.isOpen((state) => !state)
            }
        } catch (err) {
            actions.setFormData((state) => ({ ...state, supplier: '' }))
            toast.error('Error al agregar proveedor: ' + err, { id: 'SuppError' })
        }
    }

    return [suppliers, addSupplier]
}

export default useSuppliers