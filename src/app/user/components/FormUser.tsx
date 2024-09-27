'use client'

import { useState, useEffect } from "react"
import { user} from '@prisma/client'
import { useRouter } from "next/navigation"
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../components/icons/NextUIIcons";

const FormUser = ({params}: {params: {id: string}}) =>{
    
    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [active, setActive] = useState(1)

    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

    const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);

    const ativoOptions = [
        { key: 1, label: 'Sim' },
        { key: 0, label: 'Não' },
    ]

    const id = (params && params.id) ? parseInt(params.id) : 0
    const formSubmitMethod = id > 0 ? 'PUT' : 'POST'
    const formSubmitUrl = '/api/user' + (id > 0 ? `/${id}` : '')

    useEffect(() => {
        if(id == 0) return
        getData()
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)

        await fetch(formSubmitUrl, {
            method: formSubmitMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, active}),
        })
            .then((response) => response)
            .catch((error) => {
                console.error('Error:', error)
            })
            .finally(() => {
                setIsLoading(false)
            })
            
        router.push('/user')
    }

    const getData = async (): Promise<user> => {
        const res = await fetch(`/api/user/${id}`)
        const data = await res.json()
        const { user } = data

        if (!user) {
            router.push('/404')
            throw new Error('User not found')
        }

        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
        setActive(user.active)
        return user
    }
    
    return (
        <>
        <h3 className="text-3xl">{id == 0 ? 'Novo Usuário' : '#' + id + ' - ' + name}</h3>
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-col gap-4">

                <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} variant="bordered"/>
               
                <Input type="email" label="Email" value={email} onChange={(event) => setEmail(event.target.value)} variant="bordered" autoComplete="email"/>
                
                <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword} aria-label="toggle password visibility">
                        {isVisiblePassword ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    }
                    type={isVisiblePassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Select
                    items={ativoOptions}
                    label="Ativo"
                    variant="bordered"
                    onFocus={() => console.log(active)}
                    onChange={(event) => setActive(Number(event.target.value))}
                    selectedKeys={[active.toString()]}
                    disallowEmptySelection
                    >
                    {(ativoOptions) => <SelectItem key={ativoOptions.key}>{ativoOptions.label}</SelectItem>}
                </Select>

                <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    {isLoading ? ' Salvando...' : ' Salvar'}
                </button>
            </div>
        </form>
        </>
    )
}

export default FormUser