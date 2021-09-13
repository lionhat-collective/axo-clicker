import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { Moralis } from 'moralis'

function AxoClickerApp({ Component, pageProps }: AppProps) {
  if (
    typeof process.env.NEXT_PUBLIC_MORALIS_APP_ID === 'undefined' ||
    typeof process.env.NEXT_PUBLIC_MORALIS_SERVER_URL === 'undefined'
  ) {
    throw new Error('Moralis environment variables were not set!')
  }
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  )
}
export default AxoClickerApp
