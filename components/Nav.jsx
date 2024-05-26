'use client'

//components
import Link from 'next/link'
import Image from 'next/image'
//modules
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
//lib
import { paths } from '@/lib/constants'
//images
import Logo from '/public/assets/images/logo.svg'

export default function Nav() {
	return (
		<nav className="w-full flex-between mb-16 pt-3">
			<Link
				href={paths.home}
				className="
      flex flex-center gap-2"
			>
				<Image
					src={Logo}
					alt="Promptify logo"
					width="50"
					height="50"
					className="object-contain"
					priority
				/>
				<p className="logo_text">Promptify</p>
			</Link>
		</nav>
	)
}
