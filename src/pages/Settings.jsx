import React, { useState, useEffect } from 'react'
import Container from '../components/Container'
import AppCredentialsView from '../components/settings/AppCredentialsView'
import ChangePasswordForm from '../components/settings/ChangePasswordForm'
import Sidebar from '../components/sidebar/Sidebar'

const Settings = () => {


    return (
        <div className='h-screen flex flex-row bg-blue-200 bg-opacity-10'>
            <Sidebar />
            <div className='w-full lg:pl-60'>
                <div className='relative flex flex-col mx-2 mt-12 lg:mt-0 items-center justify-center'>
                    <ChangePasswordForm /> 
                    <AppCredentialsView />
                </div>
            </div>
        </div>
    )
}

export default Settings