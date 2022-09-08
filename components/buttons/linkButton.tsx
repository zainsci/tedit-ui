import React from "react"
import Link from "next/link"

interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: string | React.ReactNode
}

const LinkButton = ({ href, children, ...props }: IProps) => {
  return (
    <Link href={href}>
      <a
        className="px-3 py-1 font-medium border border-slate-200 rounded-md hover:bg-slate-100"
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default LinkButton
