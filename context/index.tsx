import React, { createContext, useState } from "react"

interface IState {
  token: string
  username: string
}

function getDefaultState(): IState {
  if (typeof window !== "undefined") {
    const localState: IState = {
      token: localStorage.getItem("jwt_token") as string,
      username: localStorage.getItem("username") as string,
    }
    return localState
  }
  return {
    token: "",
    username: "",
  }
}

const defaultState: IState = {
  ...getDefaultState(),
}

interface IRootContext {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
}

const defaultRootContext: IRootContext = {
  state: defaultState,
  setState: () => {},
}

export const RootContext = createContext<IRootContext>(defaultRootContext)

const RootContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<IState>(defaultState)

  return (
    <RootContext.Provider value={{ state, setState }}>
      {children}
    </RootContext.Provider>
  )
}

export default RootContextProvider
