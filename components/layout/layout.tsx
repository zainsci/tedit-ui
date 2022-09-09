import React from "react"
import Head from "next/head"

import Header from "components/header"

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
      <Header />

      <div className="min-w-full min-h-full flex flex-col justify-center items-center mt-20 px-6">
        {children}
      </div>
    </>
  )
}

export default Layout
