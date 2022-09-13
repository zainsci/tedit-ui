import React, { useContext, useState } from "react"

import { RootContext } from "context"
import { LinkButton } from "components/buttons"
import { ArrowDown, ArrowUp } from "components/icons"

interface IProps {
  id: string | number
  vote?: "UP" | "DOWN"
}

const Voting = ({ id, vote }: IProps) => {
  const {
    state: { token },
  } = useContext(RootContext)
  const [voteType, setVoteType] = useState<"UP" | "DOWN" | undefined>(vote)

  async function handleVoting(
    e: React.MouseEvent<HTMLDivElement>,
    type: "UP" | "DOWN"
  ) {
    const res = await fetch(`/api/posts/${id}/vote?vote=${type}`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()

    if (res.status !== 200) return
    if (data.success) setVoteType(type)
  }
  return (
    <>
      <div onClick={(e) => handleVoting(e, "UP")}>
        <LinkButton
          size="sm"
          className={`${
            voteType === "UP"
              ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
              : "text-slate-600 bg-slate-50"
          }`}
        >
          <ArrowUp />
        </LinkButton>
      </div>
      <div onClick={(e) => handleVoting(e, "DOWN")}>
        <LinkButton
          size="sm"
          className={`${
            voteType === "DOWN"
              ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
              : "text-slate-600 bg-slate-50"
          }`}
        >
          <ArrowDown />
        </LinkButton>
      </div>
    </>
  )
}

export default Voting
