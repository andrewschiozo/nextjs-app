'use client'

import { user } from '@prisma/client'
import TableUserRow from "./TableUserRow"
import { useState, useEffect } from "react"

export default function TableUser() {

  const [users, setUsers] = useState<user[]>([])
  
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/api/user')
    const data = await response.json()
    setUsers(data.users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <table className="table w-full text-left rounded">
        <thead className="bg-slate-300">
          <tr className="border-b-2">
            <th className="text-right py-1 pr-2">#</th>
            <th className="pr-1">Nome</th>
            <th className="pr-1">Email</th>
            <th className="pr-1">Senha</th>
            <th className='text-center'>...</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user: user) => (
            <TableUserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    )
}