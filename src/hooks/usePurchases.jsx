import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import formatDate, { formatDateES } from "../helpers/formatDate"
import { URL_PURCHASES } from "../services/api"
import useToken from "./useToken"
import { round } from "../helpers/round"

const API_URL = (start, finish) =>
  `${URL_PURCHASES}?start=${start}&finish=${finish}`

const usePurchases = (executeUseEffect = true) => {
  const [purchases, setPurchases] = useState([])
  const [user, uuid, checkSessionStatus] = useToken()
  const [filters, setFilters] = useState({
    doc: [],
    type: [],
  })

  const [filteredData, setFilteredData] = useState(purchases)

  const [filtersToApply, setFiltersToApply] = useState({
    doc: [],
    type: [],
  })

  const [csvPurchases, setCsvPurchases] = useState([])

  const getCsvPurchases = () => {
    let data = []
    const result = purchases.filter(
      (row) => row.documento !== "Consumidor Final"
    )
    if (result.length === 0) {
      toast.error("No hay datos para descargar")
      return false
    }

    for (let purchase of result) {
      data.push([
        formatDateES(purchase.fecha),
        purchase.tipoId,
        `${0}${purchase.documentoId}`,
        purchase.referencia,
        purchase.nrc.replace("-", ""),
        purchase.nombre,
        round(purchase.comInEx, 2),
        round(purchase.intExNoSuj, 2),
        round(purchase.imExNoSuj, 2),
        round(purchase.comInGra, 2),
        round(purchase.inGraBie, 2),
        round(purchase.imGravBie, 2),
        round(purchase.imGravSer, 2),
        round(purchase.iva, 2),
        round(purchase.compra, 2),
        purchase.dui.replace("-", ""),
        purchase.attachmentId,
      ])
    }
    setCsvPurchases(data)
  }

  const getPurchases = async ({ start, end }) => {
    const startDate = formatDate(start)
    const endDate = formatDate(end)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET",
        Authorization: user?.token_type + " " + user?.access_token,
        uuid: uuid,
      },
    }
    try {
      const toadLoading = toast.loading("Cargando...", { id: "loading" })
      const response = await fetch(API_URL(startDate, endDate), requestOptions)
      checkSessionStatus(response.status)
      const data = await response.json()
      toast.dismiss(toadLoading)
      setPurchases(data)
    } catch (e) {
      toast.dismiss()
      toast.error("Error al obtener registros")
    }
  }

  useEffect(() => {
    if (user && executeUseEffect) {
      getPurchases({ start: Date.now(), end: Date.now() })
    }
  }, [user])

  useEffect(() => {
    let documentsList = []
    let typesList = []
    setFilteredData(purchases)

    purchases.map((obj) => {
      if (documentsList.indexOf(obj.documento.value) === -1) {
        documentsList.push(obj.documento)
      }
      if (typesList.indexOf(obj.tipo.value) === -1) {
        typesList.push(obj.tipo)
      }
    })

    let uniqueTypes = [...new Set(typesList)]
    let uniqueDocuments = [...new Set(documentsList)]

    typesList.length = 0
    documentsList.length = 0

    uniqueTypes.map((value) => {
      typesList.push({ value: value, label: value })
    })

    uniqueDocuments.map((value) => {
      documentsList.push({ value: value, label: value })
    })

    setFilters({ ...filters, doc: documentsList, type: typesList })
  }, [purchases])

  useEffect(() => {
    let toFilter = purchases.filter((item) => {
      for (let filter of filtersToApply.doc) {
        if (item.documento === filter) {
          return true
        }
      }

      for (let filter of filtersToApply.type) {
        if (item.tipo === filter) {
          return true
        }
      }
      if (filtersToApply.doc.length === 0 && filtersToApply.type.length === 0) {
        return true
      }
    })
    setFilteredData(toFilter)
  }, [filtersToApply])

  const deletePurchase = async ({ id }) => {
    let url = URL_PURCHASES + "?comprasId=" + id

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        Authorization: user?.token_type + " " + user?.access_token,
        uuid: uuid,
      },
    }

    try {
      const toastDel = toast.loading("Borrando...", { id: "deleting" })
      const response = await fetch(url, requestOptions)
      checkSessionStatus(response.status)
      const data = await response.json()
      toast.dismiss(toastDel)
      if (data > 0) {
        toast.success("Registro eliminado", { id: "deleted" })
      }
    } catch (e) {
      toast.dismiss()
      toast.error("Error al eliminar registro")
    }
  }

  const addPurchases = async ({ data, action }) => {
    if (data.length > 0) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          Authorization: user?.token_type + " " + user?.access_token,
          uuid: uuid,
        },
        body: JSON.stringify(data),
      }

      try {
        const addingPurchases = toast.loading("Guardando compras...", {
          id: "addingPurchases",
        })
        const response = await fetch(URL_PURCHASES, requestOptions)
        checkSessionStatus(response.status)
        const data = await response.json()
        toast.dismiss(addingPurchases)
        if (data > 0) {
          toast.success("Compras guardadas", { id: "purchases" })
          action([])
          localStorage.setItem("compras", JSON.stringify([]))
        }
      } catch (err) {
        toast.dismiss()
        toast.error("Error al guardar compras", {
          id: "purchasesError",
        })
      }
    } else {
      toast.error("No hay compras que guardar", { id: "purchasesError" })
    }
  }

  const filterData = (e, source) => {
    let array = []

    if (e.length === 0) {
      setFiltersToApply({ ...filtersToApply, [source]: [] })
    }
    e.map((item) => {
      array.push(item.value)

      setFiltersToApply({ ...filtersToApply, [source]: array })
    })
  }

  return {
    addPurchases,
    purchases,
    getPurchases,
    deletePurchase,
    filters,
    filterData,
    filteredData,
    getCsvPurchases,
    csvPurchases,
  }
}

export default usePurchases
