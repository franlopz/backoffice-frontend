import { Routes, Route } from "react-router-dom"
import "./App.css"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import Compras from "./pages/Compras"
import RequiredAuth from "./components/requireAuth"
import Users from "./pages/Users"
import Expenses from "./pages/Expenses"
import Settings from "./pages/Settings"
import ProfitAndLoss from "./pages/reports/ProfitAndLossReport"
import PurchaseReport from "./pages/reports/PurchaseReport"
import SalesReport from "./pages/reports/SalesReport"

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequiredAuth redirectTo="/login">
              <Dashboard />
            </RequiredAuth>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RequiredAuth redirectTo="/login">
              <Users />
            </RequiredAuth>
          }
        />
        <Route
          path="/compras"
          element={
            <RequiredAuth redirectTo="/login">
              <Compras />
            </RequiredAuth>
          }
        />
        <Route
          path="/gastos"
          element={
            <RequiredAuth redirectTo="/login">
              <Expenses />
            </RequiredAuth>
          }
        />
        <Route
          path="/ajustes"
          element={
            <RequiredAuth redirectTo="/login">
              <Settings />
            </RequiredAuth>
          }
        />
        <Route
          path="/reporte/ganancias"
          element={
            <RequiredAuth redirectTo="/login">
              <ProfitAndLoss />
            </RequiredAuth>
          }
        />
        <Route
          path="/reporte/compras"
          element={
            <RequiredAuth redirectTo="/login">
              <PurchaseReport />
            </RequiredAuth>
          }
        />
        <Route
          path="/reporte/ventas"
          element={
            <RequiredAuth redirectTo="/login">
              <SalesReport />
            </RequiredAuth>
          }
        />
      </Routes>
    </>
  )
}

export default App
