import React from "react"

interface IProps {
  children?: React.ReactNode
}
const SideBox = ({ children }: IProps) => {
  return (
    <div className="w-56 h-fit px-4 py-2 bg-white border border-slate-200 rounded-md text-sm">
      {children}
    </div>
  )
}

export default SideBox
