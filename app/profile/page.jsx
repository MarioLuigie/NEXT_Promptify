'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@/components/Profile'
import { useSearchParams } from 'next/navigation'

function MyProfilePage() {
	const [posts, setPosts] = useState([])
	const [postCreator, setPostCreator] = useState({})
	const { data: session } = useSession()

	const searchParams = useSearchParams()
	const postCreatorId = searchParams.get('user')

	// console.log('LOG Z PROFILE PAGE:', userId)

	const fetchPosts = async () => {
		const res = await fetch(`/api/users/${postCreatorId}/posts`)
		const data = await res.json()
		setPosts(data)
	}

	const fetchUser = async () => {
		const res = await fetch(`/api/users/${postCreatorId}`)
		const data = await res.json()
		setPostCreator(data)
	}

	useEffect(() => {
		if (session?.user.id) {
			fetchPosts()
			fetchUser()
		}
	}, [session?.user.id])

	console.log('LOG Z PROFILE PAGE:', postCreator)

	return (
		<Profile
			name={
        session?.user.id === postCreatorId 
        ? 'My' 
        : postCreator?.username 
            ? postCreator.username.charAt(0).toUpperCase() + postCreator.username.slice(1)
            : ''
    }
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			posts={posts}
			setPosts={setPosts}
		/>
	)
}

export default function ProfilePage() {
	return (
		<Suspense fallback={<div>Loading page...</div>}>
			<MyProfilePage />
		</Suspense>
	)
}
