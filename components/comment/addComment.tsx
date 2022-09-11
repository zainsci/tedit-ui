import React, { useContext, useState } from "react"

import { RootContext } from "context"
import { IComment } from "lib/types"
import Input from "components/input"
import Button from "components/buttons"

interface IProps {
  postId: number | string
  comments?: IComment[]
  setComments?: React.Dispatch<React.SetStateAction<IComment[]>>
}

const AddComment = ({
  postId,
  comments = [],
  setComments = () => {},
}: IProps) => {
  const {
    state: { token },
  } = useContext(RootContext)
  const [cmtBody, setCmtBody] = useState("")
  const [isErr, setIsErr] = useState(false)
  const [message, setMessage] = useState("")

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setCmtBody((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (cmtBody.length <= 0)
      return showMessage(true, "Please write something to comment")

    const res = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: cmtBody,
        token,
      }),
    })
    const data = await res.json()
    if (res.status !== 200) {
      showMessage(true, "Comment was not Posted!")
    }

    showMessage(false, "Comment Posted!")
    setCmtBody("")
    setComments([data, ...comments])
  }

  function showMessage(isE: boolean, msg: string) {
    setIsErr(isE)
    setMessage(msg)

    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div
      className="w-full flex flex-col my-2 border border-slate-200 rounded-lg bg-white"
      onClick={(e) => e.preventDefault()}
    >
      <div className="p-2 border-b border-slate-200">
        <Input
          type="text"
          id="comment"
          name="comment"
          value={cmtBody}
          onChange={handleOnChange}
          placeholder="Add a Comment!"
          className="w-full border-none outline-none px-2 h-10"
        />
      </div>
      <div className="p-2 flex justify-center items-center">
        <p className={`ml-2 ${isErr ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
        <div className="ml-auto flex gap-2">
          <Button size="sm" onClick={handleSubmit}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddComment
