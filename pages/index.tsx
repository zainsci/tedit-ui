import { useContext } from "react"
import type { NextPage } from "next"

import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import Layout from "components/layout"
import PostList from "components/post-list"
import SideBox from "components/side-box"
import GroupList from "components/group-list/group-list"

const Home: NextPage = () => {
  const {
    state: { token },
  } = useContext(RootContext)

  return token ? (
    <Layout title="Home">
      <div className="max-w-xl w-full flex">
        <PostList />
      </div>
      <GroupList />
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
