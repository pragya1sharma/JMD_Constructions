import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser, pickErrorMessage } from "../services/authService";


const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    setLoading(true)
    try {
      const data = await loginUser(credentials)
      setUser(data.data)
      setToken(data.token)
      return { success: true }
    } catch (err) {
      return { success: false, message: pickErrorMessage(err) }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (payload) => {
    setLoading(true)
    try {
      const data = await registerUser(payload)
      setUser(data.data)
      setToken(data.token)
      return { success: true }
    } catch (err) {
      return { success: false, message: pickErrorMessage(err) }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
