"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Cek status login dari localStorage saat komponen dimuat
    const checkLoginStatus = () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
      const storedUser = localStorage.getItem("user")

      if (storedIsLoggedIn === "true" && storedUser) {
        setUser(JSON.parse(storedUser))
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }

    checkLoginStatus()
  }, [])

  useEffect(() => {
    // Redirect ke login jika tidak login dan bukan di halaman login
    if (!isLoading && !isLoggedIn && pathname !== "/login") {
      router.push("/login")
    }

    // Redirect ke dashboard jika sudah login dan di halaman login
    if (!isLoading && isLoggedIn && pathname === "/login") {
      router.push("/")
    }
  }, [isLoggedIn, isLoading, pathname, router])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulasi login
    if (username === "admin" && password === "password") {
      const userData = { username: "admin", role: "Administrator" }
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    router.push("/login")
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
