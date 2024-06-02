'use client'
//modules
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//components
import Form from '@/components/forms/Form'
//lib
import { paths, api } from '@/lib/constants'

export default function CreatePromptPage() {
	const initPost = {
		prompt: '',
		tag: '',
	}

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [post, setPost] = useState(initPost)
	const { data: session } = useSession()
	const router = useRouter()

	const createPrompt = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const res = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					userId: session?.user.id,
				}),
			})

			if (res.ok) {
				router.push(paths.home)
			}
		} catch (err) {
			console.log(err)
		} finally {
			setIsSubmitting(false)
		}
	}

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
