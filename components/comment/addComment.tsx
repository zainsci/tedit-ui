import React, { useContext, useState } from "react"

import { RootContext } from "context"
import { IComment } from "lib/types"
import Input, { TextArea } from "components/input"
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
      className="w-full flex flex-col rounded-lg bg-white"
      onClick={(e) => e.preventDefault()}
    >
      <TextArea
        id="comment"
        value={cmtBody}
        setValue={setCmtBody}
        placeholder="Add a Comment!"
        label="Add your comment"
      />
      <div className="flex justify-center items-center">
        <p
          className={`ml-2 text-sm ${
            isErr ? "text-red-500" : "text-green-500"
          }`}
        >
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
