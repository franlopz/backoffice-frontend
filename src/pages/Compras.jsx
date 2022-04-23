import React, { useState, useRef } from "react"
import InputDatePicker from "../components/InputDatePicker"
import DatePicker from "react-datepicker"
import Input from "../components/compras/Input"
import Select from "../components/compras/Select"
import Sidebar from "../components/sidebar/Sidebar"
import { RiAddCircleLine } from "react-icons/ri"
import { round } from "../helpers/round"
import Collapsible from "../components/Collapsible"
import Dialog from "../components/Dialog"
import Table from "../components/Table"
import formatDate from "../helpers/formatDate"
import toast from "react-hot-toast"
import useSuppliers from "../hooks/useSuppliers"
import usePurchases from "../hooks/usePurchases"
import Purchases from "../components/compras/Purchases"

const docTypes = {
  "Consumidor Final": 0,
  "Crédito Fiscal": 3,
  "Nota de Crédito": 5,
  "Nota de Débito": 6,
  "Factura de Exportación": 11,
  "Declaración de Mercancía": 12,
  "Mandamiento de Ingreso": 13,
}

const docCategories = {
  "Impreso por imprenta o tiquetes": 1,
  "Formulario único": 2,
  Otro: 3,
  "Documento tributario electronico (DTE)": 4,
}

const tributaryDoc = {
  "NRC/NIT": 0,
  DUI: 1,
}

const initialFormData = {
  docType: "Consumidor Final",
  docCategorie: "Impreso por imprenta o tiquetes",
  description: "",
  nrc: "",
  supplier: "",
  compra: "",
  iva: "",
  dui: "",
  comInEx: 0,
  intExNoSuj: 0,
  imExNoSuj: 0,
  inGraBie: 0,
  imGravBie: 0,
  imGravSer: 0,
  duinit: "NRC/NIT",
  supplierName: "",
}

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
  "Acción",
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

const Compras = () => {
  const [suppliers, addSupplier] = useSuppliers()
  const { addPurchases } = usePurchases()
  const [formData, setFormData] = useState(initialFormData)
  const [startDate, setStartDate] = useState(new Date())
  const [isSupplierDialogOpen, setSupplierDialogOpen] = useState(false)
  const [isPurchasesDialogOpen, setPurchasesDialogOpen] = useState(false)
  const [transactionsList, setTransactionsList] = useState(
    JSON.parse(localStorage.getItem("compras") ?? "[]")
  )
  const ref = useRef()

  const handleClosingDialog = () => {
    setSupplierDialogOpen((state) => !state)
  }
  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))

    if (e.target.name === "nrc") {
      const supplierArray = suppliers.filter(
        (supplier) => e.target.value === supplier.nrc
      )
      const supplierName = supplierArray[0]?.nombre
      if (supplierName)
        return setFormData((state) => ({ ...state, supplier: supplierName }))
      setFormData((state) => ({ ...state, supplier: "" }))
    }
    if (e.target.name === "duinit") {
      return setFormData((state) => ({
        ...state,
        [e.target.name]: e.target.value,
        dui: "",
        nrc: "",
      }))
    }

    if (e.target.name === "docType") {
      return setFormData(() => ({
        ...initialFormData,
        [e.target.name]: e.target.value,
      }))
    }

    if (e.target.name === "compra") {
      return setFormData((state) => ({
        ...state,
        [e.target.name]: e.target.value,
        iva: round(e.target.value - e.target.value / 1.13, 2),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {
      docType,
      docCategorie,
      description,
      nrc,
      supplier,
      compra,
      iva,
      dui,
      comInEx,
      intExNoSuj,
      imExNoSuj,
      inGraBie,
      imGravBie,
      imGravSer,
      duinit,
      supplierName,
    } = formData

    if (docType !== "Consumidor Final" && supplier === "") {
      return toast.error("Registra proveedor antes", { id: "noSupplier" })
    }
    let data = {
      id: 0,
      fecha: formatDate(startDate),
      documento: docType,
      documentoId: docTypes[docType],
      tipo: docCategorie,
      tipoId: docCategories[docCategorie],
      referencia: description,
      nrc: nrc,
      nombre: supplier,
      compra: compra,
      iva: iva,
      dui,
      comInGra: round(compra - iva, 2),
      comInEx,
      intExNoSuj,
      imExNoSuj,
      inGraBie,
      imGravBie,
      imGravSer,
      attachmentId: 3,
      guardado: new Date().toISOString(),
    }
    console.log(data)
    setTransactionsList((state) => [...state, data])
    localStorage.setItem("compras", JSON.stringify([...transactionsList, data]))
    setFormData((state) => ({ ...state, compra: "", iva: "" }))
  }

  const removeRow = (id) => {
    const filteredRows = transactionsList.filter((d, i) => i !== id)
    setTransactionsList(filteredRows)
    localStorage.setItem("compras", JSON.stringify(filteredRows))
  }

  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />

      <Dialog
        title="Agregar proveedor"
        handleClosingDialog={handleClosingDialog}
        isOpen={isSupplierDialogOpen}
      >
        <div className="flex flex-col">
          {formData.duinit === "DUI" ? (
            <Input
              required
              labeltext="DUI"
              value={formData.dui}
              type="text"
              name="dui"
              autoComplete="off"
              readOnly
              onChange={handleChange}
            />
          ) : (
            <Input
              required
              labeltext="NIT o NRC"
              value={formData.nrc}
              type="text"
              name="nrc"
              autoComplete="off"
              readOnly
              onChange={handleChange}
            />
          )}
          <Input
            required
            labeltext="Nombre o razón social"
            value={formData.supplierName}
            type="text"
            name="supplierName"
            autoComplete="off"
            onChange={handleChange}
          />
          <button
            type="button"
            className="button"
            onClick={() =>
              addSupplier({
                nrc: formData.nrc,
                supplierName: formData.supplierName,
                actions: {
                  isOpen: setSupplierDialogOpen,
                  setFormData: setFormData,
                },
              })
            }
          >
            Guardar
          </button>
        </div>
      </Dialog>

      <Dialog
        fullScreen={true}
        isOpen={isPurchasesDialogOpen}
        handleClosingDialog={() => setPurchasesDialogOpen((state) => !state)}
      >
        <Purchases />
      </Dialog>
      <div className="w-full lg:pl-60">
        <div className="relative flex flex-col mx-2 mt-12 lg:mt-0">
          <form className="m-2" onSubmit={handleSubmit}>
            <Select
              labeltext="Documento"
              value={formData.docType}
              name="docType"
              onChange={handleChange}
              data={docTypes}
            />
            <Select
              labeltext="Tipo"
              value={formData.docCategorie}
              name="docCategorie"
              onChange={handleChange}
              data={docCategories}
            />
            <div className={`md:flex md:gap-2`}>
              <DatePicker
                locale="es"
                todayButton="Hoy"
                customInput={<InputDatePicker ref={ref} labeltext={"Fecha"} />}
                selected={startDate}
                peekNextMonth
                useShortMonthInDropdown
                onChange={(date) => {
                  setStartDate(date)
                }}
              />
              <Input
                required
                labeltext={
                  formData.docType !== "Consumidor Final"
                    ? "Número de documento"
                    : "Descripción"
                }
                value={formData.description}
                type={
                  formData.docType !== "Consumidor Final" ? "number" : "text"
                }
                name="description"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>

            <Select
              labeltext="Documento tributario"
              hidden={formData.docType === "Consumidor Final" ? true : false}
              value={formData.duinit}
              name="duinit"
              onChange={handleChange}
              data={tributaryDoc}
            />

            <div
              className={`${
                formData.docType === "Consumidor Final"
                  ? ""
                  : "md:grid md:grid-cols-2 md:gap-2"
              }`}
            >
              {formData.duinit === "DUI" ? (
                <Input
                  required
                  hidden={
                    formData.docType === "Consumidor Final" ? true : false
                  }
                  labeltext="DUI"
                  value={formData.dui}
                  type="text"
                  name="dui"
                  autoComplete="off"
                  onChange={handleChange}
                />
              ) : (
                <Input
                  required
                  hidden={
                    formData.docType === "Consumidor Final" ? true : false
                  }
                  labeltext="NIT o NRC"
                  value={formData.nrc}
                  type="text"
                  name="nrc"
                  autoComplete="off"
                  onChange={handleChange}
                />
              )}
              <div className="flex flex-row">
                <Input
                  required
                  labeltext="Proveedor"
                  value={formData.supplier}
                  type="text"
                  name="supplier"
                  autoComplete="off"
                  onChange={handleChange}
                  readOnly={formData.docType !== "Consumidor Final"}
                />
                {formData.docType !== "Consumidor Final" &&
                  formData.supplier === "" && (
                    <button
                      type="button"
                      onClick={() => setSupplierDialogOpen((state) => !state)}
                    >
                      <RiAddCircleLine className="w-6 h-6 m-2 text-gray-500" />
                    </button>
                  )}
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <Input
                required
                step="0.01"
                labeltext="Total"
                value={formData.compra}
                type="number"
                min="0.00"
                name="compra"
                autoComplete="off"
                onChange={handleChange}
              />
              <Input
                labeltext="IVA"
                value={formData.iva}
                type="number"
                min="0"
                name="iva"
                autoComplete="off"
                readOnly
                onChange={handleChange}
              />
            </div>
            <Collapsible
              title="Más campos"
              hidden={formData.docType === "Consumidor Final" ? true : false}
            >
              <div className="md:grid md:grid-cols-2 gap-x-2">
                <Input
                  labeltext="Compras internas exentas"
                  value={formData.comInEx}
                  type="number"
                  name="comInEx"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Input
                  labeltext="Internaciones exentas y/o no sujetas"
                  value={formData.intExNoSuj}
                  type="number"
                  name="intExNoSuj"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Input
                  labeltext="Importaciones exentas y/o no sujetas"
                  value={formData.imExNoSuj}
                  type="number"
                  name="imExNoSuj"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Input
                  labeltext="Internaciones gravadas de bienes"
                  value={formData.inGraBie}
                  type="number"
                  name="inGraBie"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Input
                  labeltext="Importaciones gravadas de bienes"
                  value={formData.imGravBie}
                  type="number"
                  name="imGravBie"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Input
                  labeltext="Importaciones gravadas de servicios"
                  value={formData.imGravSer}
                  type="number"
                  name="imGravSer"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
            </Collapsible>
            <div className="flex flex-row gap-2 w-full">
              <button className="button">Agregar a tabla</button>
              <button
                type="button"
                className="button"
                onClick={() =>
                  addPurchases({
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
                onClick={() => setPurchasesDialogOpen((state) => !state)}
              >
                Ver registros
              </button>
            </div>
          </form>
          {Array.isArray(transactionsList) && transactionsList.length > 0 && (
            <Table
              title="Transacciones"
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

export default Compras
