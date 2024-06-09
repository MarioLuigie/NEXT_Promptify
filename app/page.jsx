'use client'

import { useEffect, useState } from 'react'
import Feed from '@/components/Feed'
import { api } from '@/lib/constants'
import { useSession } from 'next-auth/react'

export default function Home() {
	const [allPosts, setAllPosts] = useState([])
	const session = useSession()

	const fetchPosts = async () => {
		const res = await fetch(`/api/prompt?_=${new Date().getTime()}`, {
			headers: {
				'Cache-Control': 'no-store',
			},
		})

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		const data = await res.json()
		setAllPosts(data)
		console.log('data z fetchPosts z PAGE FEED', data)
	}

	// useEffect(() => {
	// 	fetchPosts()
	// 	console.log('*** LOG Z PAGE FEED 1')
	// }, [])

	useEffect(() => {
		if (session?.user.id) {
			fetchPosts()
		}
	}, [session?.user.id])

	console.log('*** POSTS Z PAGE', allPosts)
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">Discover and Share</h1>
			<br className="max-md:hidden" />
			<span className="text-orange-500 text-center text-3xl pt-5">
				AI-Powered Prompts
			</span>
			<p className="desc text-center">
				Promptify is an open-source AI prompting tool for modern world to
				discover, create and share creative prompts!
			</p>
			<Feed posts={allPosts} />
		</section>
	)
}

//Funkcja fetchPosts jest asynchroniczna i zwraca Promise, ale useEffect nie może bezpośrednio obsługiwać await. Zamiast tego, wywołujesz funkcję fetchPosts normalnie wewnątrz useEffect. Powód jest taki, że useEffect nie obsługuje bezpośrednio funkcji asynchronicznych.
