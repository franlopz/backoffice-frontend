import { useState } from 'react'
import useAppCredentials from '../../hooks/useAppCredentials'
import Input from '../compras/Input'
import Container from '../Container'

const AppCredentialsView = () => {

    const [appCredentials,uuid] = useAppCredentials()

    return (
        <Container title='Credenciales API'>
            <Input
                labeltext='App Id'
                value={appCredentials.appId}
                readOnly
            />
            <Input
                labeltext='App Key'
                value={appCredentials.appKey}
                readOnly
            />
            <Input
                labeltext='UUID'
                value={uuid}
                readOnly
            />
        </Container>
    )
}

export default AppCredentialsView