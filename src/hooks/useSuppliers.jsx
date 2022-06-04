import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { URL_SUPPLIERS } from "../services/api"
import useToken from "./useToken"

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [user, uuid, checkSessionStatus] = useToken()

  const getSuppliers = async () => {
    const toastLoading = toast.loading("Cargando...", {
      id: "loadingSuppliers",
    })
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
      const response = await fetch(URL_SUPPLIERS, requestOptions)
      await checkSessionStatus(response.status)
      const data = await response.json()
      setSuppliers(data)
      toast.dismiss(toastLoading)
    } catch (e) {
      toast.dismiss()
      toast.error("Error al cargar proveedores")
    }
  }
  useEffect(() => {
    if (user) {
      getSuppliers()
    }
  }, [user])

  const addSupplier = async ({ nrc, supplierName, actions }) => {
    const date = new Date().toISOString()

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        Authorization: user?.token_type + " " + user?.access_token,
        uuid: uuid,
      },
      body: JSON.stringify([
        {
          nombre: supplierName,
          nrc: nrc,
          guardado: date,
          id: 0,
        },
      ]),
    }

    try {
      const toastLoading = toast.loading("Añadiendo proveedor...", {
        id: "addingSupplier",
      })
      const response = await fetch(URL_SUPPLIERS, requestOptions)
      await checkSessionStatus(response.status)

      if (response.status === 200) {
        setSuppliers((state) => [
          ...state,
          {
            nombre: supplierName,
            nrc: nrc,
            guardado: date,
            id: 0,
          },
        ])
        actions.setFormData((state) => ({
          ...state,
          supplier: supplierName,
          supplierName: "",
        }))
        actions.isOpen((state) => !state)
        toast.dismiss(toastLoading)
      }
    } catch (err) {
      toast.dismiss()
      actions.setFormData((state) => ({ ...state, supplier: "" }))
      toast.error("Error al agregar proveedor")
    }
  }

  return [suppliers, addSupplier]
}

export default useSuppliers
