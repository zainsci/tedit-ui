import React, { useContext, useEffect, useState } from "react"

import { RootContext } from "context"
import { IUser } from "lib/types"
import Vote from "components/vote"

/**
 * if (click == upvote)
 *    if (downvote == true) setDownvote(false)
 *    if (upvote == true) setUpVote(false)
 *    else setUpVote(true)
 *
 * if (click == downvote)
 *    if (upvote == true) setUpVote(false)
 *    if (downvote == true) setDownVote(false)
 *    else setDownVote(true)
 */
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
  const [currVote, setCurrVote] = useState<"up" | "down" | undefined>(vote)
  const [upVotes, setUpVotes] = useState(_count.upvotes || 0)
  const [downVotes, setDownVotes] = useState(_count.downvotes || 0)

  useEffect(() => {
    if (upvotes[0]?.username === username) setCurrVote("up")
    if (downvotes[0]?.username === username) setCurrVote("down")
  }, [upvotes, downvotes, username])

  async function setVote(
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

    if (type === "up") {
      if (currVote === "down") setDownVotes(downVotes - 1)
      if (currVote === "up") {
        setUpVotes(upVotes - 1)
        setCurrVote(undefined)
      } else {
        setUpVotes(upVotes + 1)
        setCurrVote(type)
      }
    }

    if (type === "down") {
      if (currVote === "up") setUpVotes(upVotes - 1)
      if (currVote === "down") {
        setDownVotes(downVotes - 1)
        setCurrVote(undefined)
      } else {
        setDownVotes(downVotes + 1)
        setCurrVote(type)
      }
    }
  }

  return (
    <>
      <Vote
        id={id}
        isActive={currVote === "up"}
        type="up"
        count={upVotes}
        setVote={(e) => setVote(e, "up")}
      />
      <Vote
        id={id}
        isActive={currVote === "down"}
        type="down"
        count={downVotes}
        setVote={(e) => setVote(e, "down")}
      />
    </>
  )
}

export default Voting
