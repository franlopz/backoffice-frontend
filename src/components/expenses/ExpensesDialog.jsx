import React, { useState, useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import useExpenses from '../../hooks/useExpenses'
import InputDatePicker from '../InputDatePicker'
import es from 'date-fns/locale/es'
import RefreshButton from '../refreshButton/RefreshButton'
import Table from '../table/Table'
registerLocale('es', es)

const tableHeader = ['Acciones', 'Fecha', 'Categoría', 'Monto', 'Descripción']

const tableColumns = ['fecha', 'tipo', 'monto', 'descripcion']
const ExpensesDialog = () => {
  const { expenses, getExpenses, deleteExpenses } = useExpenses()
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = useRef()

  const deleteFromDB = async ({ rowId }) => {
    await deleteExpenses({ id: rowId })
    await getExpenses({ start: startDate, end: endDate })
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
          onClick={() => getExpenses({ start: startDate, end: endDate })}
        />
      </div>
      <div className="max-h-[85%] m-2">
        <Table
          title="LISTA DE GASTOS"
          square={false}
          data={expenses}
          showHeader={tableHeader}
          withMaxHeight={true}
          columnsToShow={tableColumns}
          activateActions={true}
          buttons={[
            ({ rowId }) => (
              <button
                key={{ rowId }}
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

export default ExpensesDialog
