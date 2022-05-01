import React from "react"
import toast from "react-hot-toast"
import { URL_CHANGEPASSWORD } from "../services/api"
import useToken from "./useToken"

const useModifyUser = () => {
  const [user, uuid, checkSessionStatus] = useToken()

  const changePassword = async ({ data }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        Authorization: user.token_type + " " + user.access_token,
      },
      body: JSON.stringify(data),
    }

    toast.loading("Cambiando contraseña...")
    try {
      const response = await fetch(URL_CHANGEPASSWORD, requestOptions)
      const dataResponse = await response.json()
      if (response.status !== 200) throw new Error(dataResponse.detail)
      toast.dismiss()
      toast.success("Contraseña actualizada")
      return dataResponse
    } catch (e) {
      toast.dismiss()
      toast.error("Error al actualizar contraseña: " + e)
      return e
    }
  }

  return { changePassword }
}

export default useModifyUser
