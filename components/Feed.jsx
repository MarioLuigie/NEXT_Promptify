'use client'

import { useEffect, useState } from 'react'
import PromptCard from '@/components/PromptCard'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

export default function Feed() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const searchParamsData = searchParams.get('search')

	const [allPosts, setAllPosts] = useState([])
	const [searchText, setSearchText] = useState(searchParamsData || '')
	const [searchTimeout, setSearchTimeout] = useState(null)
	const [searchedResults, setSearchedResults] = useState([])

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

		// Filter posts based on searchParamsData after fetching
		if (searchParamsData) {
			const searchResult = filterPosts(searchParamsData)
			setSearchedResults(searchResult)
		} else {
			setSearchedResults(data)
		}

		console.log('data z fetchPosts z PAGE FEED', data)
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	useEffect(() => {
		if (searchParamsData) {
			const searchResult = filterPosts(searchParamsData)
			setSearchedResults(searchResult)
		} else {
			setSearchedResults(allPosts)
		}
	}, [searchParamsData, allPosts])

	const filterPosts = (text) => {
		const regex = new RegExp(text, 'i') // 'i' flag for case-insensitive search
		return allPosts.filter(
			(post) =>
				regex.test(post.creator.username) ||
				regex.test(post.tag) ||
				regex.test(post.prompt) ||
				regex.test(post.creator.email)
		)
	}

	// Global search method
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout)

		setSearchText(e.target.value)

		// Debounce method
		setSearchTimeout(
			setTimeout(() => {
				if (e.target.value) {
					router.push(`/?search=${e.target.value}`)
				} else {
					router.push('/')
				}
			}, 500)
		)
	}

	const handleTagClick = (tag) => () => {
		setSearchText(tag)
		router.push(`/?search=${tag}`)
	}

	return (
		<section className="feed">
			<form className="w-full relative flex-center">
				<input
					type="text"
					placeholder="Search for prompts"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList
				data={searchedResults}
				handleTagClick={handleTagClick}
			/>
		</section>
	)
}
