"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ChevronDown, ChevronUp, Clock, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Contoh data alarm gerakan
const motionData = [
  {
    id: "1",
    timestamp: "2025-05-01T02:15:00",
    location: "Pintu Utama",
    severity: "high",
    status: "triggered",
  },
  {
    id: "2",
    timestamp: "2025-05-01T03:30:00",
    location: "Pintu Utama",
    severity: "high",
    status: "resolved",
  },
  {
    id: "3",
    timestamp: "2025-05-01T07:45:00",
    location: "Pintu Belakang",
    severity: "medium",
    status: "triggered",
  },
  {
    id: "4",
    timestamp: "2025-05-01T08:10:00",
    location: "Pintu Belakang",
    severity: "medium",
    status: "resolved",
  },
  {
    id: "5",
    timestamp: "2025-05-01T14:20:00",
    location: "Pintu Samping",
    severity: "low",
    status: "triggered",
  },
  {
    id: "6",
    timestamp: "2025-05-01T14:25:00",
    location: "Pintu Samping",
    severity: "low",
    status: "resolved",
  },
  {
    id: "7",
    timestamp: "2025-05-01T19:30:00",
    location: "Pintu Utama",
    severity: "high",
    status: "triggered",
  },
  {
    id: "8",
    timestamp: "2025-05-01T22:15:00",
    location: "Pintu Belakang",
    severity: "high",
    status: "triggered",
  },
]

export function MotionAlerts({ showAll = false }: { showAll?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [severityFilter, setSeverityFilter] = useState<string | "all">("all")
  const [statusFilter, setStatusFilter] = useState<string | "all">("all")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredData = motionData
    .filter(
      (item) =>
        (severityFilter === "all" || item.severity === severityFilter) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        item.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const displayData = showAll ? filteredData : filteredData.slice(0, 5)

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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Tinggi</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Sedang</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Rendah</Badge>
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {showAll && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Cari lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Tingkat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tingkat</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="low">Rendah</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="triggered">Aktif</SelectItem>
                <SelectItem value="resolved">Teratasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

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
              <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                <div className="flex items-center">
                  Lokasi
                  {sortColumn === "location" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Tingkat</TableHead>
              <TableHead className="rounded-tr-xl">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.length > 0 ? (
              displayData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {formatDate(item.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getSeverityBadge(item.severity)}</TableCell>
                  <TableCell>
                    {item.status === "triggered" ? (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        <AlertTriangle className="mr-1 h-3 w-3" /> Aktif
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Teratasi
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <Search className="mb-2 h-8 w-8" />
                    <p>Tidak ada data yang ditemukan</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!showAll && filteredData.length > 5 && (
        <div className="flex justify-center">
          <Button variant="outline" asChild className="group">
            <Link href="/motion-alerts" className="flex items-center">
              Lihat Semua Alarm Gerakan
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
