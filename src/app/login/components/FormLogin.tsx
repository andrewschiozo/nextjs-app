'use client'

import { useState } from "react"
import { Input } from "@nextui-org/input";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../../components/icons/NextUIIcons";


const FormLogin = () =>{
    

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

    const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setIsLoading(true)
        console.log(username, password)

        setIsLoading(false)
    }
    
    return (
        <>
        <h3 className="text-3xl">Login</h3>
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-col gap-4">               
                <Input label="Usuário"
                       type="text"
                       autoComplete="email"
                       variant="bordered"
                       onChange={(event) => setUsername(event.target.value)}  />
                
                <Input
                    label="Senha"
                    type={isVisiblePassword ? "text" : "password"}
                    autoComplete="current-password"
                    variant="bordered"
                    onChange={(event) => setPassword(event.target.value)}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword} aria-label="toggle password visibility">
                        {isVisiblePassword ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    }
                />

                <button type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? ' Autenticando...' : ' Entrar'}
                </button>
            </div>
        </form>
        </>
    )
}

export default FormLogin