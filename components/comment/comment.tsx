import React, { useEffect } from "react"
import Link from "next/link"

import { IComment } from "lib/types"

const Comment = ({ id, body, author, createdAt }: IComment) => {
  return (
    <div key={id} className="flex flex-col text-slate-600 ">
      <div className="m-0 flex gap-1 text-sm">
        <Link href={`/user/${author?.username}`}>
          <a className="text-black font-semibold hover:underline">
            {author?.username}
          </a>
        </Link>
        <span>•</span>
        <span>
          {new Date(createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="m-0 text-gray-700">{body}</div>
    </div>
  )
}

export default Comment
