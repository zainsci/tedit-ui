import React, { useContext, useEffect, useState } from "react"

import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import { ArrowDown, ArrowUp } from "components/icons"
import { IUser } from "lib/types"

interface IProps {
  id: string | number
  vote?: "up" | "down"
  upvotes?: IUser[]
  downvotes?: IUser[]
  _count?: {
    upvotes?: number
    downvotes?: number
  }
}

const Voting = ({
  id,
  vote,
  upvotes = [],
  downvotes = [],
  _count = { upvotes: 0, downvotes: 0 },
}: IProps) => {
  const {
    state: { token, username },
  } = useContext(RootContext)
  const [voteType, setVoteType] = useState<"up" | "down" | undefined>(vote)

  useEffect(() => {
    if (upvotes[0]?.username === username) setVoteType("up")
    if (downvotes[0]?.username === username) setVoteType("down")
  }, [upvotes, downvotes, username])

  async function handleVoting(
    e: React.MouseEvent<HTMLDivElement>,
    type: "up" | "down"
  ) {
    const res = await fetch(`/api/posts/${id}/vote/${type}`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()

    if (res.status !== 200) return
    setVoteType(type)
  }
  return (
    <>
      <div onClick={(e) => handleVoting(e, "up")}>
        <LinkButton
          size="sm"
          className={`${
            voteType === "up"
              ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
              : "text-slate-600 bg-slate-50"
          }`}
        >
          <ArrowUp />
          {typeof _count?.upvotes !== "undefined" && _count?.upvotes > 0 && (
            <div className="text-[.65rem] w-5 h-5 border border-slate-100 rounded-md bg-white flex justify-center items-center">
              {_count?.upvotes}
            </div>
          )}
        </LinkButton>
      </div>
      <div onClick={(e) => handleVoting(e, "down")}>
        <LinkButton
          size="sm"
          className={`${
            voteType === "down"
              ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
              : "text-slate-600 bg-slate-50"
          }`}
        >
          <ArrowDown />
          {typeof _count?.downvotes !== "undefined" &&
            _count?.downvotes > 0 && (
              <div className="text-[.65rem] w-5 h-5 border border-slate-100 rounded-md bg-white flex justify-center items-center">
                {_count?.downvotes}
              </div>
            )}
        </LinkButton>
      </div>
    </>
  )
}

export default Voting
