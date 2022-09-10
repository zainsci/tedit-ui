import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Layout from "components/layout"
import Input from "components/input"
import Button, { LinkButton } from "components/buttons"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  function onEmailChange(e: React.FormEvent<HTMLInputElement>) {
    setEmail((e.target as HTMLInputElement).value)
  }
  function onUsernameChange(e: React.FormEvent<HTMLInputElement>) {
    setUsername((e.target as HTMLInputElement).value)
  }
  function onPassChange(e: React.FormEvent<HTMLInputElement>) {
    setPassword((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      })
      const data = await res.json()
      if (res.status !== 200) {
        showError(data.message)

        setTimeout(() => {
          showError("")
        }, 3000)
      }

      if (data.username === username) {
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }
    } catch (e) {
      console.log("[Error]", e)
    }
  }

  function showError(message: string) {
    setErrorMsg(message)

    setTimeout(() => setErrorMsg(""), 3000)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwt_token")) router.push("/")
    }
  }, [router])

  return (
    <Layout title="Register">
      <div className="max-w-xl min-w-full min-h-screen m-auto flex flex-col flex-1 justify-center items-center">
        <div className="w-full max-w-md m-auto bg-white px-12 py-16 space-y-8 flex flex-col items-center rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-bold">Register</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <Input
              type="email"
              id="email"
              label="Email address"
              value={email}
              onChange={onEmailChange}
            />
            <Input
              type="text"
              id="username"
              label="Username"
              value={username}
              onChange={onUsernameChange}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={onPassChange}
            />
            <Button type="submit">Register</Button>
          </form>

          {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}

          <div className="text-sm flex justify-center items-center space-x-2">
            <span className="text-slate-700">Already a User?</span>
            <LinkButton href="/login">Login</LinkButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
