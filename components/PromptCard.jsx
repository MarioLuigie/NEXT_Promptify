'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export default function PromptCard({ post, handleTagClick }) {
  const handleProfileClick = () => {

  }
  
	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post.creator.image}
						alt="Creator image"
						width={37}
						height={37}
						className="rounded-full object-contain"
					/>
				</div>
			</div>
			<p>{post.prompt}</p>
			<p>{post.tag}</p>
			<p>{post.creator.username}</p>
		</div>
	)
}
