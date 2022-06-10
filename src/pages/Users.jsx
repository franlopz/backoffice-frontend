import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Table from '../components/table/Table'
import ModifyUser from '../components/users/ModifyUser'
import NewBusiness from '../components/users/NewBusiness'
import NewUser from '../components/users/NewUser'
import useUsers from '../hooks/useUsers'

const tableHeader = [
  'Email',
  'Rol',
  'Nombre',
  'Apellido',
  'Negocio',
  'Departamento',
  'Municipio',
  'Dirección',
  'Estado',
  'Acciones',
]

const tableColumns = [
  'email',
  'role',
  'firstName',
  'lastName',
  'business',
  'state',
  'city',
  'address',
  'status',
]

const Users = () => {
  const [users, updateUser, deleteUser] = useUsers()
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false)
  const [isOpenCreateBusiness, setIsOpenCreateBusiness] = useState(false)
  const [userToModify, setUserToModify] = useState(null)

  return (
    <div className="h-screen flex flex-row bg-blue-200 bg-opacity-10">
      <Sidebar />
      {isOpenCreateUser && (
        <NewUser isOpen={isOpenCreateUser} setIsOpen={setIsOpenCreateUser} />
      )}
      {isOpenCreateBusiness && (
        <NewBusiness
          isOpen={isOpenCreateBusiness}
          setIsOpen={setIsOpenCreateBusiness}
        />
      )}
      {userToModify && (
        <ModifyUser
          isOpen={userToModify ? true : false}
          setIsOpen={setUserToModify}
          data={userToModify}
          toUpdate={updateUser}
          toDelete={deleteUser}
        />
      )}
      <div className="w-full lg:pl-60">
        <div className="relative flex flex-col m-2 justify-end mt-12 lg:mt-0">
          <div className="flex flex-row mx-1 my-2 justify-end">
            <div className="flex">
              <div className="w-32 mx-1">
                <button
                  type="button"
                  onClick={() => setIsOpenCreateUser((state) => !state)}
                  className="button"
                >
                  Crear usuario
                </button>
              </div>
              <div className="w-32 mx-1">
                <button
                  type="button"
                  className="button"
                  onClick={() => setIsOpenCreateBusiness((state) => !state)}
                >
                  Crear negocio
                </button>
              </div>
            </div>
          </div>
          <div className="m-2">
            <Table
              title="REGISTROS"
              buttons={[
                (data) => (
                  <button
                    key="edit"
                    className="button"
                    onClick={() => setUserToModify(data)}
                  >
                    Editar
                  </button>
                ),
              ]}
              square={false}
              data={users}
              showHeader={tableHeader}
              columnsToShow={tableColumns}
              withMaxHeight={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
