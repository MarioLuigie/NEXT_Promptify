'use client'
//modules
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//components
import Form from '@/components/forms/Form'

export default function CreatePromptPage() {
	const [a, setA] = useState()
	const { data: session } = useSession()
	const router = useRouter()

	return (<div>
    <p>CREATE PROMPT</p>
    <Form />
    </div>)
}
