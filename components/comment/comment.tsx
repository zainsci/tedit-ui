import React from "react"

import { IComment } from "lib/types"

interface IProps extends IComment {}

const Comment = ({}: IProps) => {
  return <div>Comment</div>
}

export default Comment
