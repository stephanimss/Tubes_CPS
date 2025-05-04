import type { Metadata } from "next"
import { MotionAlerts } from "@/components/motion-alerts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Alarm Gerakan - Sistem Akses Pintu RFID",
  description: "Riwayat alarm gerakan pada sistem akses pintu berbasis RFID",
}

export default function MotionAlertsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Riwayat Alarm Gerakan</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="card-header-gradient">
          <CardTitle>Alarm Gerakan</CardTitle>
          <CardDescription>Daftar lengkap alarm gerakan yang terdeteksi oleh sensor PIR</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <MotionAlerts showAll />
        </CardContent>
      </Card>
    </div>
  )
}
