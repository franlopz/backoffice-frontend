import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { URL_USERS, URL_COMPANIES } from '../services/api'
import useToken from './useToken'

const initialData = {
    companies: [],
    roles: []
}
const useNewUser = () => {

    const [data, setData] = useState(initialData)
    const [user, uuid, checkSessionStatus] = useToken()

    useEffect(() => {
        if (user) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,GET',
                    'Authorization': user.token_type + ' ' + user.access_token
                },
            }

            fetch(URL_COMPANIES, requestOptions)
                .then(response => {
                    checkSessionStatus(response.status)
                    return response.json()
                })
                .then(data => setData(data))
        }

    }, [user])

    const getMessage = (type, action) => {

        const messages = {
            'User saved': function () {
                toast.success('Usuario creado', { id: 'userCreated' })
                action()
            },
            'Email already registered.': function () {
                toast.error('Email ya registrado', { id: 'EmailAlreadyRegistered' })
            },
            'Company not registered': function () {
                toast.error('Empresa no registrada', { id: 'companyNotRegistered' })
            },
            'Invalid role': function () {
                toast.error('Rol inválido', { id: 'invalidRole' })
            },
            'Forbidden transaction': function () {
                toast.error('Acción no permitida', { id: 'forbiddenAction' })
            },
            'First name or last name empty': function () {
                toast.error('Nombres o apellidos vacios', { id: 'emptyNames' })
            },
            'Email empty': function () {
                toast.error('Email vacío', { id: 'emptyEmail' })
            },
            'default': function () {
                toast.error('Error al guardar usuario', { id: 'error' })
            }
        }
        return (messages[type] || messages['default'])();
    }

    const createUser = async (data, action) => {

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

        try {
            toast.loading('Creando usuario...', { id: 'userCreation' })
            const response = await fetch(URL_USERS, requestOptions)
            checkSessionStatus(response.status)
            const dataResponse = await response.json()
            toast.dismiss()
            getMessage(dataResponse.message, action)
        } catch (e) {
            toast.dismiss()
            toast.error('Error al crear usuario: ' + e)
        }


        // if (dataResponse.message === 'User saved') {
        //     toast.success('Usuario creado')
        //     action()
        // } 
    }

    return [data, createUser]

}

export default useNewUser