import React from "react"

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode
  variant?: "primary" | "outlined"
  color?: "red" | "green" | "blue" | "purple"
  size?: "sm" | "md" | "lg"
  type?: "button" | "submit" | "reset" | undefined
}

const Button = ({
  children,
  variant = "primary",
  color = "purple",
  size = "md",
  type,
  ...props
}: IProps) => {
  function getClassNames() {
    const className = [
      "font-medium",
      "text-sm",
      "rounded-md",
      "text-white",
      "border",
      "shadow-md",
    ]

    const colors = {
      red: {},
      green: {},
      blue: {},
    }

    switch (size) {
      case "sm":
        className.push("h-8", "px-4")
        break
      case "md":
        className.push("h-10", "px-6")
        break
      case "lg":
        className.push("h-12", "px-8")
        break
    }

    switch (color) {
      case "purple":
        className.push("border-purple-500", "hover:border-purple-400")
        break
      case "red":
        className.push("border-red-500", "hover:border-red-400")
        break
      case "green":
        className.push("border-green-500", "hover:border-green-400")
        break
      case "blue":
        className.push("border-blue-500", "hover:border-blue-400")
        break
    }

    if (variant === "primary")
      switch (color) {
        case "purple":
          className.push("bg-purple-500", "hover:bg-purple-400")
          break
        case "red":
          className.push("bg-red-500", "hover:bg-red-400")
          break
        case "green":
          className.push("bg-green-500", "hover:bg-green-400")
          break
        case "blue":
          className.push("bg-blue-500", "hover:bg-blue-400")
          break
      }

    if (variant === "outlined")
      switch (color) {
        case "purple":
          className.push("text-purple-500", "hover:text-purple-400")
          break
        case "red":
          className.push("text-red-500", "hover:text-red-400")
          break
        case "green":
          className.push("text-green-500", "hover:text-green-400")
          break
        case "blue":
          className.push("text-blue-500", "hover:text-blue-400")
          break
      }

    return className.join(" ")
  }

  return (
    <button className={getClassNames()} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
