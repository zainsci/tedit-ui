import React from "react"

interface IProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label?: string
}

const TextArea = ({ value, setValue, label, id, ...rest }: IProps) => {
  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue((e.target as HTMLInputElement).value)
  }

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="font-semibold mb-1 text-sm text-slate-600"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleOnChange}
        className="w-full px-3 py-2 mb-4 mt-1 text-sm block border rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
        rows={5}
        {...rest}
      ></textarea>
    </>
  )
}

export default TextArea
