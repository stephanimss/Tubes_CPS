import type { Metadata } from "next"
import { RecentAccess } from "@/components/recent-access"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Log Akses - Sistem Akses Pintu RFID",
  description: "Histori log akses pintu berbasis RFID",
}

export default function AccessLogsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Histori Log Akses</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="card-header-gradient">
          <CardTitle>Log Akses Pintu</CardTitle>
          <CardDescription>Daftar lengkap log akses pintu dengan kartu RFID</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <RecentAccess showAll />
        </CardContent>
      </Card>
    </div>
  )
}
