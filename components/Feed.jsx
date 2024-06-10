'use client'

import { useState } from 'react'
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

export default function Feed({
	allPosts
}) {

	console.log("*** POSTS Z FEED", allPosts)

	const [searchText, setSearchText] = useState('')

	const handleChange = (e) => {
		setSearchText(e.target.value)
	}

	const handleTagClick = (tag) => () => {
		console.log(tag)
	}

	return (
		<section className="feed">
			<form className="w-full relative flex-center">
				<input
					type="text"
					placeholder="Search for prompts"
					value={searchText}
					onChange={handleChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
		</section>
	)
}

//Funkcja fetchPosts jest asynchroniczna i zwraca Promise, ale useEffect nie może bezpośrednio obsługiwać await. Zamiast tego, wywołujesz funkcję fetchPosts normalnie wewnątrz useEffect. Powód jest taki, że useEffect nie obsługuje bezpośrednio funkcji asynchronicznych.
