import React, { useContext } from "react"

import { RootContext } from "context"
import { useRouter } from "next/router"
import Link from "components/link"
import { LinkButton } from "components/buttons"

const Header = () => {
  const {
    state: { token, username },
    setState,
  } = useContext(RootContext)
  const router = useRouter()

  function handleLogOut(e: React.FormEvent<HTMLAnchorElement>) {
    e.preventDefault()

    if (typeof window !== "undefined") localStorage.clear()

    setState({
      token: "",
      username: "",
    })

    router.push("/login")
  }

  return (
    <header className="min-w-full h-16 fixed top-0 bg-white/50 text-gray-900 shadow-sm flex justify-center items-center backdrop-blur-3xl">
      <div className="w-full max-w-3xl m-auto flex justify-between items-center">
        <h3 className="text-xl font-bold">
          <samp>TEDIT</samp>
        </h3>

        <ul className="flex justify-center items-center gap-2 text-sm font-normal">
          <li>
            <LinkButton href={`/`} className="px-3 py-2 rounded-md">
              Home
            </LinkButton>
          </li>
          {token && (
            <>
              <li>
                <LinkButton href={`/user/${username}`}>{username}</LinkButton>
              </li>
              <li>
                <LinkButton
                  href={`/logout`}
                  className="px-3 py-2 rounded-md"
                  onClick={handleLogOut}
                >
                  Logout
                </LinkButton>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
