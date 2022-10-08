import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    // Container for page
    <div className='w-full h-screen bg-red-200 flex flex-col justify-center'>
      {/* Globally binds navbar for every page */}      
      <Navbar />
      {/* Container for responsiveness applied to every page */}
      <div className='self-center bg-slate-200 h-full w-full mt-16'>
      <Component {...pageProps}/>
      </div>
    </div>


  )
}

export default MyApp
