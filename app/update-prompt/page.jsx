'use client'
//modules
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
//components
import Form from '@/components/forms/Form'
//lib
import { paths } from '@/lib/constants'

function EditPrompt() {
	const initPost = {
		prompt: '',
		tag: '',
	}

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [post, setPost] = useState(initPost)
	const router = useRouter()
	const searchParams = useSearchParams()
	const promptId = searchParams.get('id')

	useEffect(() => {
		console.log('UpdatePrompt: search params id', promptId)

		const getPromptToEdit = async () => {
			try {
				const res = await fetch(`/api/prompt/${promptId}`)
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}

				const data = await res.json()

				console.log('*** data ***', data)
				setPost({
					prompt: data.prompt,
					tag: data.tag,
				})
			} catch (err) {
				console.error('Error fetching prompt data:', err)
			}
		}

		if (promptId) {
			getPromptToEdit()
		}
	}, [promptId])

	const updatePrompt = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (!promptId) {
			return alert('Prompt ID not found')
		}

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			})

			if (res.ok) {
				router.push(paths.home)
			} else {
				throw new Error(`HTTP error! status: ${res.status}`)
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
				type="Edit"
				post={post}
				setPost={setPost}
				isSubmitting={isSubmitting}
				handleSubmit={updatePrompt}
			/>
		</div>
	)
}

export default function UpdatePromptPage() {
	return (
		<Suspense>
			<EditPrompt fallback={<div>Loading...</div>} />
		</Suspense>
	)
}
