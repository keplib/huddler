import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
     <div className="h-screen w-full bg-red-200">
      <Component {...pageProps} />
      {/* <NavBar /> */}
    </div>

  )
}

export default MyApp
