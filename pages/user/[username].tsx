import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { IUser } from "lib/types"
import Layout from "components/layout"
import { PostList } from "components/post"
import Loader from "components/loader"

const User = () => {
  const router = useRouter()
  const { username } = router.query
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/user/${username}`)
        const data = await res.json()
        if (res.status !== 200) return router.push("/404")
        setUser(data)
      } catch (e) {}
    }

    if (typeof username !== "undefined") fetchGroup()
  }, [username])

  return (
    <Layout title={""}>
      <div className="w-full max-w-3xl flex gap-4">
        <div className="w-full max-w-xl flex-1">
          {typeof username !== "undefined" ? (
            <PostList userName={username as string} />
          ) : (
            <Loader />
          )}
        </div>
        {username ? (
          <div className="w-56 h-fit px-4 py-2 bg-white border border-slate-200 rounded-md">
            {user ? (
              <>
                <h3 className="text-lg font-bold">{user?.username}</h3>
                <div className="text-sm mb-2 font-semibold flex gap-2">
                  <div className="flex-1 flex flex-col"></div>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  )
}

export default User
