import type { Metadata } from "next"
import { UserManagement } from "@/components/user-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Manajemen Pengguna - Sistem Akses Pintu RFID",
  description: "Manajemen pengguna dan kartu RFID pada sistem akses pintu",
}

export default function UsersPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Manajemen Pengguna</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="card-header-gradient">
          <CardTitle>Pengguna dan Kartu RFID</CardTitle>
          <CardDescription>Tambah, edit, atau hapus pengguna dan kartu RFID mereka</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <UserManagement />
        </CardContent>
      </Card>
    </div>
  )
}
