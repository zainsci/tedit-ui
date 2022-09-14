import React, { useContext } from "react"
import Link from "next/link"

import { IPost } from "lib/types"
import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import PostSettings from "components/post-settings"
import Voting from "components/voting"
import { MessageSquare } from "components/icons"

const Post = ({
  id,
  title,
  body,
  group,
  author,
  createdAt,
  upvotes,
  downvotes,
  _count,
}: IPost) => {
  const {
    state: { username },
  } = useContext(RootContext)

  return (
    <div className="min-w-full bg-white py-4 px-5 rounded-md border border-slate-200 mb-4 shadow-sm">
      <div className="w-full flex justify-between items-center mb-2 text-sm h-6">
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
        {username === author?.username && (
          <PostSettings id={id} title={title} body={body} />
        )}
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
          {_count?.comments > 0 && (
            <div className="text-[.65rem] w-5 h-5 border border-slate-100 rounded-md bg-white flex justify-center items-center">
              {_count?.comments}
            </div>
          )}
        </LinkButton>

        <Voting
          id={id}
          upvotes={upvotes}
          downvotes={downvotes}
          _count={_count}
        />
      </div>
    </div>
  )
}

export default Post
