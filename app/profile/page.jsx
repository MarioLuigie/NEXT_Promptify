'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@/components/Profile'

export default function MyProfilePage() {
	const [posts, setPosts] = useState([])
	const { data: session } = useSession()

	const fetchPosts = async () => {
		const res = await fetch(`/api/users/${session?.user.id}/posts`)
		const data = await res.json()
		setPosts(data)
	}

	useEffect(() => {
		// if (session?.user.id) {
			fetchPosts()
		// }
	}, [])

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			posts={posts}
			setPosts={setPosts}
		/>
	)
}
