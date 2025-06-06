import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'

// Create context with both token and setter (optional)
export const TokenContext = createContext(null)

const TOKEN_KEY = 'token'

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const extractedToken = Cookies.get(TOKEN_KEY)

    if (extractedToken) {
      setToken(extractedToken)
    } else if (location.pathname !== '/login') {
      navigate('/login')
    }
  }, [location.pathname, navigate])

  return <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
}

TokenProvider.propTypes = {
  children: PropTypes.node,
}
