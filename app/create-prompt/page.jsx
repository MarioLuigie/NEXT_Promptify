'use client'
//modules
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//components
import Form from '@/components/forms/Form'

export default function CreatePromptPage() {
	const initPost = {
		prompt: '',
		tag: '',
	}

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [post, setPost] = useState(initPost)
	const { data: session } = useSession()
	const router = useRouter()

	const createPrompt = async (e) => {}

	return (
		<div>
			<Form
				type="Create"
				post={post}
				setPost={setPost}
				isSubmitting={isSubmitting}
				handleSubmit={createPrompt}
			/>
		</div>
	)
}
