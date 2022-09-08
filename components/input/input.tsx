import React from "react"

interface IProps extends React.HTMLProps<HTMLInputElement> {
  type: string
  id: string
  label: string
}

const Input = ({ type, id, label, ...props }: IProps) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="font-semibold mb-1 text-sm">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="w-full h-10 px-3 mb-4 block border border-slate-200 text-sm leading-5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        {...props}
      />
    </>
  )
}

export default Input
