import { useTheme } from 'hooks/theme'
import { ReactNode, useEffect } from 'react'
import Footer from '../Footer'
import Header from '../Header'

interface Props {
  children: ReactNode
  styles?: {
    readonly [key: string]: string
  }
}

export default function Layout({ children, styles = {} }: Props) {
  const { theme } = useTheme()

  return (
    <div className="page_container">
      <header>
        <Header />
      </header>
      <main className={styles?.main}>{children}</main>
      <Footer />
    </div>
  )
}
