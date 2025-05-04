"use client"

import { useState, useEffect } from "react"
import { DoorClosed, DoorOpen, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function DoorStatus() {
  const [doorStatus, setDoorStatus] = useState<"open" | "closed">("closed")
  const [lastOpenTime, setLastOpenTime] = useState<string>("2025-05-01T17:30:00")
  const [lastCloseTime, setLastCloseTime] = useState<string>("2025-05-01T17:32:00")
  const [openDuration, setOpenDuration] = useState<number>(0)

  // Simulasi perubahan status pintu setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = doorStatus === "open" ? "closed" : "open"
      setDoorStatus(newStatus)

      const now = new Date().toISOString()

      if (newStatus === "open") {
        setLastOpenTime(now)
      } else {
        setLastCloseTime(now)
        // Hitung durasi pintu terbuka dalam detik
        const openTime = new Date(lastOpenTime).getTime()
        const closeTime = new Date(now).getTime()
        setOpenDuration(Math.round((closeTime - openTime) / 1000))
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [doorStatus, lastOpenTime])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} detik`
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes} menit ${remainingSeconds} detik`
    } else {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours} jam ${minutes} menit`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          {doorStatus === "open" ? (
            <DoorOpen className="h-16 w-16 text-red-500 animate-pulse" />
          ) : (
            <DoorClosed className="h-16 w-16 text-green-500" />
          )}
          <div
            className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full ${doorStatus === "open" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"}`}
          >
            <div className={`status-indicator ${doorStatus === "open" ? "inactive" : "active"}`}></div>
          </div>
        </div>
        <h2 className={`text-2xl font-bold ${doorStatus === "open" ? "text-red-500" : "text-green-500"}`}>
          {doorStatus === "open" ? "Pintu Terbuka" : "Pintu Tertutup"}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden border-0 bg-gray-50 shadow-sm dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <DoorOpen className="h-4 w-4" />
                </div>
                <span className="font-medium">Terakhir Dibuka</span>
              </div>
              <Badge variant="outline" className="ml-auto bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                <Clock className="mr-1 h-3 w-3" />
                {formatDate(lastOpenTime)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gray-50 shadow-sm dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-300">
                  <DoorClosed className="h-4 w-4" />
                </div>
                <span className="font-medium">Terakhir Ditutup</span>
              </div>
              <Badge
                variant="outline"
                className="ml-auto bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
              >
                <Clock className="mr-1 h-3 w-3" />
                {formatDate(lastCloseTime)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-0 bg-gray-50 shadow-sm dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                <Clock className="h-4 w-4" />
              </div>
              <span className="font-medium">Durasi Terbuka Terakhir</span>
            </div>
            <Badge className="ml-auto bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              {formatDuration(openDuration)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
