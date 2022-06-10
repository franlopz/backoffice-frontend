import React, { useState, useRef } from 'react'
import usePurchases from '../../hooks/usePurchases'
import InputDatePicker from '../InputDatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import RefreshButton from '../refreshButton/RefreshButton'
import Table from '../table/Table'
registerLocale('es', es)

const tableHeader = [
  'Acciones',
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

const Purchases = () => {
  const { purchases, getPurchases, deletePurchase } = usePurchases()
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = useRef()

  const deleteFromDB = async ({ rowId }) => {
    console.log(rowId)
    await deletePurchase({ id: rowId })
    await getPurchases({ start: startDate, end: endDate })
  }

  return (
    <div className="flex flex-col h-full">
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
      <div className="max-h-[85%] m-2">
        <Table
          title="LISTA DE COMPRAS"
          square={false}
          data={purchases}
          showHeader={tableHeader}
          withMaxHeight={true}
          columnsToShow={tableColumns}
          activateActions={true}
          buttons={[
            ({ rowId }) => (
              <button
                key={rowId}
                className="button-table-warning"
                onClick={() => deleteFromDB({ rowId })}
              >
                Borrar
              </button>
            ),
          ]}
        />
      </div>
    </div>
  )
}

export default Purchases
