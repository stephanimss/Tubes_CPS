"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "Sen",
    total: 12,
  },
  {
    name: "Sel",
    total: 18,
  },
  {
    name: "Rab",
    total: 15,
  },
  {
    name: "Kam",
    total: 22,
  },
  {
    name: "Jum",
    total: 30,
  },
  {
    name: "Sab",
    total: 8,
  },
  {
    name: "Min",
    total: 5,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          className="fill-gray-700 dark:fill-gray-400"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          className="fill-gray-700 dark:fill-gray-400"
        />
        <Tooltip
          formatter={(value) => [`${value} akses`, "Jumlah"]}
          labelFormatter={(label) => `Hari: ${label}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "0.5rem",
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}
