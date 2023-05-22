import '@/styles/globals.css'
import { Provider } from 'react-redux'
import Layout from './shared/layout'
import type { AppProps } from 'next/app'
import store from './redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return (

    <Provider store={store}>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </Provider>
  )
}
