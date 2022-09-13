import React from "react"
import Link from "next/link"

import { IPost } from "lib/types"
import { MessageSquare, MoreHorizontal } from "components/icons"
import { LinkButton } from "components/buttons"
import Voting from "components/voting"

const Post = ({ id, title, body, group, author, createdAt }: IPost) => {
  return (
    <div className="min-w-full bg-white py-4 px-5 rounded-md border border-slate-200 mb-4 shadow-sm">
      <div className="w-full flex justify-between items-center mb-2 text-sm">
        <h3 className="text-sm text-slate-600 flex items-center gap-2">
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
        <div className="hover:bg-slate-100 cursor-pointer p-1 rounded-md">
          <MoreHorizontal />
        </div>
      </div>

      <h3 className="text-lg font-semibold leading-5 mb-1">{title}</h3>

      <p className="mb-4 leading-5 text-gray-700">{body}</p>

      <div className="flex items-center gap-2">
        <LinkButton
          size="sm"
          className="text-slate-600 bg-slate-50"
          href={`/comments/${id}`}
        >
          <span>
            <MessageSquare />
          </span>
          <span>Comments</span>
        </LinkButton>

        <Voting id={id} />
      </div>
    </div>
  )
}

export default Post
