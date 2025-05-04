"use client"

import { useState } from "react"
import { Mail, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  // Pengaturan notifikasi
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dashboardNotifications, setDashboardNotifications] = useState(true)
  const [emailAddress, setEmailAddress] = useState("admin@example.com")

  // Pengaturan sistem
  const [doorOpenTimeout, setDoorOpenTimeout] = useState("300")
  const [motionDetectionDelay, setMotionDetectionDelay] = useState("30")
  const [apiEndpoint, setApiEndpoint] = useState("http://192.168.1.100:8080")

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Pengaturan Notifikasi Disimpan",
      description: "Pengaturan notifikasi Anda telah berhasil disimpan.",
    })
  }

  const handleSaveSystemSettings = () => {
    toast({
      title: "Pengaturan Sistem Disimpan",
      description: "Pengaturan sistem Anda telah berhasil disimpan.",
    })
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Pengaturan</h1>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          <TabsTrigger value="notifications" className="rounded-lg">
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg">
            Sistem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="overflow-hidden">
            <CardHeader className="card-header-gradient">
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Atur bagaimana Anda ingin menerima notifikasi dari sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-1.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Notifikasi Email
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kirim notifikasi ke alamat email Anda</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                {emailNotifications && (
                  <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                    <Label htmlFor="email-address" className="text-base">
                      Alamat Email
                    </Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        id="email-address"
                        type="email"
                        placeholder="email@example.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-1.5">
                    <Label htmlFor="dashboard-notifications" className="text-base">
                      Notifikasi Dashboard
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tampilkan notifikasi di dashboard web</p>
                  </div>
                  <Switch
                    id="dashboard-notifications"
                    checked={dashboardNotifications}
                    onCheckedChange={setDashboardNotifications}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
              <Button onClick={handleSaveNotificationSettings} className="flex items-center gap-1">
                <Save className="h-4 w-4" /> Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="overflow-hidden">
            <CardHeader className="card-header-gradient">
              <CardTitle>Pengaturan Sistem</CardTitle>
              <CardDescription>Konfigurasi pengaturan sistem akses pintu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="door-timeout" className="text-base">
                    Batas Waktu Pintu Terbuka (detik)
                  </Label>
                  <Input
                    id="door-timeout"
                    type="number"
                    min="0"
                    value={doorOpenTimeout}
                    onChange={(e) => setDoorOpenTimeout(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Waktu maksimum pintu boleh terbuka sebelum mengirim peringatan
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motion-delay" className="text-base">
                    Penundaan Deteksi Gerakan (detik)
                  </Label>
                  <Input
                    id="motion-delay"
                    type="number"
                    min="0"
                    value={motionDetectionDelay}
                    onChange={(e) => setMotionDetectionDelay(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Waktu penundaan sebelum alarm gerakan diaktifkan setelah deteksi
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="api-endpoint" className="text-base">
                    Endpoint API Perangkat
                  </Label>
                  <Input id="api-endpoint" value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)} />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    URL endpoint API untuk berkomunikasi dengan perangkat RFID
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
              <Button onClick={handleSaveSystemSettings} className="flex items-center gap-1">
                <Save className="h-4 w-4" /> Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
