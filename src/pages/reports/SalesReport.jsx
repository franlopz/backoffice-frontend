import React, { useRef, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { registerLocale } from "react-datepicker"
import es from "date-fns/locale/es"
import InputDatePicker from "../../components/InputDatePicker"
import RefreshButton from "../../components/refreshButton/RefreshButton"
import Table from "../../components/Table"
import useSales from "../../hooks/useSales"
import Select from "react-select"
import { CSVLink } from "react-csv"
import { formatDateDashES } from "../../helpers/formatDate"
import toast from "react-hot-toast"
registerLocale("es", es)

const tableHeader = [
  "Fecha",
  "Hora",
  "Tipo",
  "Documento",
  "Correlativo",
  "total",
  "Impuesto",
  "Descuento",
  "Propina",
  "Domicilio",
  "Tipo de doc",
  "Serie",
  "Resolución",
  "Vendedor",
]

const tableColumns = [
  "fecha",
  "hora",
  "tipo",
  "documento",
  "correlativo",
  "total",
  "tax",
  "descuentoTotal",
  "propina",
  "servicioDomicilio",
  "docTipo",
  "docSerie",
  "numResolucion",
  "mesero",
]

const SalesReport = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const { getSales, csvData, getCsvSales, filters, filterData, filteredData } =
    useSales()

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
              onClick={() => {
                getSales({ start: startDate, end: endDate })
                getCsvSales({ start: startDate, end: endDate })
              }}
            />
          </div>

          <div className="mx-2 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Select
                className="w-full"
                placeholder="Documento"
                options={filters.document}
                isMulti
                onChange={(e) => filterData(e, "document")}
              />
              <Select
                className="w-full"
                placeholder="Tipo"
                options={filters.type}
                isMulti
                onChange={(e) => filterData(e, "type")}
              />
              <div className="w-52">
                <label>
                  Anulado
                  <input
                    type="checkbox"
                    className="ml-1"
                    checked={filters.voided}
                    onChange={(e) => filterData(e, "voided")}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <Select
                className="w-full"
                placeholder="Vendedor"
                options={filters.seller}
                isMulti
                onChange={(e) => filterData(e, "seller")}
              />
              <Select
                className="w-full"
                placeholder="Tipo de doc"
                options={filters.docType}
                isMulti
                onChange={(e) => filterData(e, "docType")}
              />
            </div>
          </div>
          <div className="max-h-[68%]">
            <Table
              title="Lista de ventas"
              square={false}
              data={filteredData}
              showHeader={tableHeader}
              columnsToShow={tableColumns}
              activateActions={true}
              withMaxHeight={true}
            />
          </div>
          <div className="flex mx-2 mt-2 text-center">
            <CSVLink
              data={csvData.nonTaxPayer}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              onClick={() => {
                if (csvData.nonTaxPayer.length === 0) {
                  toast.error("No hay datos para descargar")
                  return false
                }
              }}
              filename={`ventas_consumidor_final_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Descargar anexo ventas a consumidor final
            </CSVLink>
            <CSVLink
              data={csvData.taxPayer}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              onClick={() => {
                if (csvData.taxPayer.length === 0) {
                  toast.error("No hay datos para descargar")
                  return false
                }
              }}
              filename={`ventas_contribuyente_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Descargar anexo ventas a contribuyentes
            </CSVLink>
            <CSVLink
              data={csvData.voidedSales}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              onClick={() => {
                if (csvData.voidedSales.length === 0) {
                  toast.error("No hay datos para descargar")
                  return false
                }
              }}
              filename={`anulaciones_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Descargar anexo ventas anuladas
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SalesReport
