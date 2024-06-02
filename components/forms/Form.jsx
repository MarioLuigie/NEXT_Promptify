export default function Form({
	type,
	post,
	setPost,
	isSubmitting,
	handleSubmit,
}) {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform
			</p>
			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			></form>
		</section>
	)
}
