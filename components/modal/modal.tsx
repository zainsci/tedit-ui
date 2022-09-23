import React from "react"

interface IProps {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal = ({ children, open, setOpen }: IProps) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 w-full h-full px-6 flex justify-center items-center bg-slate-700/20 z-50 overflow-hidden"
      onClick={() => setOpen(!open)}
    >
      <div
        className="w-full max-w-2xl space-y-6 p-6 bg-white border border-slate-200 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
