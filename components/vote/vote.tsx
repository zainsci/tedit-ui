import React from "react"

import { LinkButton } from "components/buttons"
import { ArrowDown, ArrowUp } from "components/icons"

interface IProps {
  id: string | number
  type: "up" | "down"
  isActive: boolean
  count?: number
  setVote?: React.MouseEventHandler<HTMLDivElement>
}

const Vote = ({ id, type, isActive, count = 0, setVote }: IProps) => {
  return (
    <div onClick={setVote}>
      <LinkButton
        size="sm"
        className={`${
          isActive
            ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
            : "text-slate-600 bg-slate-50"
        }`}
      >
        {type === "down" && <ArrowDown />}
        {type === "up" && <ArrowUp />}

        {count > 0 && (
          <div className="text-[.65rem] w-5 h-5 border border-slate-100 rounded-md bg-white flex justify-center items-center">
            {count}
          </div>
        )}
      </LinkButton>
    </div>
  )
}

export default Vote
