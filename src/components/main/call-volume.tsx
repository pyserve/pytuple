"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate random data for the chart
const generateData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      name: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      total: Math.floor(Math.random() * 50) + 10,
    })
  }

  return data
}

export function CallVolume() {
  const [data, setData] = useState([])
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              setHoveredBar(e.activeTooltipIndex)
            } else {
              setHoveredBar(null)
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            tickMargin={8}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <motion.div
                    className="rounded-lg border bg-card p-3 shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-foreground">{payload[0].payload.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Calls</span>
                        <span className="font-bold text-foreground">{payload[0].value}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="total"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

