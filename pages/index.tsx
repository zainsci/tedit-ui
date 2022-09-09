import type { NextPage } from "next"

import { LinkButton } from "components/buttons"
import { useState } from "react"
import Layout from "components/layout"
import Post from "components/post"

const Home: NextPage = () => {
  const [auth, setAuth] = useState(true)

  return auth ? (
    <Layout title="Home">
      <div className="max-w-xl w-full m-auto flex flex-col min-full items-start flex-1 py-6">
        <Post />
      </div>
    </Layout>
  ) : (
    <div className="min-w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold mb-6">TEDIT</h1>

      <div className="flex justify-center items-center gap-4">
        <LinkButton href="/login">Login</LinkButton>
        <LinkButton href="/register">Register</LinkButton>
      </div>
    </div>
  )
}

export default Home
