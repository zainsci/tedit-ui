import Button from "components/buttons"
import Input from "components/input"
import React, { useState } from "react"

interface IProps {
  postId: number | string
  addComment: boolean
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>
}

const AddComment = ({ postId, addComment, setAddComment }: IProps) => {
  const [value, setValue] = useState("")

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setValue((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    const res = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: value,
        token: "<<red_token>>",
      }),
    })
    const data = await res.json()

    console.log(data)
  }

  return (
    <div
      className="flex flex-col my-2 border border-slate-200 rounded-lg bg-white"
      onClick={(e) => e.preventDefault()}
    >
      <div className="p-2 border-b border-slate-200">
        <Input
          type="text"
          id="comment"
          name="comment"
          value={value}
          onChange={handleOnChange}
          placeholder="Add a Comment!"
          className="w-full border-none outline-none px-2 h-10"
        />
      </div>
      <div className="p-2 ml-auto flex gap-2">
        <Button
          size="sm"
          color="red"
          onClick={() => setAddComment(!addComment)}
        >
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          Comment
        </Button>
      </div>
    </div>
  )
}

export default AddComment
