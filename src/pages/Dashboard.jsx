import React, { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import Card from '../components/Card'
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import useFetchDashboard from '../hooks/useFetchDashboard'
import Table from '../components/Table'
import formatObjChart from '../helpers/formatObjChart'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
registerLocale('es', es)
import 'react-datepicker/dist/react-datepicker.css'
import InputDatePicker from '../components/InputDatePicker'
import RefreshButton from '../components/refreshButton/RefreshButton'
import Sidebar from '../components/sidebar/Sidebar'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartsStyle = 'shadow-lg rounded-lg m-2 border bg-white'

const ItemsColumnsToShow = ['producto', 'precio', 'cantidad', 'porcentaje']
const paymentColumnsToShow = ['tipo', 'pago', 'iva']

const Dashboard = () => {
  const [dashboardData, fetchDashboardData] = useFetchDashboard()
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = React.useRef()
  const options = ({ title, maintainAspectRatio = true }) => {
    return {
      responsive: true,
      maintainAspectRatio: maintainAspectRatio,
      layout: {
        padding: 20,
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
    }
  }

  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />
      <div className="w-full lg:ml-60">
        <div className="relative flex justify-end mr-2 mt-12 lg:mt-0">
          <div className="w-58">
            <DatePicker
              locale="es"
              todayButton="Hoy"
              customInput={<InputDatePicker ref={ref} labeltext={'Fecha'} />}
              selectsRange={true}
              peekNextMonth
              showMonthDropdown
              useShortMonthInDropdown
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update)
              }}
            />
          </div>
          <RefreshButton
            startDate={startDate}
            endDate={endDate}
            onClick={() =>
              fetchDashboardData({
                start: startDate,
                finish: endDate,
              })
            }
          />
        </div>

        <div className=" m-2 gap-2 sm:grid grid-cols-2 lg:flex ">
          {dashboardData?.summary?.map((data) => {
            return <Card key={data.label} data={data} />
          })}
        </div>
        <div className="sm:grid grid-cols-3">
          <div className="relative w-full">
            {Object.keys(dashboardData?.bytype).length === 0 ? (
              <p className="absolute top-1/2 text-center w-full">Sin datos</p>
            ) : null}
            <Pie
              className={chartsStyle}
              options={options({ title: 'VENTAS POR TIPO EN %' })}
              data={formatObjChart({
                data: dashboardData?.bytypeporc,
                dataLabel: 'Por hora',
              })}
            />
          </div>
          <div className="relative w-full">
            <Table
              data={dashboardData?.bypayment}
              title="DETALLE DE PAGOS"
              columnsToShow={paymentColumnsToShow}
            />
          </div>
          <div className="relative w-full">
            {Object.keys(dashboardData?.bytype).length === 0 ? (
              <p className="absolute top-1/2 text-center w-full">Sin datos</p>
            ) : null}
            <Pie
              className={chartsStyle}
              options={options({ title: 'VENTAS POR TIPO' })}
              data={formatObjChart({
                data: dashboardData?.bytype,
                dataLabel: 'Por hora',
              })}
            />
          </div>
        </div>
        <div className="sm:grid grid-cols-2">
          <div className="relative w-full">
            <Bar
              className={chartsStyle}
              options={options({
                title: 'VENTAS POR HORA',
              })}
              data={formatObjChart({
                data: dashboardData?.byhour,
                dataLabel: 'Por hora',
                singleColor: true,
              })}
            />
          </div>
          <div className="relative w-full">
            <Table
              data={dashboardData?.byitem}
              square={false}
              columnsToShow={ItemsColumnsToShow}
              title="DETALLE DE PRODUCTOS"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
