"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronDown, ChevronUp, Clock, Search, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Contoh data akses
const accessData = [
  {
    id: "1",
    userId: "U001",
    userName: "Ahmad Fauzi",
    cardId: "RFID-001",
    timestamp: "2025-05-01T08:30:00",
    status: "success",
  },
  {
    id: "2",
    userId: "U002",
    userName: "Budi Santoso",
    cardId: "RFID-002",
    timestamp: "2025-05-01T09:15:00",
    status: "success",
  },
  {
    id: "3",
    userId: "U003",
    userName: "Citra Dewi",
    cardId: "RFID-003",
    timestamp: "2025-05-01T10:05:00",
    status: "success",
  },
  {
    id: "4",
    userId: "U001",
    userName: "Ahmad Fauzi",
    cardId: "RFID-001",
    timestamp: "2025-05-01T12:30:00",
    status: "success",
  },
  {
    id: "5",
    userId: "U004",
    userName: "Dian Purnama",
    cardId: "RFID-004",
    timestamp: "2025-05-01T13:45:00",
    status: "failed",
  },
  {
    id: "6",
    userId: "U002",
    userName: "Budi Santoso",
    cardId: "RFID-002",
    timestamp: "2025-05-01T15:20:00",
    status: "success",
  },
  {
    id: "7",
    userId: "U005",
    userName: "Eko Prasetyo",
    cardId: "RFID-005",
    timestamp: "2025-05-01T16:10:00",
    status: "success",
  },
  {
    id: "8",
    userId: "U003",
    userName: "Citra Dewi",
    cardId: "RFID-003",
    timestamp: "2025-05-01T17:00:00",
    status: "success",
  },
  {
    id: "9",
    userId: "U001",
    userName: "Ahmad Fauzi",
    cardId: "RFID-001",
    timestamp: "2025-05-01T17:30:00",
    status: "success",
  },
  {
    id: "10",
    userId: "U006",
    userName: "Tidak Dikenal",
    cardId: "RFID-UNKNOWN",
    timestamp: "2025-05-01T18:15:00",
    status: "failed",
  },
]

export function RecentAccess({ showAll = false }: { showAll?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState<string[]>(["success", "failed"])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredData = accessData
    .filter(
      (item) =>
        statusFilter.includes(item.status) &&
        (item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.cardId.toLowerCase().includes(searchQuery.toLowerCase())),
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

  return (
    <div className="space-y-4">
      {showAll && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Cari nama atau ID kartu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Filter Status <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("success")}
                onCheckedChange={(checked) => {
                  setStatusFilter(checked ? [...statusFilter, "success"] : statusFilter.filter((s) => s !== "success"))
                }}
              >
                Berhasil
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("failed")}
                onCheckedChange={(checked) => {
                  setStatusFilter(checked ? [...statusFilter, "failed"] : statusFilter.filter((s) => s !== "failed"))
                }}
              >
                Gagal
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <TableHead className="cursor-pointer" onClick={() => handleSort("userName")}>
                <div className="flex items-center">
                  Pengguna
                  {sortColumn === "userName" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>ID Kartu</TableHead>
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
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>
                    <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">{item.cardId}</code>
                  </TableCell>
                  <TableCell>
                    {item.status === "success" ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Berhasil
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        <XCircle className="mr-1 h-3 w-3" /> Gagal
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
            <Link href="/access-logs" className="flex items-center">
              Lihat Semua Log Akses
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
