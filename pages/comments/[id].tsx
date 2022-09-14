import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { IPost } from "lib/types"
import Layout from "components/layout"
import Post from "components/post"
import CommentList from "components/comment-list"
import Loader from "components/loader"
import { RootContext } from "context"

const PostComments = () => {
  const {
    state: { username },
  } = useContext(RootContext)
  const [post, setPost] = useState<IPost>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}?username=${username}`)
        const data = await res.json()
        setPost(data)
      } catch (e) {}
    }
    fetchPost()
  }, [id])

  return (
    <Layout title={"Comment"}>
      <div className="w-full max-w-xl">
        <div className="flex flex-col">
          {post ? <Post {...post} /> : <Loader />}
          <CommentList postId={id as string} />
        </div>
      </div>
    </Layout>
  )
}

export default PostComments
