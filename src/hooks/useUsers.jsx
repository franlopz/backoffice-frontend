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
        Authorization: user.token_type + ' ' + user.access_token,
      },
    }
    let arrayItems = []
    const toastLoading = toast.loading('Cargando...', { id: 'loading' })
    try {
      const response = await fetch(URL_USERS, requestOptions)
      await checkSessionStatus(response.status)
      const data = await response.json()
      for (let item of data) {
        let itemObject = { ...item }
        if (item.status === 'active') {
          itemObject.status = (
            <div className="flex gap-2">
              <span className=" bg-green-600 w-5 h-5 rounded-full"></span>
              <p>Activo </p>
            </div>
          )
        }
        if (item.status === 'inactive') {
          itemObject.status = (
            <div className="flex gap-2">
              <span className=" bg-red-600 w-5 h-5 rounded-full"></span>
              <p>Activo </p>
            </div>
          )
        }
        arrayItems.push(itemObject)
      }
      setUsers(arrayItems)
      toast.dismiss(toastLoading)
    } catch (e) {
      toast.dismiss()
      toast.error('Error al cargar usuarios')
    }
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
        Authorization: user.token_type + ' ' + user.access_token,
      },
      body: JSON.stringify(data),
    }

    toast.loading('Modificando usuario...')
    try {
      const response = await fetch(URL_USERS, requestOptions)
      await checkSessionStatus(response.status)
      const dataResponse = await response.json()
      if (response.status !== 200) throw new Error(dataResponse.detail)
      toast.dismiss()
      toast.success('Usuario actualizado')
      await getUsers()
      return dataResponse
    } catch (e) {
      toast.dismiss()
      toast.error('Error al actualizar usuario:')
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
        Authorization: user.token_type + ' ' + user.access_token,
      },
      body: JSON.stringify(data),
    }

    toast.loading('Eliminando usuario...')
    try {
      const response = await fetch(URL_USERS, requestOptions)
      await checkSessionStatus(response.status)
      const dataResponse = await response.json()
      if (response.status !== 200) throw new Error(dataResponse.detail)
      toast.dismiss()
      toast.success('Usuario eliminado')
      await getUsers()
      return dataResponse
    } catch (e) {
      toast.dismiss()
      toast.error('Error al eliminar usuario')
      return e
    }
  }

  return [users, updateUser, deleteUser]
}

export default useUsers
