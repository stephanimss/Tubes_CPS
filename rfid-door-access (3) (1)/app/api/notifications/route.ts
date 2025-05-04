import { NextResponse } from "next/server"

// Simulasi database untuk menyimpan notifikasi
let notifications: any[] = [
  {
    id: "1",
    type: "access",
    message: "Ahmad Fauzi mengakses Pintu Utama",
    timestamp: "2025-05-01T17:30:00",
    read: false,
  },
  {
    id: "2",
    type: "motion",
    message: "Alarm gerakan terdeteksi di Pintu Utama",
    timestamp: "2025-05-01T02:15:00",
    read: true,
  },
  {
    id: "3",
    type: "door",
    message: "Pintu Utama terbuka lebih dari 5 menit",
    timestamp: "2025-05-01T10:20:00",
    read: false,
  },
]

export async function GET() {
  return NextResponse.json({ data: notifications })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Tambahkan notifikasi baru
    const newNotification = {
      id: `${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
      read: false,
    }

    notifications = [newNotification, ...notifications]

    return NextResponse.json({ success: true, data: newNotification })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, read } = body

    // Update status baca notifikasi
    const notificationIndex = notifications.findIndex((notification) => notification.id === id)

    if (notificationIndex === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    notifications[notificationIndex] = {
      ...notifications[notificationIndex],
      read,
    }

    return NextResponse.json({ success: true, data: notifications[notificationIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
