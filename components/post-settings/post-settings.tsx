import React, { useState } from "react"

import { MoreHorizontal } from "components/icons"
import AddPost from "components/add-post"

interface IProps {
  id: string | number
  title: string
  body: string
}

const PostSettings = ({ id, title, body }: IProps) => {
  const [open, setOpen] = useState(false)
  const [makeEdit, setMakeEdit] = useState(false)

  function handleEdit() {
    setMakeEdit(!makeEdit)
  }
  function handleDelete() {}

  return (
    <>
      {makeEdit && (
        <AddPost
          isAddPost={makeEdit}
          setIsAddPost={setMakeEdit}
          update
          id={id}
          meta={{ title, body }}
        />
      )}
      <div className="relative">
        <div
          className={`hover:bg-slate-100 cursor-pointer p-1 rounded-md ${
            open && "bg-slate-100"
          }`}
          onClick={() => setOpen(!open)}
        >
          <MoreHorizontal />
        </div>
        {open && (
          <div className="p-2 rounded-lg border border-l-slate-200 absolute bg-white right-0 top-6">
            <ul className="flex flex-col text-sm">
              <li
                className="px-4 py-1 rounded-md cursor-pointer hover:bg-slate-100"
                onClick={handleEdit}
              >
                Edit
              </li>
              <li
                className="px-4 py-1 rounded-md cursor-pointer hover:bg-slate-100"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default PostSettings
