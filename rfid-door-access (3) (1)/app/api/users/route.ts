import { NextResponse } from "next/server"

// Simulasi database untuk menyimpan data pengguna
let users = [
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

export async function GET() {
  return NextResponse.json({ data: users })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Tambahkan pengguna baru
    const newId = `U${String(users.length + 1).padStart(3, "0")}`
    const newUser = {
      id: newId,
      ...body,
      lastAccess: new Date().toISOString(),
    }

    users = [...users, newUser]

    return NextResponse.json({ success: true, data: newUser })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...userData } = body

    // Update pengguna yang ada
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users[userIndex] = { ...users[userIndex], ...userData }

    return NextResponse.json({ success: true, data: users[userIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Hapus pengguna
    const initialLength = users.length
    users = users.filter((user) => user.id !== id)

    if (users.length === initialLength) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
