import React from "react"

interface IProps extends React.HTMLProps<HTMLInputElement> {
  type: string
  id: string
  label?: string
}

const Input = ({ type, id, label, ...props }: IProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="font-semibold mb-1 text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 mb-4 mt-1 text-sm block border rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
        {...props}
      />
    </>
  )
}

export default Input
