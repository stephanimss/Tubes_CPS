import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Statistik - Sistem Akses Pintu RFID",
  description: "Statistik aktivitas pada sistem akses pintu berbasis RFID",
}

export default function StatisticsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Statistik Aktivitas</h1>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          <TabsTrigger value="daily" className="rounded-lg">
            Harian
          </TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-lg">
            Mingguan
          </TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-lg">
            Bulanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="overflow-hidden">
            <CardHeader className="card-header-gradient">
              <CardTitle>Aktivitas Harian</CardTitle>
              <CardDescription>Jumlah akses pintu per jam dalam 24 jam terakhir</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="overflow-hidden">
            <CardHeader className="card-header-gradient">
              <CardTitle>Aktivitas Mingguan</CardTitle>
              <CardDescription>Jumlah akses pintu per hari dalam seminggu terakhir</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="overflow-hidden">
            <CardHeader className="card-header-gradient">
              <CardTitle>Aktivitas Bulanan</CardTitle>
              <CardDescription>Jumlah akses pintu per minggu dalam sebulan terakhir</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
