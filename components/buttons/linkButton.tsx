import React from "react"

import Link from "components/link"
interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: string | React.ReactNode
  size?: "sm" | "md" | "lg"
}

const LinkButton = ({ href, children, size = "md", ...rest }: IProps) => {
  function getClassNames() {
    const className = ["rounded-md"]

    switch (size) {
      case "sm":
        className.push("px-2", "py-1")
        break
      case "md":
        className.push("px-3", "py-2")
        break
      case "lg":
        className.push("px-4", "py-3")
        break
    }

    return className.join(" ")
  }

  return (
    <Link
      href={href}
      className={getClassNames()}
      activeClassName="bg-gray-300 font-medium"
      inactiveClassName="hover:bg-gray-200"
      {...rest}
    >
      {() => <span>{children}</span>}
    </Link>
  )
}

export default LinkButton
