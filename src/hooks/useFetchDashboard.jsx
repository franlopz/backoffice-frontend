import { useEffect, useState } from 'react'
import formateDate from '../helpers/formatDate'
import toast from 'react-hot-toast'
import { URL_SUMMARY } from '../services/api'
import useToken from './useToken'

const API_URL = (start, finish) =>
  `${URL_SUMMARY}?start=${start}&finish=${finish}`

const initialData = {
  summary: [],
  bytype: {},
  byhour: {},
  bytypeporc: {},
  bypayment: [],
  byitem: [],
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
      Authorization: user?.token_type + ' ' + user?.access_token,
      uuid: uuid,
    },
  }

  const fetchDashboardData = async ({ start, finish }) => {
    if (!finish || !start)
      return toast.error('Seleccionar rango de fechas', { id: 'rangeDate' })

    const loading = toast.loading('Cargando')
    try {
      const startDate = formateDate(start)
      const endDate = formateDate(finish)
      const response = await fetch(API_URL(startDate, endDate), requestOptions)
      checkSessionStatus(response.status)
      const data = await response.json()
      setDashboardData(data)
      toast.remove(loading)
    } catch (e) {
      toast.dismiss()
      toast.error('Error al cargar datos')
    }
  }

  useEffect(() => {
    if (user) {
      let today = Date.now()
      fetchDashboardData({ start: today, finish: today })
    }
  }, [user])
  return [dashboardData, fetchDashboardData]
}

export default useFetchDashboard
