'use client'
//modules
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
//components
import Form from '@/components/forms/Form'
//lib
import { paths, api } from '@/lib/constants'

function UpdatePrompt() {
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
			const res = await fetch(`/api/prompt/${promptId}`)
			const data = await res.json()

			console.log('*** data ***', data)
			setPost({
				prompt: data.prompt,
				tag: data.tag,
			})
		}
		if (promptId) {
			getPromptToEdit()
		}
	}, [promptId])

	// const createPrompt = async (e) => {
	// 	e.preventDefault()
	// 	setIsSubmitting(true)

	// 	try {
	// 		const res = await fetch(api.createPost, {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				prompt: post.prompt,
	// 				tag: post.tag,
	// 				userId: session?.user.id,
	// 			}),
	// 		})

	// 		if (res.ok) {
	// 			router.push(paths.home)
	// 		}
	// 	} catch (err) {
	// 		console.log(err)
	// 	} finally {
	// 		setIsSubmitting(false)
	// 	}
	// }

	return (
		<div>
			<Form
				type="Edit"
				post={post}
				setPost={setPost}
				isSubmitting={isSubmitting}
				handleSubmit={() => {}}
			/>
		</div>
	)
}

export default function UpdatePromptPage() {
  return (
    <Suspense>
      <UpdatePrompt  fallback={<div>Loading...</div>}/>
    </Suspense>
  )
}
