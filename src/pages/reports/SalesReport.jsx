import React, { useRef, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { registerLocale } from "react-datepicker"
import es from "date-fns/locale/es"
import InputDatePicker from "../../components/InputDatePicker"
import RefreshButton from "../../components/refreshButton/RefreshButton"
registerLocale("es", es)

const SalesReport = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = useRef()

  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />
      <div className="w-full mb-12 lg:pl-60">
        <div className="flex flex-col mx-2 mt-12 lg:mt-0 h-full">
          <div className="relative flex justify-end mr-2">
            <div className="w-60">
              <DatePicker
                locale="es"
                todayButton="Hoy"
                customInput={<InputDatePicker ref={ref} labeltext={"Fecha"} />}
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
              onClick={() => getPurchases({ start: startDate, end: endDate })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SalesReport
