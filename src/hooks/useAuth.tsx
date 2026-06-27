import React, { createContext, useContext, useState } from 'react'

interface AuthCtx {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const Ctx = createContext<AuthCtx>({ isLoggedIn: false, login: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Ctx.Provider value={{ isLoggedIn, login: () => setIsLoggedIn(true), logout: () => setIsLoggedIn(false) }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => useContext(Ctx)
