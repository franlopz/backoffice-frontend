import React, { useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
registerLocale('es', es)
import InputDatePicker from '../../components/InputDatePicker'
import RefreshButton from '../../components/refreshButton/RefreshButton'
import usePurchases from '../../hooks/usePurchases'
import Table from '../../components/Table'
import Select from 'react-select'
import { CSVLink } from 'react-csv'
import formatDate, { formatDateDashES } from '../../helpers/formatDate'
import toast from 'react-hot-toast'

const tableHeader = [
  'Fecha',
  'Documento',
  'Tipo',
  'Descripción/Referencia',
  'NRC',
  'Proveedor',
  'Total',
  'IVA',
  'DUI',
  'Compras internas exentas',
  'Internaciones exentas y/o no sujetas',
  'importaciones exentas y/o no sujetas',
  'Internaciones gravadas de bienes',
  'Importaciones gravadas de bienes',
  'Importaciones gravadas de servicios',
]

const tableColumns = [
  'fecha',
  'documento',
  'tipo',
  'referencia',
  'nrc',
  'nombre',
  'compra',
  'iva',
  'dui',
  'comInEx',
  'intExNoSuj',
  'imExNoSuj',
  'inGraBie',
  'imGravBie',
  'imGravSer',
]

const csvHeaders = [
  { label: 'Fecha', key: 'fecha' },
  { label: 'Documento', key: 'documento' },
  { label: 'Tipo', key: 'tipo' },
  { label: 'Referencia', key: 'referencia' },
  { label: 'NRC/NIT', key: 'nrc' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Total', key: 'compra' },
  { label: 'IVA', key: 'iva' },
  { label: 'DUI', key: 'dui' },
  { label: 'Compras internas exentas', key: 'comInEx' },
  { label: 'Internaciones exentas no sujetas', key: 'intExNoSuj' },
  { label: 'Importaciones excentas no sujetas', key: 'imExNoSuj' },
  { label: 'Internaciones grabadas de bienes', key: 'inGraBie' },
  { label: 'Importaciones grabadas de bienes', key: 'imGravBie' },
  { label: 'Importaciones grabadas de servicios', key: 'imGravSer' },
]
const headers = [{ key: 'fecha' }]

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
              onClick={() => getPurchases({ start: startDate, end: endDate })}
            />
          </div>
          <div className="mx-2 flex flex-col gap-2">
            <Select
              placeholder="Documento"
              options={filters.doc}
              isMulti
              onChange={(e) => filterData(e, 'doc')}
            />
            <Select
              placeholder="Tipo"
              options={filters.type}
              isMulti
              onChange={(e) => filterData(e, 'type')}
            />
          </div>
          <div className="max-h-[70%]">
            <Table
              title="LISTA DE COMPRAS"
              square={false}
              data={filteredData}
              showHeader={tableHeader}
              columnsToShow={tableColumns}
              activateActions={true}
              withMaxHeight={true}
            />
          </div>
          <div className="flex justify-center items-center mx-2 mt-4 text-center">
            <CSVLink
              data={csvPurchases}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              onClick={() => getCsvPurchases()}
              filename={`compras_iva_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Descargar anexo compras
            </CSVLink>
            <CSVLink
              data={filteredData}
              headers={csvHeaders}
              uFEFF={false}
              enclosingCharacter=""
              separator=";"
              className="button"
              onClick={() => {
                if (filteredData.length === 0) {
                  toast.error('No hay datos para descargar')
                  return false
                }
              }}
              filename={`compras_${formatDateDashES(
                startDate
              )}_${formatDateDashES(endDate)}`}
            >
              Descargar detalle de compras
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseReport
