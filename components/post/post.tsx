import React from "react"
import Link from "next/link"

import { IPost } from "lib/types"

const Post = ({ id, title, body, group, author, createdAt }: IPost) => {
  return (
    <div className="min-w-full bg-white py-4 px-6 rounded-md border border-slate-200 mb-4">
      <h3 className="text-sm text-slate-600 flex items-center gap-2 mb-1">
        <Link href={`/group/${group?.name}`}>
          <a className="text-black font-semibold hover:underline">
            {group?.name}
          </a>
        </Link>
        <span>•</span>
        <Link href={`/user/${author?.username}`}>
          <a className="hover:underline">{author?.username}</a>
        </Link>
        <span>•</span>
        <span>
          {new Date(createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </h3>

      <h3 className="text-lg font-semibold leading-5 mb-1">{title}</h3>

      <p className="mb-2 leading-5">{body}</p>

      <Link href={`/comments/${id}`}>
        <a className="px-3 py-1 border bg-white border-slate-200 rounded-md w-fit text-sm hover:bg-slate-50">
          Comments
        </a>
      </Link>
    </div>
  )
}

export default Post
