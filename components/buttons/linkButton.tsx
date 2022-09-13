import React from "react"

import Link from "components/link"
interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  children: string | React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

const LinkButton = ({
  href,
  children,
  size = "md",
  className,
  ...rest
}: IProps) => {
  function getClassNames() {
    const styles = [
      "rounded-md",
      "flex",
      "justify-center",
      "items-center",
      "cursor-pointer",
      className,
      !href && "hover:bg-gray-200",
    ]

    switch (size) {
      case "sm":
        styles.push("text-sm", "px-3", "py-1", "gap-2")
        break
      case "md":
        styles.push("text-md", "px-3", "py-2", "gap-3")
        break
      case "lg":
        styles.push("px-4", "py-3")
        break
    }

    return styles.join(" ")
  }

  if (!href) {
    return <div className={getClassNames()}>{children}</div>
  }

  return (
    <Link
      href={href}
      className={getClassNames()}
      activeClassName="bg-gray-300 font-medium"
      inactiveClassName="hover:bg-gray-200"
      {...rest}
    >
      {() => <>{children}</>}
    </Link>
  )
}

export default LinkButton
