'use client'

import { useEffect, useState } from 'react'
import PromptCard from '@/components/PromptCard'

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
	const [allPosts, setAllPosts] = useState([])

	const [searchText, setSearchText] = useState('')
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
		setSearchedResults(data)
		console.log('data z fetchPosts z PAGE FEED', data)
	}

	useEffect(() => {
		fetchPosts()
	}, [])

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

	//global search method
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout)

		setSearchText(e.target.value)

		//debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPosts(e.target.value)
				setSearchedResults(searchResult)
			}, 500)
		)
	}

	const handleTagClick = (tag) => () => {
		console.log(tag)
		setSearchText(tag)

		const searchResult = filterPosts(tag)
		setSearchedResults(searchResult)
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

//Funkcja fetchPosts jest asynchroniczna i zwraca Promise, ale useEffect nie może bezpośrednio obsługiwać await. Zamiast tego, wywołujesz funkcję fetchPosts normalnie wewnątrz useEffect. Powód jest taki, że useEffect nie obsługuje bezpośrednio funkcji asynchronicznych.
