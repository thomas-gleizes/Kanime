'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'
import classnames from 'classnames'
import { usePathname } from 'next/navigation'

interface Props {
  href: string
  children: string
}

const NavLink: Component<Props> = ({ href, children }) => {
  const pathname = usePathname()

  const active = useMemo<boolean>(() => pathname === href, [pathname, href])

  return (
    <Link
      href={href}
      className={classnames(
        'block px-4 py-2 font-medium text-md transition duration-500 hover:bg-gray-200 hover:text-black',
        { 'bg-white text-gray-300': !active, 'bg-gray-50 text-gray-700': active }
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink
