import React, { useState } from "react"
import Link from "next/link"

import { IPost } from "lib/types"

const Post = ({ id = 1, group, author, body, createAt, title }: IPost) => {
  return (
    <div className="min-w-full bg-white py-4 px-6 rounded-md border border-slate-200">
      <h3 className="text-sm text-slate-600 flex items-center gap-2 mb-1">
        <span className="text-black font-semibold">GroupName</span>
        <span>•</span>
        <span>Username</span>
        <span>•</span>
        <span>
          {new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </h3>

      <h3 className="text-lg font-semibold leading-5 mb-1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut,
        voluptates?
      </h3>

      <p className="mb-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis animi
        aliquid amet. Quos sed modi libero autem vero quas porro numquam
        officiis ducimus vitae distinctio totam, dolor laudantium dolorum
        laborum!
      </p>

      <Link href={`/comments/${id}`}>
        <a className="px-3 py-1 border bg-white border-slate-200 rounded-md w-fit text-sm hover:bg-slate-50">
          Comments
        </a>
      </Link>
    </div>
  )
}

export default Post
