export default function PromptCard({ post, handleTagClick }) {
	return (
		<div>
			<p>{post.prompt}</p>
			<p>{post.tag}</p>
			<p>{post.creator.username}</p>
		</div>
	)
}
