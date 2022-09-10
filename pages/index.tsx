import { useContext } from "react"
import type { NextPage } from "next"

import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import Layout from "components/layout"
import Post from "components/post"

const Home: NextPage = () => {
  const {
    state: { token },
  } = useContext(RootContext)

  return token ? (
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
