import React from "react"
import { Navigate, useLocation } from "react-router"
import useAuth from "../hooks/useAuth"

const RequiredAuth = ({ children, redirectTo }) => {
  const { user, state } = useAuth()
  const location = useLocation()
  if (state === "loading") return <></>

  return user ? (
    children
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  )
}

export default RequiredAuth
