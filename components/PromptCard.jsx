'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { paths } from '@/lib/constants'

import TickIcon from '/public/assets/icons/tick.svg'
import CopyIcon from '/public/assets/icons/copy.svg'

export default function PromptCard({
	post,
	handleTagClick,
	handleEdit,
	handleDelete,
}) {
	const [copied, setCopied] = useState('')
	const { data: session } = useSession()
	const router = useRouter()
	const pathname = usePathname()

	const handleProfileClick = () => {
		router.push(paths.profile)
	}

	const handleCopy = () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => setCopied(''), 3000)
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

				<div className="flex flex-col">
					<h3 className="font-satoshi font-semibold text-gray-900">
						{post.creator.username}
					</h3>
					<p className="font-inter text-sm text-gray-500">
						{post.creator.email}
					</p>
				</div>

				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={copied === post.prompt ? TickIcon : CopyIcon}
						alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
						width={20}
						height={20}
					/>
				</div>
			</div>
			<p className="my-6 font-satoshi text-sm text-gray-700">
				{post.prompt}
			</p>
			<p
				className="font-inter text-sm text-gray-400 cursor-pointer"
				onClick={handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>

			{session?.user.id === post.creator._id && pathname === '/profile' && (
				<div className="mt-5 flex-end gap-4 border-t border-gray-300 pt-3">
					<p
						className="font-inter text-sm text-gray-600 cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm text-red-600 cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	)
}

// Stosowanie takiego warunku w propie onClick ma na celu zapewnienie, że funkcja handleTagClick jest zdefiniowana zanim zostanie wywołana. Oto kilka powodów, dlaczego taki warunek jest użyteczny:

//     Unikanie błędów runtime: Jeśli handleTagClick nie jest zdefiniowana i zostanie wywołana bez sprawdzenia, kod spowoduje błąd typu TypeError: handleTagClick is not a function. Sprawdzenie istnienia funkcji przed jej wywołaniem zapobiega takim błędom.

//     Elastyczność kodu: Umożliwia to komponentowi działanie nawet wtedy, gdy funkcja handleTagClick nie jest przekazana jako prop. Dzięki temu komponent może być używany w różnych kontekstach, nie zawsze wymagając, aby ta funkcja była zdefiniowana.

//     Opcjonalność funkcji: Czasami może być potrzebne, aby funkcja była opcjonalna. Może istnieć sytuacja, w której nie zawsze chcemy, aby kliknięcie na element powodowało jakąś akcję. Sprawdzenie istnienia funkcji przed jej wywołaniem daje możliwość pominięcia akcji w takich przypadkach.
