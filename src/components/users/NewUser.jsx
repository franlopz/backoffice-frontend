import React, { useState } from 'react'
import useNewUser from '../../hooks/useNewUsers'
import Input from '../compras/Input'
import Select from '../compras/Select'
import Dialog from '../Dialog'

const initialBusinessData = [

]

const initialUserData = {
    email: '',
    firstName: '',
    lastName: '',
    businessName: '',
    businessState: '',
    businessCity: '',
    businessAddress: '',
    role: '',
    uuid: ''
}

const NewUser = ({ isOpen, setIsOpen }) => {

    const [data, createUser] = useNewUser()
    const [userData, setUserData] = useState(initialUserData)
    console.log(userData)
    const [filteredBusinessData, setFilteredBusinessData] = useState(initialBusinessData)

    const handleUserChange = (e) => {

        if (e.target.name === 'businessState') {
            const businessArray = data.companies.filter(business => e.target.value === business.state)
            setFilteredBusinessData(businessArray)
            setUserData((state) => ({ ...userData, businessState: e.target.value }))
        }

        if (e.target.name === 'businessCity') {
            const businessArray = data.companies.filter(business => e.target.value === business.city)
            setFilteredBusinessData(businessArray)
        }

        if (e.target.name === 'businessName') {
            const businessArray = data.companies.filter(business => e.target.value === business.name)
            setFilteredBusinessData(businessArray)
        }

        if (e.target.name === 'businessAddress') {
            setUserData((state) => ({
                ...state,
                uuid: filteredBusinessData[0].uuid
            }))
        }

        setUserData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    const handleClosingDialog = () => {
        setIsOpen((state) => !state)
        setUserData(initialUserData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser([{
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            uuid: userData.uuid
        }],
            handleClosingDialog)

    }

    return (
        <Dialog
            isOpen={isOpen}
            handleClosingDialog={handleClosingDialog}
            title='Crear usuario'>
            <form onSubmit={handleSubmit}>
                    <Input
                        required
                        value={userData.email}
                        labeltext='Email'
                        type='email'
                        name='email'
                        autoComplete="off"
                        onChange={handleUserChange}
                    />
                    <Input
                        required
                        value={userData.firstName}
                        labeltext='Nombres'
                        type='text'
                        name='firstName'
                        autoComplete="off"
                        onChange={handleUserChange}
                    />
                    <Input
                        required
                        value={userData.lastName}
                        labeltext='Apellidos'
                        type='text'
                        name='lastName'
                        autoComplete="off"
                        onChange={handleUserChange}
                    />
                    <Select
                        value={userData.role}
                        name='role'
                        labeltext='Rol'
                        onChange={handleUserChange}
                        //{Object.fromEntries(data.companies.map(item => [item.state, item.id]))
                        data={Object.fromEntries(data.roles.map(item => [item.roleName, item.id]))}
                    /> 
                <Select
                    value={userData.businessState}
                    name='businessState'
                    labeltext='Departamento'
                    onChange={handleUserChange}
                    data={Object.fromEntries(data.companies.map(item => [item.state, item.id]))} />
                {userData.businessState !== '' && <Select
                    value={userData.businessCity}
                    name='businessCity'
                    labeltext='Ciudad'
                    onChange={handleUserChange}
                    data={Object.fromEntries(filteredBusinessData.map(item => [item.city, item.id]))}
                />}
                {userData.businessCity !== '' && <Select
                    value={userData.businessName}
                    name='businessName'
                    labeltext='Negocio'
                    onChange={handleUserChange}
                    data={Object.fromEntries(filteredBusinessData.map(item => [item.name, item.id]))}
                />}
                {userData.businessName !== '' && <Select
                    value={userData.businessAddress}
                    name='businessAddress'
                    labeltext='Dirección'
                    onChange={handleUserChange}
                    data={Object.fromEntries(filteredBusinessData.map(item => [item.address, item.uuid]))}
                />}
                <button
                    className='button'>
                    Crear usuario
                </button>
            </form>
        </Dialog>
    )
}

export default NewUser