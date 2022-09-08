import React from "react"

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode
  type: "button" | "submit" | "reset" | undefined
}

const Button = ({ children, type, ...props }: IProps) => {
  return (
    <button
      className="h-10 mt-2 border border-purple-500 bg-purple-500 hover:bg-purple-400 hover:border-purple-400 rounded-md text-white font-bold"
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
