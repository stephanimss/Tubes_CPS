"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isLoggedIn, logout, user } = useAuth()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    localStorage.setItem("sidebarOpen", String(!isOpen))
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  useEffect(() => {
    // Memuat preferensi sidebar dari localStorage
    const savedSidebarState = localStorage.getItem("sidebarOpen")
    if (savedSidebarState !== null) {
      setIsOpen(savedSidebarState === "true")
    }
  }, [])

  // Jika tidak login, jangan tampilkan sidebar
  if (!isLoggedIn || pathname === "/login") {
    return null
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="fixed left-4 top-4 z-50 md:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 md:flex",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%-3rem)]",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <DoorOpen className="h-6 w-6 text-primary" />
            <span className={cn("text-xl font-bold transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>
              RFID Access
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        {/* User info */}
        {isOpen && user && (
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <p className="text-sm font-medium">{user.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
        )}

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link href="/" className={cn("sidebar-item", pathname === "/" && "active")}>
              <Home className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Dashboard</span>
            </Link>
            <Link href="/access-logs" className={cn("sidebar-item", pathname === "/access-logs" && "active")}>
              <DoorOpen className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Log Akses</span>
            </Link>
            <Link href="/motion-alerts" className={cn("sidebar-item", pathname === "/motion-alerts" && "active")}>
              <AlertTriangle className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Alarm Gerakan</span>
            </Link>
            <Link href="/statistics" className={cn("sidebar-item", pathname === "/statistics" && "active")}>
              <Activity className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Statistik</span>
            </Link>
            <Link href="/users" className={cn("sidebar-item", pathname === "/users" && "active")}>
              <Users className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Manajemen Pengguna</span>
            </Link>
            <Link href="/notifications" className={cn("sidebar-item", pathname === "/notifications" && "active")}>
              <Bell className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Notifikasi</span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-200 px-2 py-4 dark:border-gray-800">
          <nav className="grid gap-1">
            <Link href="/settings" className={cn("sidebar-item", pathname === "/settings" && "active")}>
              <Settings className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Pengaturan</span>
            </Link>
            <button onClick={logout} className="sidebar-item w-full text-left">
              <LogOut className="h-5 w-5" />
              <span className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>Keluar</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <DoorOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RFID Access</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        {user && (
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <p className="text-sm font-medium">{user.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
        )}

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link href="/" className={cn("sidebar-item", pathname === "/" && "active")}>
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/access-logs" className={cn("sidebar-item", pathname === "/access-logs" && "active")}>
              <DoorOpen className="h-5 w-5" />
              <span>Log Akses</span>
            </Link>
            <Link href="/motion-alerts" className={cn("sidebar-item", pathname === "/motion-alerts" && "active")}>
              <AlertTriangle className="h-5 w-5" />
              <span>Alarm Gerakan</span>
            </Link>
            <Link href="/statistics" className={cn("sidebar-item", pathname === "/statistics" && "active")}>
              <Activity className="h-5 w-5" />
              <span>Statistik</span>
            </Link>
            <Link href="/users" className={cn("sidebar-item", pathname === "/users" && "active")}>
              <Users className="h-5 w-5" />
              <span>Manajemen Pengguna</span>
            </Link>
            <Link href="/notifications" className={cn("sidebar-item", pathname === "/notifications" && "active")}>
              <Bell className="h-5 w-5" />
              <span>Notifikasi</span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-200 px-2 py-4 dark:border-gray-800">
          <nav className="grid gap-1">
            <Link href="/settings" className={cn("sidebar-item", pathname === "/settings" && "active")}>
              <Settings className="h-5 w-5" />
              <span>Pengaturan</span>
            </Link>
            <button onClick={logout} className="sidebar-item w-full text-left">
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
