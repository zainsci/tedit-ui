import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { RootContext } from "context"
import { IGroup } from "lib/types"
import Layout from "components/layout"
import Button from "components/buttons"
import PostList from "components/post-list"
import Loader from "components/loader"
import AddPost from "components/add-post"
import SideBox from "components/side-box"

const Group = () => {
  const router = useRouter()
  const { name } = router.query
  const {
    state: { token, username },
  } = useContext(RootContext)
  const [group, setGroup] = useState<IGroup>()
  const [joined, setJoined] = useState(false)
  const [isAddPost, setIsAddPost] = useState(false)

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
    <>
      {isAddPost && (
        <AddPost
          groupName={group?.name as string}
          isAddPost={isAddPost}
          setIsAddPost={setIsAddPost}
        />
      )}

      <Layout title={""}>
        <div className="w-full max-w-xl flex-1">
          {typeof name !== "undefined" ? (
            <PostList groupName={name as string} />
          ) : (
            <Loader />
          )}
        </div>
        {name ? (
          <div className="flex flex-col shadow-sm">
            <SideBox>
              {group ? (
                <>
                  <h3 className="text-lg font-bold">{group?.name}</h3>
                  <div className="text-xs mb-2 font-semibold flex gap-2">
                    <div className="flex-1 flex flex-col text-slate-600">
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
                  <p className="text-gray-700">{group?.description}</p>
                </>
              ) : (
                <Loader />
              )}
            </SideBox>

            <div className="my-2">
              <Button size="sm" onClick={() => setIsAddPost(!isAddPost)}>
                Create a New Post!
              </Button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Layout>
    </>
  )
}

export default Group
