'use client'

import { user } from '@prisma/client'
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'


interface Props {
    user: user
}

export default function TableUserRow({ user }: Props) {
    const router = useRouter()

    const handleDelete = async (id: number) => {
        await fetch(`/api/user/${user.id}`, {
            method: 'DELETE',
        })

        router.refresh()
    }

    return (
        <tr key={user.id} className={'border-b-gray-200 border hover:bg-slate-200 ' + (user.active == 0 ? 'line-through decoration-gray-400 text-gray-400' : '')}>
            <td className="text-right py-1 pr-2">{user.id}</td>
            <td className="pr-1">{user.name}</td>
            <td className="pr-1">{user.email}</td>
            <td className="pr-1">{user.password}</td>
            <td className="text-center">
                <button className="text-yellow-400 me-1" onClick={() => router.push(`/user/form/${user.id}`)}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button className="text-red-400 ms-1" onClick={() => handleDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    )
}