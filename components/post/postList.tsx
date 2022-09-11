import React, { useEffect, useState } from "react"

import Post from "./post"
import { IPost } from "lib/types"
import Button from "components/buttons"
import Loader from "components/loader"

interface IProps {
  groupName?: string
}

const PostList = ({ groupName }: IProps) => {
  const [posts, setPosts] = useState<Set<IPost>>(new Set([]))
  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        let res
        if (!groupName) res = await fetch(`/api/posts?pageNo=${currPage}`)
        else
          res = await fetch(`/api/posts/group/${groupName}?pageNo=${currPage}`)
        const data: IPost[] = await res.json()

        const newSet = new Set<IPost>([...Array.from(posts)])
        if (data.length === 0) setLastPage(true)
        else {
          data.forEach((post) => newSet.add(post))
          setPosts(newSet)
        }
      } catch (e) {}
    }

    fetchPosts()
  }, [currPage, groupName])

  function loadMore() {
    setCurrPage(currPage + 1)
  }

  return posts && Array.from(posts).length > 0 ? (
    <div>
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
    </div>
  ) : (
    <Loader />
  )
}

export default PostList
