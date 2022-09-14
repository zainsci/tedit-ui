import React, { useContext, useEffect, useState } from "react"

import { IPost } from "lib/types"
import Post from "components/post"
import Button from "components/buttons"
import Loader from "components/loader"
import { RootContext } from "context"

interface IProps {
  groupName?: string
  userName?: string
}

const PostList = ({ groupName, userName }: IProps) => {
  const {
    state: { username },
  } = useContext(RootContext)
  const [posts, setPosts] = useState<Set<IPost>>(new Set([]))
  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        let res
        if (groupName) {
          res = await fetch(
            `/api/posts/group/${groupName}?pageNo=${currPage}&username=${username}`
          )
        } else if (userName) {
          res = await fetch(`/api/posts/user/${userName}?pageNo=${currPage}`)
        } else
          res = await fetch(
            `/api/posts?pageNo=${currPage}&username=${username}`
          )
        const data: IPost[] = await res.json()

        const newSet = new Set<IPost>([...Array.from(posts)])
        if (data.length === 0) setLastPage(true)
        else {
          data.forEach((post) => newSet.add(post))
          setPosts(newSet)
          console.log(newSet)
        }
      } catch (e) {}
    }

    fetchPosts()
  }, [currPage, groupName, userName])

  function loadMore() {
    setCurrPage(currPage + 1)
  }

  return posts ? (
    <div>
      {Array.from(posts).length > 0 ? (
        <>
          {Array.from(posts).map((post) => (
            <Post key={post.id} {...post} />
          ))}

          {lastPage ? (
            <div className="px-3 py-1 border border-slate-200 rounded-md">
              No more Posts to load!
            </div>
          ) : (
            <Button size="sm" onClick={loadMore}>
              Load More
            </Button>
          )}
        </>
      ) : (
        <div>Nothing Here!</div>
      )}
    </div>
  ) : (
    <Loader />
  )
}

export default PostList
