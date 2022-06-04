import { useState } from 'react'
import useAppCredentials from '../../hooks/useAppCredentials'
import Input from '../compras/Input'
import Container from '../Container'

const AppCredentialsView = () => {
  const [appCredentials, uuid] = useAppCredentials()

  return (
    <Container title="Credenciales API">
      <div className="mx-4">
        <Input labeltext="App Id" value={appCredentials.appId} readOnly />
        <Input labeltext="App Key" value={appCredentials.appKey} readOnly />
        <Input labeltext="UUID" value={uuid ? uuid : ''} readOnly />
      </div>
    </Container>
  )
}

export default AppCredentialsView
