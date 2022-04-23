import React, { useState } from 'react'
import useArea from '../../hooks/useArea'
import useBusiness from '../../hooks/useBusiness'
import Input from '../compras/Input'
import Select from '../compras/Select'
import Dialog from '../Dialog'

const initialBusinessData = {
    name: '',
    address: '',
    phone: '',
    city: '',
    state: '',
}

const NewBusiness = ({ isOpen, setIsOpen }) => {

    const [businessData, setBusinessData] = useState(initialBusinessData)
    const [areas, cities, setCities] = useArea()
    const [createBusiness] = useBusiness()

    const handleClosingDialog = () => {
        setIsOpen((state) => !state)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUserChange = (e) => {

        if (e.target.name === 'state')
            setCities(areas[e.target.value])

        setBusinessData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }
    return (

        <Dialog
            isOpen={isOpen}
            handleClosingDialog={handleClosingDialog}
            title='Crear negocio'
        >
            <form onSubmit={handleSubmit}>
                <Input
                    required
                    value={businessData.name}
                    labeltext='Nombre'
                    type='text'
                    name='name'
                    autoComplete="off"
                    onChange={handleUserChange}
                />
                <Input
                    required
                    value={businessData.address}
                    labeltext='Dirección'
                    type='text'
                    name='address'
                    autoComplete="off"
                    onChange={handleUserChange}
                />
                <Input
                    required
                    value={businessData.phone}
                    labeltext='Teléfono'
                    type='text'
                    name='phone'
                    autoComplete="off"
                    onChange={handleUserChange}
                />
                <Select
                    data={Object.keys(areas)}
                    value={businessData.state}
                    name='state'
                    labeltext='Departamento'
                    onChange={handleUserChange}
                />
                <Select
                    data={cities}
                    value={businessData.city}
                    name='city'
                    labeltext='Municipio'
                    onChange={handleUserChange}
                />
                <button
                    className='button'
                    onClick={() => createBusiness({
                        data: [businessData],
                        action: handleClosingDialog
                    })}
                >
                    Crear empresa
                </button>
            </form>
        </Dialog>
    )
}

export default NewBusiness