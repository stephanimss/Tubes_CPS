"use client"

import { useState } from "react"
import { Bell, Check, ChevronDown, ChevronUp, Clock, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Contoh data notifikasi
const initialNotifications = [
  {
    id: "1",
    type: "access",
    message: "Ahmad Fauzi mengakses Pintu Utama",
    timestamp: "2025-05-01T17:30:00",
    read: false,
  },
  {
    id: "2",
    type: "motion",
    message: "Alarm gerakan terdeteksi di Pintu Utama",
    timestamp: "2025-05-01T02:15:00",
    read: true,
  },
  {
    id: "3",
    type: "door",
    message: "Pintu Utama terbuka lebih dari 5 menit",
    timestamp: "2025-05-01T10:20:00",
    read: false,
  },
  {
    id: "4",
    type: "access",
    message: "Budi Santoso mengakses Pintu Belakang",
    timestamp: "2025-05-01T15:20:00",
    read: false,
  },
  {
    id: "5",
    type: "motion",
    message: "Alarm gerakan terdeteksi di Pintu Belakang",
    timestamp: "2025-05-01T03:30:00",
    read: true,
  },
  {
    id: "6",
    type: "door",
    message: "Pintu Belakang terbuka lebih dari 3 menit",
    timestamp: "2025-05-01T11:45:00",
    read: false,
  },
  {
    id: "7",
    type: "access",
    message: "Citra Dewi mengakses Pintu Samping",
    timestamp: "2025-05-01T17:00:00",
    read: true,
  },
  {
    id: "8",
    type: "motion",
    message: "Alarm gerakan terdeteksi di Pintu Samping",
    timestamp: "2025-05-01T19:30:00",
    read: false,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [typeFilter, setTypeFilter] = useState<string | "all">("all")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const filteredNotifications = notifications
    .filter(
      (notification) =>
        (typeFilter === "all" || notification.type === typeFilter) &&
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "access":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Akses</Badge>
      case "motion":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Gerakan</Badge>
      case "door":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pintu</Badge>
      default:
        return <Badge variant="secondary">Lainnya</Badge>
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Notifikasi</h1>
        {unreadCount > 0 && (
          <Badge className="bg-primary/10 text-primary dark:bg-primary/20">{unreadCount} belum dibaca</Badge>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="card-header-gradient">
          <CardTitle>Daftar Notifikasi</CardTitle>
          <CardDescription>Notifikasi dari sistem akses pintu berbasis RFID</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Cari notifikasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Semua Tipe</option>
                  <option value="access">Akses</option>
                  <option value="motion">Gerakan</option>
                  <option value="door">Pintu</option>
                </select>

                <Button variant="outline" onClick={handleMarkAllAsRead} className="flex items-center gap-1">
                  <Check className="h-4 w-4" /> Tandai Semua Dibaca
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-900">
                  <TableRow>
                    <TableHead className="cursor-pointer rounded-tl-xl" onClick={() => handleSort("timestamp")}>
                      <div className="flex items-center">
                        Waktu
                        {sortColumn === "timestamp" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Pesan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="rounded-tr-xl text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <TableRow
                        key={notification.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-900 ${notification.read ? "" : "bg-blue-50/50 dark:bg-blue-900/20"}`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            {formatDate(notification.timestamp)}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(notification.type)}</TableCell>
                        <TableCell>{notification.message}</TableCell>
                        <TableCell>
                          {notification.read ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Dibaca
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              <Bell className="mr-1 h-3 w-3 animate-pulse" /> Belum Dibaca
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
                            >
                              <Check className="mr-2 h-4 w-4" /> Tandai Dibaca
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                          <Search className="mb-2 h-8 w-8" />
                          <p>Tidak ada notifikasi yang ditemukan</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
