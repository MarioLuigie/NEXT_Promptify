import PromptCard from '@/components/PromptCard'

export default function Profile({
	name,
	desc,
	posts,
	handleEdit,
	handleDelete,
}) {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">{name} Profile</h1>
			<p className="desc text-left">{desc}</p>
			<div className="mt-16 prompt_layout">
				{posts.length > 0 &&
					posts.map((post) => (
						<PromptCard
							key={post._id}
							post={post}
							handleEdit={handleEdit && handleEdit(post)}
							handleDelete={handleDelete && handleDelete(post)}
						/>
					))}
			</div>
		</section>
	)
}
