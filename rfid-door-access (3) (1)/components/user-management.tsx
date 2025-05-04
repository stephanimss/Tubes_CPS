"use client"

import { useState } from "react"
import { CheckCircle2, ChevronDown, ChevronUp, Edit, Plus, Search, Trash2, User, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Contoh data pengguna
const initialUsers = [
  {
    id: "U001",
    name: "Ahmad Fauzi",
    cardId: "RFID-001",
    department: "IT",
    status: "active",
    lastAccess: "2025-05-01T17:30:00",
  },
  {
    id: "U002",
    name: "Budi Santoso",
    cardId: "RFID-002",
    department: "HR",
    status: "active",
    lastAccess: "2025-05-01T15:20:00",
  },
  {
    id: "U003",
    name: "Citra Dewi",
    cardId: "RFID-003",
    department: "Finance",
    status: "active",
    lastAccess: "2025-05-01T17:00:00",
  },
  {
    id: "U004",
    name: "Dian Purnama",
    cardId: "RFID-004",
    department: "Marketing",
    status: "inactive",
    lastAccess: "2025-05-01T13:45:00",
  },
  {
    id: "U005",
    name: "Eko Prasetyo",
    cardId: "RFID-005",
    department: "Operations",
    status: "active",
    lastAccess: "2025-05-01T16:10:00",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string | "all">("all")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    cardId: "",
    department: "",
    status: "active",
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredUsers = users
    .filter(
      (user) =>
        (statusFilter === "all" || user.status === statusFilter) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.cardId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.department.toLowerCase().includes(searchQuery.toLowerCase())),
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

  const handleAddUser = () => {
    // Generate a new ID
    const newId = `U${String(users.length + 1).padStart(3, "0")}`

    const userToAdd = {
      ...newUser,
      id: newId,
      lastAccess: new Date().toISOString(),
    }

    setUsers([...users, userToAdd])
    setNewUser({
      id: "",
      name: "",
      cardId: "",
      department: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditUser = () => {
    if (!currentUser) return

    setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const openEditDialog = (user: any) => {
    setCurrentUser(user)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Input
          placeholder="Cari nama, ID kartu, atau departemen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>Tambahkan pengguna baru dan kartu RFID-nya ke sistem.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Masukkan nama pengguna"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cardId">ID Kartu RFID</Label>
                  <Input
                    id="cardId"
                    value={newUser.cardId}
                    onChange={(e) => setNewUser({ ...newUser, cardId: e.target.value })}
                    placeholder="Masukkan ID kartu RFID"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Departemen</Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="Masukkan departemen"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddUser}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Nama
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("cardId")}>
                <div className="flex items-center">
                  ID Kartu
                  {sortColumn === "cardId" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                <div className="flex items-center">
                  Departemen
                  {sortColumn === "department" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Akses Terakhir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.cardId}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Aktif
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="mr-1 h-3 w-3" /> Tidak Aktif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.lastAccess)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isEditDialogOpen && currentUser?.id === user.id}
                        onOpenChange={(open) => {
                          if (!open) setIsEditDialogOpen(false)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => openEditDialog(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Pengguna</DialogTitle>
                            <DialogDescription>Edit informasi pengguna dan kartu RFID.</DialogDescription>
                          </DialogHeader>
                          {currentUser && (
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nama</Label>
                                <Input
                                  id="edit-name"
                                  value={currentUser.name}
                                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-cardId">ID Kartu RFID</Label>
                                <Input
                                  id="edit-cardId"
                                  value={currentUser.cardId}
                                  onChange={(e) => setCurrentUser({ ...currentUser, cardId: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-department">Departemen</Label>
                                <Input
                                  id="edit-department"
                                  value={currentUser.department}
                                  onChange={(e) => setCurrentUser({ ...currentUser, department: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                  value={currentUser.status}
                                  onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                                >
                                  <SelectTrigger id="edit-status">
                                    <SelectValue placeholder="Pilih status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Batal
                            </Button>
                            <Button onClick={handleEditUser}>Simpan</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>Tidak ada pengguna yang ditemukan</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
