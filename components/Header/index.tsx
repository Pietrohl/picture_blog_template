import { ThemeTypes, useTheme } from 'hooks/theme'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

import Logo from '../Assets/Logo'
import ThemeSwitch from '../ThemeSwitch'

const Header: React.FC = () => {
  const { theme } = useTheme()
  const [isBurguerActive, setIsBurgerActive] = useState(false)

  const toggleBurger = useCallback(() => {
    setIsBurgerActive(state => {
      return !state
    })
  }, [setIsBurgerActive])

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/" passHref>
          <a>
            <Logo
              height={56}
              width={210}
              fill={theme === ThemeTypes.light ? '#2d2906' : 'white'}
            />
          </a>
        </Link>

        <a
          role="button"
          className={`navbar-burger  ${isBurguerActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarButtons"
          onClick={toggleBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarButtons"
        className={`navbar-menu ${isBurguerActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button">Default</a>
              <a className="button is-outlined">Outlined</a>
              <a className="button is-primary">Primary</a>
              <a className="button is-light">Light</a>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
