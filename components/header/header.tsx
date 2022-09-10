import React, { useContext } from "react"

import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import { useRouter } from "next/router"

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
    <header className="min-w-full p-6 absolute top-0 bg-white border-b border-slate-100 backdrop-blur-md">
      <div className="max-w-3xl m-auto flex justify-between items-center">
        <h3 className="text-xl font-bold">TEDIT</h3>

        <ul className="flex justify-center items-center gap-2">
          <li className="">
            <LinkButton href="/">Home</LinkButton>
          </li>
          {token && (
            <>
              <li className="">
                <LinkButton href={`/user/${username}`}>{username}</LinkButton>
              </li>
              <li className="">
                <LinkButton href={`/logout`} onClick={handleLogOut}>
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
