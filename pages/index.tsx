import type { NextPage } from "next"

import { LinkButton } from "components/buttons"

const Home: NextPage = () => {
  return (
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
