'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@/components/Profile'
import { useSearchParams } from 'next/navigation'

export default function MyProfilePage() {
	const [posts, setPosts] = useState([])
	const { data: session } = useSession()

	const searchParams = useSearchParams()
	const userId = searchParams.get('user')

	console.log("LOG Z PROFILE PAGE:", userId)

	// const fetchPosts = async () => {
	// 	const res = await fetch(`/api/users/${session?.user.id}/posts`)
	// 	const data = await res.json()
	// 	setPosts(data)
	// }

	const fetchPosts = async () => {
		const res = await fetch(`/api/users/${userId}/posts`)
		const data = await res.json()
		setPosts(data)
	}

	// useEffect(() => {
	// 	if (session?.user.id) {
	// 		fetchPosts()
	// 	}
	// }, [session?.user.id])

	useEffect(() => {
		if (session?.user.id && userId) {
			fetchPosts()
		}
	}, [session?.user.id, userId])

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			posts={posts}
			setPosts={setPosts}
		/>
	)
}
