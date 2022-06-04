import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import Input from '../components/compras/Input'
import Select from '../components/compras/Select'
import Dialog from '../components/Dialog'
import ExpensesDialog from '../components/expenses/ExpensesDialog'
import InputDatePicker from '../components/InputDatePicker'
import Sidebar from '../components/sidebar/Sidebar'
import Table from '../components/Table'
import formatDate from '../helpers/formatDate'
import useExpenses from '../hooks/useExpenses'

const initialFormData = {
  categorie: 'Salario',
  amount: '',
  details: '',
}

const categories = [
  'Salario',
  'Impuesto',
  'Servicio',
  'Mantenimiento',
  'Alquiler',
  'Publicidad',
  'Comisión',
  'ISSS',
  'Propina',
  'Otro',
]

const tableHeader = ['Fecha', 'Categoría', 'Monto', 'Descripción', 'Acciones']

const tableColumns = ['fecha', 'tipo', 'monto', 'descripcion']

const Expenses = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [transactionsList, setTransactionsList] = useState(
    JSON.parse(localStorage.getItem('gastos') ?? '[]')
  )
  const ref = useRef()
  const { addExpenses } = useExpenses(false)

  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { categorie, amount, details } = formData

    let data = {
      id: 0,
      fecha: formatDate(startDate),
      tipo: categorie,
      monto: amount,
      descripcion: details,
      guardado: new Date().toISOString(),
    }
    setTransactionsList((state) => [...state, data])
    localStorage.setItem('gastos', JSON.stringify([...transactionsList, data]))
    setFormData((state) => ({ ...state, amount: '', details: '' }))
  }

  const removeRow = (id) => {
    const filteredRows = transactionsList.filter((d, i) => i !== id)
    setTransactionsList(filteredRows)
    localStorage.setItem('gastos', JSON.stringify(filteredRows))
  }

  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />
      <Dialog
        fullScreen={true}
        isOpen={isDialogOpen}
        handleClosingDialog={() => setIsDialogOpen((state) => !state)}
      >
        <ExpensesDialog />
      </Dialog>
      <div className="w-full lg:pl-60">
        <div className="relative flex flex-col mx-2 mt-12 lg:mt-0">
          <form className="m-2" onSubmit={handleSubmit}>
            <div className="md:flex md:gap-2">
              <DatePicker
                locale="es"
                todayButton="Hoy"
                customInput={<InputDatePicker ref={ref} labeltext={'Fecha'} />}
                selected={startDate}
                peekNextMonth
                useShortMonthInDropdown
                onChange={(date) => {
                  setStartDate(date)
                }}
              />
              <Select
                value={formData.categorie}
                name="categorie"
                onChange={handleChange}
                data={categories}
              />
            </div>
            <div className="md:flex md:gap-2">
              <Input
                required
                step="0.01"
                labeltext="Monto"
                value={formData.amount}
                type="number"
                min="0.00"
                name="amount"
                autoComplete="off"
                onChange={handleChange}
              />
              <Input
                required
                labeltext="Descripción"
                value={formData.details}
                type="text"
                name="details"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <button className="button">Agregar a tabla</button>
              <button
                type="button"
                className="button"
                onClick={() =>
                  addExpenses({
                    data: transactionsList,
                    action: setTransactionsList,
                  })
                }
              >
                Guardar
              </button>
              <button
                type="button"
                className="button"
                onClick={() => setIsDialogOpen((state) => !state)}
              >
                Ver registros
              </button>
            </div>
          </form>
          {Array.isArray(transactionsList) && transactionsList.length > 0 && (
            <Table
              title="TRANSACCIONES"
              square={false}
              data={transactionsList}
              showHeader={tableHeader}
              columnsToShow={tableColumns}
              withMaxHeight={true}
              buttons={[
                (rows, index) => (
                  <button
                    key="delete"
                    className="button"
                    onClick={() => removeRow(index)}
                  >
                    Borrar
                  </button>
                ),
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Expenses
