import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"

interface IProps {
  children: ({ isActive }: { isActive?: boolean }) => JSX.Element
  href: string
  className: string
  activeClassName?: string
  inactiveClassName?: string
  onClick?: (props: any) => any
}

const Link = ({
  href,
  activeClassName,
  inactiveClassName,
  className,
  children,
  onClick,
  ...rest
}: IProps) => {
  const router = useRouter()

  let isActive = router.asPath === href
  let currentClassName = className

  if (isActive) {
    currentClassName += ` ${activeClassName}`
  } else {
    currentClassName += ` ${inactiveClassName}`
  }

  return (
    <NextLink href={href} {...rest}>
      <a className={currentClassName} onClick={onClick}>
        {children({ isActive })}
      </a>
    </NextLink>
  )
}
export default Link
