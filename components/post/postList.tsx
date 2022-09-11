import React, { useEffect, useState } from "react"

import Post from "./post"
import { IPost } from "lib/types"
import Button from "components/buttons"
import Loader from "components/loader"

interface IProps {
  home?: boolean
}

const PostList = ({ home = false }: IProps) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts?pageNo=${currPage}`)
        const data: IPost[] = await res.json()

        if (data.length === 0) setLastPage(true)
        else setPosts((posts) => [...posts, ...data])
      } catch (e) {}
    }

    fetchPosts()
  }, [currPage])

  function loadMore() {
    setCurrPage(currPage + 1)
  }

  return posts && posts.length > 0 ? (
    <div>
      {posts.map((post) => (
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
