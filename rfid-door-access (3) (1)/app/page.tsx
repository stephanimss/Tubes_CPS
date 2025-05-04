import { Suspense } from "react"
import type { Metadata } from "next"
import { Activity, AlertTriangle, DoorOpen, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentAccess } from "@/components/recent-access"
import { DoorStatus } from "@/components/door-status"
import { MotionAlerts } from "@/components/motion-alerts"
import { StatsCards } from "@/components/stats-cards"
import { UserManagement } from "@/components/user-management"

export const metadata: Metadata = {
  title: "Dashboard Sistem Akses Pintu RFID",
  description: "Dashboard untuk sistem akses pintu berbasis RFID dengan deteksi gerakan",
}

export default function DashboardPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="grid gap-6">
        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-24 animate-pulse" />
              ))}
            </div>
          }
        >
          <StatsCards />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            <TabsTrigger value="overview" className="rounded-lg">
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="access-logs" className="rounded-lg">
              <DoorOpen className="mr-2 h-4 w-4" />
              Log Akses
            </TabsTrigger>
            <TabsTrigger value="motion-alerts" className="rounded-lg">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Alarm Gerakan
            </TabsTrigger>
            <TabsTrigger value="user-management" className="rounded-lg">
              <Users className="mr-2 h-4 w-4" />
              Manajemen Pengguna
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 overflow-hidden">
                <CardHeader className="card-header-gradient">
                  <CardTitle>Statistik Aktivitas</CardTitle>
                  <CardDescription>Jumlah akses pintu per hari dalam seminggu terakhir</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="card-header-gradient">
                  <CardTitle>Status Pintu</CardTitle>
                  <CardDescription>Status pintu real-time dan informasi terakhir</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <DoorStatus />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader className="card-header-gradient">
                  <CardTitle>Akses Terbaru</CardTitle>
                  <CardDescription>Daftar akses pintu terbaru</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <RecentAccess />
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="card-header-gradient">
                  <CardTitle>Alarm Gerakan Terbaru</CardTitle>
                  <CardDescription>Daftar alarm gerakan terbaru</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <MotionAlerts />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="access-logs">
            <Card className="overflow-hidden">
              <CardHeader className="card-header-gradient">
                <CardTitle>Histori Log Akses</CardTitle>
                <CardDescription>Daftar lengkap log akses pintu</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RecentAccess showAll />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="motion-alerts">
            <Card className="overflow-hidden">
              <CardHeader className="card-header-gradient">
                <CardTitle>Riwayat Alarm Gerakan</CardTitle>
                <CardDescription>Daftar lengkap alarm gerakan</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MotionAlerts showAll />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-management">
            <Card className="overflow-hidden">
              <CardHeader className="card-header-gradient">
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>Tambah, edit, atau hapus kartu RFID pengguna</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <UserManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
