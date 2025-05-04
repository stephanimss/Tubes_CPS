"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoorOpen, Lock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulasi penundaan jaringan
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kredensial demo sederhana
      if (username === "admin" && password === "password") {
        // Simpan status login di localStorage
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify({ username: "admin", role: "Administrator" }))

        // Redirect ke dashboard
        router.push("/")
      } else {
        setError("Username atau password salah")
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 p-4">
      <Card className="mx-auto w-full max-w-md overflow-hidden shadow-xl">
        <div className="flex justify-center bg-primary/10 p-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-primary/20 p-3">
              <DoorOpen className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RFID Access System</h1>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">Masukkan kredensial Anda untuk mengakses dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Untuk demo, gunakan: <br />
            <span className="font-semibold">Username: admin</span> <br />
            <span className="font-semibold">Password: password</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
