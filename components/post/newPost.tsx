import React, { useContext, useState } from "react"

import { RootContext } from "context"
import Input from "components/input"
import Button from "components/buttons"
import { useRouter } from "next/router"

interface IProps {
  groupName: string
  createPost?: boolean
  setCreatePost?: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPost = ({
  groupName,
  createPost,
  setCreatePost = () => {},
}: IProps) => {
  const {
    state: { token },
  } = useContext(RootContext)
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isErr, setIsErr] = useState(false)
  const [message, setMessage] = useState("")

  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle((e.target as HTMLInputElement).value)
  }

  function handleBodyChange(e: React.FormEvent<HTMLInputElement>) {
    setBody((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (body.length <= 0)
      return showMessage(true, "Please write something to comment")

    const res = await fetch(`/api/posts/${groupName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        token,
      }),
    })
    const data = await res.json()
    if (res.status !== 200) {
      showMessage(true, "Post was not Posted!")
    }

    showMessage(false, "Posted! - Now Reloading!")
    setTimeout(() => router.reload(), 1000)
  }

  function showMessage(isE: boolean, msg: string) {
    setIsErr(isE)
    setMessage(msg)

    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div
      className="absolute top-0 left-0 right-0 w-full h-full px-6 flex justify-center items-center bg-slate-700/20 z-50 overflow-hidden"
      onClick={() => setCreatePost(!createPost)}
    >
      <div
        className="w-full max-w-2xl p-6 border border-slate-200 rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 border border-slate-200 rounded-md mb-4">
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add Title!"
            className="w-full border-none outline-none px-2 h-10"
          />
        </div>
        <div className="p-2 border border-slate-200 rounded-md mb-4">
          <Input
            type="text"
            id="comment"
            name="comment"
            value={body}
            onChange={handleBodyChange}
            placeholder="Post Content Here!"
            className="w-full border-none outline-none px-2 h-10"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className={`ml-2 ${isErr ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
          <div className="ml-auto flex gap-2">
            <Button size="sm" onClick={handleSubmit}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost
