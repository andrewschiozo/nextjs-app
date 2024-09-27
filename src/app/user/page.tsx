
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import TableUsers from './components/TableUsers'
import { user } from '@prisma/client/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const Page = async () => {
  
  
  
  return (
    <div>
        <h1 className="text-3xl">Usuários</h1>
        <div className="text-end">
          <Link className="border-blue-500 text-blue-800 border rounded py-2 px-2" href="/user/form">
            <FontAwesomeIcon icon={faPlus} /> Novo Usuário
          </Link>
        </div>
        <div className="mt-5 px-2 py-2 rounded shadow">
          <TableUsers />
        </div>
    </div>
  )
}

export default Page