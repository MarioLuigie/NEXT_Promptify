import Feed from '@/components/Feed'

export default function Home() {
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
			<Feed allPosts={allPosts} />
		</section>
	)
}


