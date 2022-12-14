import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { RootContext } from "context"
import Layout from "components/layout"
import Input from "components/input"
import Button, { LinkButton } from "components/buttons"
import Link from "components/link"

const Login = () => {
  const { state, setState } = useContext(RootContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  function onUsernameChange(e: React.FormEvent<HTMLInputElement>) {
    setUsername((e.target as HTMLInputElement).value)
  }
  function onPassChange(e: React.FormEvent<HTMLInputElement>) {
    setPassword((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      const data = await res.json()
      if (res.status !== 200) {
        showError(data.message)
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt_token", data.token)
          localStorage.setItem("username", username)
        }
        setState({
          ...state,
          token: data.token,
          username,
        })
        router.push("/")
      }
    } catch (e) {
      showError("Login Failed!")
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
    <Layout title="Login">
      <div className="max-w-xl min-w-full min-h-screen m-auto flex flex-col flex-1 justify-center items-center">
        <div className="w-full max-w-md m-auto bg-white px-12 py-16 space-y-8 flex flex-col items-center rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-bold">Login</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
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
            <Button type="submit">Login</Button>
          </form>

          {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}

          <div className="text-sm flex justify-center items-center space-x-2">
            <LinkButton href="/forgot-password" size="sm">
              Forgot Password?
            </LinkButton>
          </div>

          <div className="text-sm flex justify-center items-center space-x-2">
            <span className="text-slate-700">Don&apos;t have an account?</span>
            <LinkButton href="/register" size="sm">
              Register
            </LinkButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
