import { IComment } from "lib/types"
import React, { useEffect, useState } from "react"

import Comment, { AddComment } from "components/comment"

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/comments/${postId}`)
      const data = await res.json()
      setComments(data)
    }
    fetchComments()
  }, [postId])

  return (
    <div className="min-w-full bg-white p-4 rounded-md border border-slate-200 mb-4 space-y-4">
      <AddComment
        postId={postId}
        comments={comments}
        setComments={setComments}
      />

      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment.id} {...comment} />)
      ) : (
        <div>No Comments</div>
      )}
    </div>
  )
}

export default CommentList
