import React from "react"

interface IProps {
  tiny?: boolean
}

const Loader = ({ tiny = false }: IProps) => {
  return (
    <div
      className={`w-full flex justify-center items-center animate-spin ${
        !tiny && "my-4"
      }`}
    >
      <svg
        height="100%"
        viewBox="0 0 32 32"
        width="100%"
        className="w-6 h-6 text-purple-500"
      >
        <circle
          cx="16"
          cy="16"
          fill="none"
          r={`${tiny ? 10 : 14}`}
          strokeWidth="4"
          style={{ stroke: "currentColor", opacity: "0.2" }}
        ></circle>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r={`${tiny ? 10 : 14}`}
          strokeWidth="4"
          style={{
            stroke: "currentColor",
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        ></circle>
      </svg>
    </div>
  )
}

export default Loader
