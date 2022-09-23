import React, { useContext, useState } from "react"

import { RootContext } from "context"
import Input, { TextArea } from "components/input"
import Button from "components/buttons"
import { useRouter } from "next/router"
import Modal from "components/modal"

interface IProps {
  groupName?: string
  isAddPost?: boolean
  setIsAddPost?: React.Dispatch<React.SetStateAction<boolean>>
  update?: boolean
  id?: string | number
  meta?: {
    title: string
    body: string
  }
}

const AddPost = ({
  groupName,
  isAddPost = false,
  setIsAddPost = () => {},
  update = false,
  id,
  meta = { title: "", body: "" },
}: IProps) => {
  const {
    state: { token },
  } = useContext(RootContext)
  const router = useRouter()
  const [title, setTitle] = useState(meta.title)
  const [body, setBody] = useState(meta.body)
  const [isErr, setIsErr] = useState(false)
  const [message, setMessage] = useState("")

  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (body.length <= 0)
      return showMessage(true, "Please write something to comment")
    let res

    if (update) {
      res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          token,
        }),
      })
    } else {
      res = await fetch(`/api/posts/${groupName}`, {
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
    }
    const data = await res.json()
    if (res.status !== 200) {
      showMessage(true, "Server Error!")
    }

    update
      ? showMessage(false, "Updated! - Now Reloading!")
      : showMessage(false, "Posted! - Now Reloading!")
    setTimeout(() => router.reload(), 500)
  }

  function showMessage(isE: boolean, msg: string) {
    setIsErr(isE)
    setMessage(msg)

    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <Modal open={isAddPost} setOpen={setIsAddPost}>
      <div>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Post title here!"
          label="Post title"
        />
      </div>
      <div>
        <TextArea
          id="comment"
          value={body}
          setValue={setBody}
          placeholder="Post content here!"
          label="Post Content"
        />
      </div>
      <div className="flex justify-center items-center">
        <p className={`ml-2 ${isErr ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
        <div className="ml-auto flex gap-2">
          <Button size="sm" onClick={handleSubmit}>
            {update ? "Update" : "Post"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddPost
