import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Layout from "components/layout"
import Post from "components/post"
import { IComment, IPost } from "lib/types"
import CommentList from "components/commentList"

const PostComments = () => {
  const [post, setPost] = useState<IPost>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${id}`)
      const data = await res.json()
      setPost(data)
    }
    fetchPost()
  }, [id])

  return (
    <Layout title={"Comment"}>
      <div className="flex flex-col py-6">
        {post && <Post {...post} />}
        <CommentList postId={id as string} />
      </div>
    </Layout>
  )
}

export default PostComments
