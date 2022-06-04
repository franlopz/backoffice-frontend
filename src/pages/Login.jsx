import React, { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { RiArrowRightCircleLine } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router"
import useAuth from "../hooks/useAuth"

const Login = () => {
  const { authUser, state } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/"
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    keepsession: false,
  })

  const statusIcon = {
    loging: (
      <AiOutlineLoading
        className={`animate-spin absolute right-2 top-1 w-8 h-8`}
      />
    ),
    loaded: (
      <RiArrowRightCircleLine
        className={`absolute right-2 top-1 w-8 h-8 
                    ${
                      formData.password && formData.username !== ""
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
      />
    ),
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = await authUser({ formData: formData })
    if (user) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="h-screen w-screen flex bg-blue-200 bg-opacity-10">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="m-6">Iniciar sesión en TechPOS</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              className="h-10 w-80 rounded-t-md pl-2 border shadow-sm outline-blue-600"
              type="email"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              required={true}
              placeholder="Cuenta de sesión"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <div className="relative h-10 w-80">
              <input
                className="w-full h-full rounded-b-md pl-2 border shadow-sm outline-blue-600"
                type="password"
                autoComplete="off"
                required={true}
                placeholder="Contraseña"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
              <button
                disabled={
                  formData.password || formData.username !== "" ? false : true
                }
              >
                {statusIcon[state]}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
