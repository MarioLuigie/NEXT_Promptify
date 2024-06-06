'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { paths } from '@/lib/constants'
import Profile from '@/components/Profile'

export default function MyProfilePage() {
	const [posts, setPosts] = useState([])
	const { data: session } = useSession()
	const router = useRouter()

	const handleEdit = (post) => () => {
		console.log('Edit post id:', post._id)
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = (post) => () => {
		console.log('Delete post id:', post._id)
	}

	const fetchPosts = async () => {
		const res = await fetch(`/api/users/${session?.user.id}/posts`)
		const data = await res.json()
		setPosts(data)
	}

	useEffect(() => {
		if (session?.user.id) {
			fetchPosts()
		}
	}, [session?.user.id])

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			posts={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}
