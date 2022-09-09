import { LinkButton } from "components/buttons"
import Link from "next/link"
import React from "react"

const Post = () => {
  return (
    <Link href={"posts/id"}>
      <a className="min-w-full bg-white py-4 px-6 rounded-md border border-slate-200 hover:bg-slate-50">
        <h3 className="font-semibold">GroupName</h3>

        <h4 className="flex items-center gap-2 text-sm text-slate-600 mb-2">
          <span>Username</span>
          <span>
            {new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </h4>
        <p className="mb-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis animi
          aliquid amet. Quos sed modi libero autem vero quas porro numquam
          officiis ducimus vitae distinctio totam, dolor laudantium dolorum
          laborum!
        </p>
        <div className="px-3 py-1 border bg-white border-slate-200 rounded-md w-fit text-sm hover:bg-slate-50">
          Comment
        </div>
      </a>
    </Link>
  )
}

export default Post
