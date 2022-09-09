import React from "react"

import Head from "next/head"

interface IProps {
  children: React.ReactNode
  title: string
}

const Layout = ({ children, title }: IProps) => {
  return (
    <>
      <Head>
        <title>{title} - TEDIT</title>
      </Head>

      <div>{children}</div>
    </>
  )
}

export default Layout
