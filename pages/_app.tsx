import type { AppProps } from "next/app"

import "../styles/globals.css"

import RootContextProvider from "context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootContextProvider>
      <Component {...pageProps} />
    </RootContextProvider>
  )
}

export default MyApp
