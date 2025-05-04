"use client"

import { AlertTriangle, CheckCircle2, DoorOpen, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="stats-card">
        <DoorOpen className="stats-card-icon" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Akses Hari Ini</p>
          <h2 className="text-3xl font-bold">24</h2>
          <p className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
            <span className="i-lucide-trending-up mr-1" />
            +8% dari kemarin
          </p>
        </div>
      </Card>

      <Card className="stats-card">
        <CheckCircle2 className="stats-card-icon text-green-600" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Akses Berhasil</p>
          <h2 className="text-3xl font-bold">22</h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">91.7% dari total akses</p>
        </div>
      </Card>

      <Card className="stats-card">
        <XCircle className="stats-card-icon text-red-600" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Akses Gagal</p>
          <h2 className="text-3xl font-bold">2</h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">8.3% dari total akses</p>
        </div>
      </Card>

      <Card className="stats-card">
        <AlertTriangle className="stats-card-icon text-amber-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alarm Gerakan</p>
          <h2 className="text-3xl font-bold">3</h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">2 aktif, 1 teratasi</p>
        </div>
      </Card>
    </div>
  )
}
