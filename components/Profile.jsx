'use client'

import PromptCard from '@/components/PromptCard'
import { Suspense, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
// import { useSearchParams } from 'next/navigation'
import { upperCaseWord } from '@/lib/utils'

export default function Profile({ searchParams }) {
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	const { data: session } = useSession()

	// const searchParams = useSearchParams()
	// const userId = searchParams.get('user')
	
	const userId = searchParams.user

	const fetchPosts = async () => {
		const res = await fetch(`/api/users/${userId}/posts`)
		const data = await res.json()
		setPosts(data)
	}

	const fetchUser = async () => {
		const res = await fetch(`/api/users/${userId}`)
		const data = await res.json()
		setUser(data)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (userId) {
				await fetchPosts()
				await fetchUser()
			}
			setIsLoading(false)
		}
		fetchData()
	}, [userId])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		// <Suspense fallback={<div>Loading page...</div>}>
			<section className="w-full">
				<h1 className="head_text text-left">
					{session && session.user && session.user.id === userId
						? 'My'
						: `${upperCaseWord(user.username)}'s`}{' '}
					Profile
				</h1>
				<p className="desc text-left">
					Welcome to your personalized profile page. Share your exceptional
					prompts and inspire others with the power of your imagination
				</p>
				<div className="mt-16 prompt_layout">
					{posts.length > 0 &&
						posts.map((post) => (
							<PromptCard
								key={post._id}
								post={post}
								setPosts={setPosts}
								posts={posts}
							/>
						))}
				</div>
			</section>
		// </Suspense>
	)
}

// import PromptCard from '@/components/PromptCard'

// export default function Profile({
// 	name,
// 	desc,
// 	posts,
// 	setPosts
// }) {
// 	return (
// 		<section className="w-full">
// 			<h1 className="head_text text-left">{name} Profile</h1>
// 			<p className="desc text-left">{desc}</p>
// 			<div className="mt-16 prompt_layout">
// 				{posts.length > 0 &&
// 					posts.map((post) => (
// 						<PromptCard
// 							key={post._id}
// 							post={post}
// 							setPosts={setPosts}
// 							posts={posts}
// 						/>
// 					))}
// 			</div>
// 		</section>
// 	)
// }
