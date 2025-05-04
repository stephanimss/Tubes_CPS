import { NextResponse } from "next/server"

// Simulasi database untuk menyimpan data RFID
let accessLogs: any[] = []
let motionAlerts: any[] = []
let doorStatus = "closed"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (type === "access-logs") {
    return NextResponse.json({ data: accessLogs })
  }

  if (type === "motion-alerts") {
    return NextResponse.json({ data: motionAlerts })
  }

  if (type === "door-status") {
    return NextResponse.json({ status: doorStatus })
  }

  return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type === "access") {
      // Tambahkan log akses baru
      const newLog = {
        id: `${Date.now()}`,
        ...data,
        timestamp: new Date().toISOString(),
      }
      accessLogs = [newLog, ...accessLogs]

      return NextResponse.json({ success: true, data: newLog })
    }

    if (type === "motion") {
      // Tambahkan alert gerakan baru
      const newAlert = {
        id: `${Date.now()}`,
        ...data,
        timestamp: new Date().toISOString(),
      }
      motionAlerts = [newAlert, ...motionAlerts]

      return NextResponse.json({ success: true, data: newAlert })
    }

    if (type === "door-status") {
      // Update status pintu
      doorStatus = data.status

      return NextResponse.json({ success: true, status: doorStatus })
    }
    \
    return NextResponse.json({ error: "success: true, status: doorStatus})
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
