import React from 'react'
import { useState } from 'react'
import useNewUser from '../../hooks/useNewUsers'
import Input from '../compras/Input'
import Select from '../compras/Select'
import Dialog from '../Dialog'

const ModifyUser = ({ isOpen, setIsOpen, data, toUpdate, toDelete }) => {

    const translatedStatus = {
        'active': 'Activado',
        'inactive': 'Inactivo'
    }

    const [newInfo, setNewInfo] = useState(data)
    const [userData] = useNewUser()

    const handleClosingDialog = () => {
        setIsOpen(null)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleUserChange = (e) => {
        if (e.target.name === 'status') {
            const statuses = {
                'Activo': 'active',
                'Inactivo': 'inactive'
            }

            setNewInfo((state) => ({
                ...state,
                statusEn: statuses[e.target.value]
            }))
        }
        setNewInfo((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const updateClick = () => {
        toUpdate([newInfo]).then(() => setIsOpen(null))
    }

    const deleteClick = async () => {
        await toDelete([newInfo])
        setIsOpen(null)
    }

    return (
        <Dialog
            isOpen={isOpen}
            handleClosingDialog={handleClosingDialog}
            title='Modificar usuario'>
            <form onSubmit={handleSubmit}>
                <Input
                    required
                    value={newInfo.firstName}
                    labeltext='Nombres'
                    type='text'
                    name='firstName'
                    autoComplete="off"
                    onChange={handleUserChange}
                />
                <Input
                    required
                    value={newInfo.lastName}
                    labeltext='Apellidos'
                    type='text'
                    name='lastName'
                    autoComplete="off"
                    onChange={handleUserChange}
                />
                <Select
                    value={newInfo.role}
                    name='role'
                    labeltext='Rol'
                    onChange={handleUserChange}
                    //{Object.fromEntries(data.companies.map(item => [item.state, item.id]))
                    data={Object.fromEntries(userData.roles.map(item => [item.roleName, item.id]))}
                />
                <Select
                    value={translatedStatus[newInfo.status] || newInfo.status}
                    name='status'
                    labeltext='Estado'
                    onChange={handleUserChange}
                    //{Object.fromEntries(data.companies.map(item => [item.state, item.id]))
                    data={['Activo', 'Inactivo']}
                />
                <div className='flex gap-2'>
                    <button onClick={() => updateClick()} className='button'>Actualizar</button>
                    <button onClick={() => deleteClick()} className='button-warning'>Eliminar</button>
                </div>
            </form>


        </Dialog>
    )
}

export default ModifyUser