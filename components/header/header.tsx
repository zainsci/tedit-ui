import React, { useState } from "react"

import { LinkButton } from "components/buttons"

const Header = () => {
  const [username, setUsername] = useState("zainsci")

  return (
    <header className="min-w-full p-6 absolute top-0 bg-white border-b border-slate-100 backdrop-blur-md">
      <div className="max-w-3xl m-auto flex justify-between items-center">
        <h3 className="text-xl font-bold">TEDIT</h3>

        <ul className="flex justify-center items-center gap-2">
          <li className="">
            <LinkButton href="/">Home</LinkButton>
          </li>

          <li className="">
            <LinkButton href="/">{username}</LinkButton>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
