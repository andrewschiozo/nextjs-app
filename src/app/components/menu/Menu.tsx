import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

import MenuItem from "./MenuItem"

export default function Menu() {

    const menus = [
        { label: "Home", href: "/", icon: <FontAwesomeIcon icon={faHouse}/>},
        { label: "Usuários", href: "/user", icon: <FontAwesomeIcon icon={faUsers}/>}
    ]

    return (
        <nav className="w-64 p-5 bg-base-100 border-r border-gray-300">
            <ul>
                {menus.map((menu, index) => (
                    <MenuItem key={index} label={menu.label} href={menu.href} icon={menu.icon}/>
                ))}
            </ul>
        </nav>
    )
}