import React, { useRef, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { registerLocale } from "react-datepicker"
import es from "date-fns/locale/es"
registerLocale("es", es)
import InputDatePicker from "../../components/InputDatePicker"
import RefreshButton from "../../components/refreshButton/RefreshButton"
import usePurchases from "../../hooks/usePurchases"
import Table from "../../components/Table"
import Selectpkg from "react-select"
import { CSVLink } from "react-csv"
import formatDate, { formatDateDashES } from "../../helpers/formatDate"

const tableHeader = [
  "Fecha",
  "Documento",
  "Tipo",
  "Descripción/Referencia",
  "NRC",
  "Proveedor",
  "Total",
  "IVA",
  "DUI",
  "Compras internas exentas",
  "Internaciones exentas y/o no sujetas",
  "importaciones exentas y/o no sujetas",
  "Internaciones gravadas de bienes",
  "Importaciones gravadas de bienes",
  "Importaciones gravadas de servicios",
]

const tableColumns = [
  "fecha",
  "documento",
  "tipo",
  "referencia",
  "nrc",
  "nombre",
  "compra",
  "iva",
  "dui",
  "comInEx",
  "intExNoSuj",
  "imExNoSuj",
  "inGraBie",
  "imGravBie",
  "imGravSer",
]

const csvHeaders = [
  { label: "Fecha", key: "fecha" },
  { label: "Documento", key: "documento" },
  { label: "Tipo", key: "tipo" },
  { label: "Referencia", key: "referencia" },
  { label: "NRC/NIT", key: "nrc" },
  { label: "Nombre", key: "nombre" },
  { label: "Total", key: "compra" },
  { label: "IVA", key: "iva" },
  { label: "DUI", key: "dui" },
  { label: "Compras internas exentas", key: "comInEx" },
  { label: "Internaciones exentas no sujetas", key: "intExNoSuj" },
  { label: "Importaciones excentas no sujetas", key: "imExNoSuj" },
  { label: "Internaciones grabadas de bienes", key: "inGraBie" },
  { label: "Importaciones grabadas de bienes", key: "imGravBie" },
  { label: "Importaciones grabadas de servicios", key: "imGravSer" },
]
const headers = [{ key: "fecha" }]

const PurchaseReport = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = useRef()
  const {
    getPurchases,
    filters,
    filterData,
    filteredData,
    getCsvPurchases,
    csvPurchases,
  } = usePurchases()

  const handleChange = (e, source) => {
    console.log(e)
    filterData(e, "doc")
    // setFormData((state) => ({
    //   ...state,
    //   [e.target.name]: e.target.value,
    // }))

    // let result = purchases.filter(function (v, i) {
    //   if (e.target.name === "docType") return v["documento"] === e.target.value
    //   // return v["tipo"] == e.target.value
    // })
    // console.log(filteredData.doc, e.target.name, e.target.value, result)
  }

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
          <div className="mx-2 flex flex-col gap-2">
            <Selectpkg
              options={filters.doc}
              isMulti
              onChange={(e) => filterData(e, "doc")}
            />
            <Selectpkg
              options={filters.type}
              isMulti
              onChange={(e) => filterData(e, "type")}
            />
            {/* <Select
              multiple
              labeltext="Documento"
              value={formData.docType}
              name="docType"
              onChange={handleChange}
              data={filteredData.doc}
            />
            <Select
              labeltext="Tipo"
              value={formData.docCategorie}
              name="docCategorie"
              onChange={handleChange}
              data={filteredData.type}
            /> */}
          </div>
          <div className="max-h-[70%]">
            <Table
              title="Lista de compras"
              square={false}
              data={filteredData}
              showHeader={tableHeader}
              columnsToShow={tableColumns}
              activateActions={true}
              withMaxHeight={true}
            />
          </div>
          <div className="flex justify-center items-center mx-2 mt-2 text-center">
            <CSVLink
              data={csvPurchases}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              asyncOnClick={true}
              className="button"
              onClick={getCsvPurchases}
              filename={`compras_iva_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Exportar compras F-07
            </CSVLink>
            <CSVLink
              data={filteredData}
              headers={csvHeaders}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              filename={`compras_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Exportar compras
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseReport
