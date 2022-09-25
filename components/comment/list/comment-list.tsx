import React, { useEffect, useState } from "react"

import { IComment } from "lib/types"
import Comment, { AddComment } from "components/comment"

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments/${postId}`)
        const data = await res.json()
        setComments(data)
      } catch (e) {}
    }
    typeof postId !== "undefined" && fetchComments()
  }, [postId])

  return (
    <div className="min-w-full bg-white px-6 py-4 rounded-md border border-slate-200 mb-4 space-y-4 shadow-sm">
      <AddComment
        postId={postId}
        comments={comments}
        setComments={setComments}
      />

      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment.id} {...comment} />)
      ) : (
        <div className="w-full text-center px-2 text-sm text-slate-600">
          No Comments! 😞
        </div>
      )}
    </div>
  )
}

export default CommentList
