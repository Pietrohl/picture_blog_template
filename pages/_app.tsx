import '../styles/globals.scss'
import { ThemeProvider } from 'hooks/theme'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { NProgressOptions } from 'nprogress'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const progressBarOptions: Partial<NProgressOptions> = {
  showSpinner: false,
  trickleSpeed: 300,
  speed: 700,
  minimum: 0.25,
  easing: 'ease'
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure(progressBarOptions)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
  )
}

export default MyApp
