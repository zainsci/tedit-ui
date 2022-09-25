import Button from "components/buttons"
import Input, { TextArea } from "components/input"
import Loader from "components/loader"
import Modal from "components/modal"
import { RootContext } from "context"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"

const CreateGroup = () => {
  const {
    state: { token },
  } = useContext(RootContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [msg, setMsg] = useState("")
  const [isErr, setIsErr] = useState(false)
  const [working, setWorking] = useState(false)
  const router = useRouter()

  function handleClick() {
    setOpen(!open)
  }

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName((e.target as HTMLInputElement).value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name === "" || description === "")
      return showMessage("Please fill in all details!", true)

    setWorking(true)

    const res = await fetch("/api/group/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        name,
        description,
      }),
    })
    const data = await res.json()
    setWorking(false)

    if (res.status !== 200) return showMessage("Something went wrong!", true)
    setName("")
    setDescription("")

    showMessage("Group created succssfully, redirecting!", false)
    setTimeout(() => router.push(`/group/${name}`), 500)
  }

  function showMessage(msg: string, isE: boolean) {
    setIsErr(isE)
    setMsg(msg)

    setTimeout(() => setMsg(""), 3000)
  }

  return (
    <>
      <Button size="sm" onClick={handleClick}>
        New Group
      </Button>

      {open && (
        <Modal open={open} setOpen={setOpen}>
          <form className="w-full" onSubmit={handleSubmit}>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              label="Group name"
              placeholder="Enter Group name here"
            />
            <TextArea
              value={description}
              setValue={setDescription}
              label="Group description"
              placeholder="Enter Group description here"
            />
            <div className="w-full flex">
              <span
                className={`text-sm ${
                  isErr ? "text-red-500" : "text-green-500"
                }`}
              >
                {msg}
              </span>
              <span className="ml-auto">
                <Button
                  type="submit"
                  size="sm"
                  disabled={working}
                  variant={working ? "outlined" : "primary"}
                >
                  {working ? (
                    <span className="w-2">
                      <Loader tiny />
                    </span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </span>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default CreateGroup
