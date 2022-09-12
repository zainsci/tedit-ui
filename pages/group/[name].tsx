import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { RootContext } from "context"
import { IGroup } from "lib/types"
import Layout from "components/layout"
import Button from "components/buttons"
import { PostList } from "components/post"
import Loader from "components/loader"

const Group = () => {
  const router = useRouter()
  const { name } = router.query
  const {
    state: { token, username },
  } = useContext(RootContext)
  const [group, setGroup] = useState<IGroup>()
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/group/${name}?username=${username}`)
        const data = await res.json()

        setGroup(data)
        if (data.users[0]?.username === username) setJoined(true)
      } catch (e) {}
    }

    if (typeof name !== "undefined") fetchGroup()
  }, [name, username])

  async function joinGroup() {
    try {
      const res = await fetch(`/api/group/${name}/join`, {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setJoined(data.joined)
    } catch (e) {}
  }

  return (
    <Layout title={""}>
      <div className="w-full max-w-3xl flex gap-4 py-4">
        <div className="w-full max-w-xl flex-1">
          {typeof name !== "undefined" ? (
            <PostList groupName={name as string} />
          ) : (
            <Loader />
          )}
        </div>
        {name ? (
          <div className="w-56 h-fit px-4 py-2 bg-white border border-slate-200 rounded-md">
            {group ? (
              <>
                <h3 className="text-lg font-bold">{group?.name}</h3>
                <div className="text-sm mb-2 font-semibold flex gap-2">
                  <div className="flex-1 flex flex-col">
                    <div>Users</div>
                    <div>{group?._count?.users}</div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <Button
                      size="sm"
                      variant={joined ? "outlined" : "primary"}
                      onClick={joinGroup}
                    >
                      {joined ? "Joined" : "Join"}
                    </Button>
                  </div>
                </div>
                <p>{group?.description}</p>
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

export default Group
