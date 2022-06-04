import React, { useRef, useState } from 'react'
import TableBody from '../../components/reports/TableBody'
import TableHeader from '../../components/reports/TableHeader'
import TableRow from '../../components/reports/TableRow'
import Sidebar from '../../components/sidebar/Sidebar'
import usePLReport from '../../hooks/usePLReport'
import RefreshButton from '../../components/refreshButton/RefreshButton'
import InputDatePicker from '../../components/InputDatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import { round } from '../../helpers/round'
registerLocale('es', es)

const ProfitAndLoss = () => {
  const [data, getData] = usePLReport()
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const ref = useRef()

  const getTotal = () => {
    const sum =
      data?.tickets?.total -
      data?.compras?.compraTotal -
      data?.gastos?.Salario -
      data?.gastos?.Propina -
      data?.tickets?.propina -
      data?.gastos?.ISSS -
      data?.gastos?.Mantenimiento -
      data?.gastos?.Publicidad -
      data?.gastos?.Alquiler -
      data?.gastos?.Servicio -
      data?.gastos?.Comisión -
      data?.iva?.total +
      data?.iva?.deducible -
      data?.gastos?.Otro

    return round(sum, 2)
  }

  const getSubtotal = () => {
    const sum =
      data?.gastos?.Mantenimiento +
      data?.gastos?.Publicidad +
      data?.gastos?.Alquiler +
      data?.gastos?.Servicio +
      data?.gastos?.Comisión +
      data?.iva?.total -
      data?.iva?.deducible +
      data?.gastos?.Otro

    return round(sum, 2)
  }
  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />
      <div className="w-full lg:pl-60">
        <div className="flex  flex-col  mx-2 mt-12 lg:mt-0">
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
              onClick={() => getData({ start: startDate, finish: endDate })}
            />
          </div>
          <div className="flex justify-center items-center ">
            <TableBody>
              <TableHeader business="" period="" title="Ganancias y pérdidas" />
              <TableRow isHeader={true} title="Ingresos" />
              <TableRow title="Ventas" value={round(data?.tickets?.total, 2)} />
              <TableRow isHeader={true} title="Costos" />
              <TableRow
                title="Compras"
                value={round(data?.compras?.compraTotal, 2)}
              />
              {/* <TableRow
                            title='Inventario inicial'
                            value={data?.compras?.Compratotal} />
                        <TableRow
                            title='Inventario final'
                            value='12' /> */}
              {/* <TableRow
                            title='Subtotal'
                            value='12' /> */}
              <TableRow isHeader={true} title="Coste laboral" />
              <TableRow
                title="Salario"
                value={round(data?.gastos?.Salario, 2)}
              />
              <TableRow
                title="Propina"
                value={round(data?.gastos?.Propina + data?.tickets?.propina, 2)}
              />
              {/* <TableRow
                            title='Beneficios'
                            value={data?.gastos?.Propina} /> */}
              <TableRow title="Seguro" value={round(data?.gastos?.ISSS, 2)} />
              <TableRow
                title="Subtotal"
                value={round(
                  data?.gastos?.Salario +
                    data?.gastos?.Propina +
                    data?.tickets?.propina +
                    data?.gastos?.ISSS,
                  2
                )}
              />
              <TableRow isHeader={true} title="Costo de operación" />
              <TableRow
                title="Mantenimientos"
                value={round(data?.gastos?.Mantenimiento, 2)}
              />
              <TableRow
                title="Publicidad"
                value={round(data?.gastos?.Publicidad, 2)}
              />
              <TableRow
                title="Alquiler"
                value={round(data?.gastos?.Alquiler, 2)}
              />
              <TableRow
                title="Servicios"
                value={round(data?.gastos?.Servicio, 2)}
              />
              <TableRow
                title="Comisiones"
                value={round(data?.gastos?.Comisión, 2)}
              />
              <TableRow title="Impuestos" value={round(data?.iva?.total, 2)} />
              <TableRow
                title="Impuestos deducibles"
                value={round(data?.iva?.deducible, 2)}
              />
              <TableRow title="Otro" value={round(data?.gastos?.Otro, 2)} />
              <TableRow title="Subtotal" value={getSubtotal()} />
              <TableRow
                isHeader={true}
                isTotal={true}
                title="Utilidad neta"
                value={getTotal()}
              />
            </TableBody>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfitAndLoss
