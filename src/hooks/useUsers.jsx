import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { URL_USERS } from '../services/api'
import useToken from './useToken'

const useUsers = () => {

    const [users, setUsers] = useState([])
    const [user, uuid, checkSessionStatus] = useToken()

    const getUsers = async () => {
        // const user = JSON.parse(window.localStorage.getItem('user'))

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,GET',
                'Authorization': user.token_type + ' ' + user.access_token
            },
        }

        fetch(URL_USERS, requestOptions)
            .then(response => {
                checkSessionStatus(response.status)
                return response.json()
            })
            .then(data => {
                let arrayItems = []
                for (let item of data) {
                    let itemObject = { ...item, action: <button>sa</button> }
                    arrayItems.push(itemObject)
                }
                setUsers(arrayItems)
            })
    }
    useEffect(() => {
        if (user) {
            getUsers()
        }
    }, [user])

    const updateUser = async (data) => {
        // const user = JSON.parse(window.localStorage.getItem('user'))

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,GET,PATCH',
                'Authorization': user.token_type + ' ' + user.access_token
            },
            body: JSON.stringify(data)
        }

        toast.loading('Modificando usuario...')
        try {
            const response = await fetch(URL_USERS, requestOptions)
            checkSessionStatus(response.status)
            const dataResponse = await response.json()
            if (response.status !== 200)
                throw new Error(dataResponse.detail)
            toast.dismiss()
            toast.success('Usuario actualizado')
            getUsers()
            return dataResponse
        } catch (e) {
            toast.dismiss()
            toast.error('Error al actualizar usuario: ' + e)
            return e
        }
    }

    const deleteUser = async (data) => {
        // const user = JSON.parse(window.localStorage.getItem('user'))

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,GET,PATCH',
                'Authorization': user.token_type + ' ' + user.access_token
            },
            body: JSON.stringify(data)
        }

        toast.loading('Eliminando usuario...')
        try {
            const response = await fetch(URL_USERS, requestOptions)
            checkSessionStatus(response.status)
            const dataResponse = await response.json()
            if (response.status !== 200)
                throw new Error(dataResponse.detail)
            toast.dismiss()
            toast.success('Usuario eliminado')
            getUsers()
            return dataResponse
        } catch (e) {
            toast.dismiss()
            toast.error('Error al eliminar usuario: ' + e)
            return e
        }

    }

    return [users, updateUser, deleteUser]
}

export default useUsers