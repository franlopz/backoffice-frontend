import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import formatDate, { formatDateES } from '../helpers/formatDate'
import { URL_NON_TAX_SALES, URL_TICKETS } from '../services/api'
import useToken from './useToken'

const API_URL = (start, finish, URL) => `${URL}?start=${start}&finish=${finish}`
const initialFilters = {
  document: [],
  type: [],
  docType: [],
  seller: [],
  voided: false,
}

const useSales = () => {
  const [sales, setSales] = useState([])
  const [user, uuid, checkSessionStatus] = useToken()
  const [csvData, setCsvData] = useState({
    nonTaxPayer: [],
    taxPayer: [],
    voidedSales: [],
  })
  const [filters, setFilters] = useState(initialFilters)
  const [filtersToApply, setFiltersToApply] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState(sales)

  const requestGetOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET',
      Authorization: user?.token_type + ' ' + user?.access_token,
      uuid: uuid,
    },
  }

  const getSales = async ({ start, end }) => {
    const startDate = formatDate(start)
    const endDate = formatDate(end)

    try {
      const toastLoading = toast.loading('Cargando...', { id: 'loading' })
      const response = await fetch(
        API_URL(startDate, endDate, URL_TICKETS),
        requestGetOptions
      )
      checkSessionStatus(response.status)
      const data = await response.json()
      setSales(data)
      toast.dismiss(toastLoading)
    } catch (err) {
      toast.dismiss()
      toast.error('Error al obtener registros')
    }
  }

  const getCsvSales = async ({ start, end }) => {
    const startDate = formatDate(start)
    const endDate = formatDate(end)
    try {
      const toastLoading = toast.loading('Cargando...', { id: 'loading' })
      const response = await fetch(
        API_URL(startDate, endDate, URL_NON_TAX_SALES),
        requestGetOptions
      )
      checkSessionStatus(response.status)
      const responseSales = await response.json()

      let csvArray = []
      let csvTaxArray = []
      let csvVoidsArray = []

      for (let sale of responseSales.non_tax_payer) {
        csvArray.push(Object.values(sale))
      }

      for (let sale of responseSales.tax_payer) {
        csvTaxArray.push(Object.values(sale))
      }

      for (let sale of responseSales.voided_sales) {
        csvVoidsArray.push(Object.values(sale))
      }
      setCsvData({
        nonTaxPayer: csvArray,
        taxPayer: csvTaxArray,
        voidedSales: csvVoidsArray,
      })
      toast.dismiss(toastLoading)
    } catch (err) {
      toast.dismiss()
      toast.error('Error al obtener registros: ' + err)
    }
  }

  useEffect(() => {
    if (user) {
      getSales({ start: Date.now(), end: Date.now() })
      getCsvSales({ start: Date.now(), end: Date.now() })
    }
  }, [user])

  useEffect(() => {
    let type = []
    let document = []
    let docType = []
    let seller = []
    let voided = false
    setFilteredData(sales)

    sales.map((obj) => {
      if (type.indexOf(obj.tipo.value) === -1) {
        type.push(obj.tipo)
      }
      if (document.indexOf(obj.documento.value) === -1) {
        document.push(obj.documento)
      }
      if (docType.indexOf(obj.docTipo.value) === -1) {
        docType.push(obj.docTipo)
      }
      if (seller.indexOf(obj.mesero.value) === -1) {
        seller.push(obj.mesero)
      }
    })

    let uniqueTypes = [...new Set(type)]
    let uniqueDocuments = [...new Set(document)]
    let uniqueDocTypes = [...new Set(docType)]
    let uniqueSellers = [...new Set(seller)]

    type.length = 0
    document.length = 0
    docType.length = 0
    seller.length = 0

    uniqueTypes.map((value) => {
      type.push({ value: value, label: value })
    })
    uniqueDocuments.map((value) => {
      document.push({ value: value, label: value })
    })
    uniqueDocTypes.map((value) => {
      docType.push({ value: value, label: value })
    })
    uniqueSellers.map((value) => {
      seller.push({ value: value, label: value })
    })

    setFilters({
      ...filters,
      type: type,
      document: document,
      docType: docType,
      seller: seller,
    })
  }, [sales])

  const filterData = (e, source) => {
    let array = []
    if (e.length === 0) {
      setFiltersToApply({ ...filtersToApply, [source]: [] })
    }

    if (source !== 'voided') {
      e.map((item) => {
        array.push(item.value)
        setFiltersToApply({ ...filtersToApply, [source]: array })
      })
    } else {
      setFilters({ ...filters, voided: !filters.voided })
      setFiltersToApply({ ...filtersToApply, [source]: !filters.voided })
    }
  }
  useEffect(() => {
    let toFilter = sales.filter((item) => {
      if (
        filtersToApply.document.length === 0 &&
        filtersToApply.type.length === 0 &&
        filtersToApply.docType.length === 0 &&
        filtersToApply.seller.length === 0
      ) {
        return true
      }

      for (let filter of filtersToApply.document) {
        if (item.documento === filter) {
          return true
        }
      }
      for (let filter of filtersToApply.type) {
        if (item.tipo === filter) {
          return true
        }
      }
      for (let filter of filtersToApply.docType) {
        if (item.docTipo === filter) {
          return true
        }
      }
      for (let filter of filtersToApply.seller) {
        if (item.mesero === filter) {
          return true
        }
      }
    })

    let voidedFilter = toFilter.filter((item) => {
      if (item.anulado === 'Si' && filtersToApply.voided) {
        return true
      }
      if (item.anulado === '' && filtersToApply.voided == false) {
        return true
      }
    })
    setFilteredData(voidedFilter)
  }, [filtersToApply])

  return {
    sales,
    getSales,
    csvData,
    getCsvSales,
    filters,
    filterData,
    filteredData,
  }
}

export default useSales
