
import Link from "next/link"

interface Props {
    label: string
    href: string
    icon: any
}

export default function MenuItem({ label, href, icon }: Props) {

    return (
        <li className="p-1 pt-4 border-b-1 rounded hover:bg-slate-300">
            <Link href={href}>
                {icon} {label}
            </Link>
        </li>
    )
}