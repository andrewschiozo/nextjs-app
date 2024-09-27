'use client'

import React, { useState } from "react"
import FormUser from "../../components/FormUser"

const Page = ({ params }: { params: {id: string} }) => {
    return (
        <FormUser params={params} />
    )
}

export default Page