"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const durationData = [
  { name: "0-1 min", value: 15 },
  { name: "1-3 min", value: 30 },
  { name: "3-5 min", value: 25 },
  { name: "5-10 min", value: 20 },
  { name: "10+ min", value: 10 },
]

const hourlyData = [
  { hour: "12 AM", calls: 5 },
  { hour: "2 AM", calls: 3 },
  { hour: "4 AM", calls: 2 },
  { hour: "6 AM", calls: 4 },
  { hour: "8 AM", calls: 10 },
  { hour: "10 AM", calls: 18 },
  { hour: "12 PM", calls: 22 },
  { hour: "2 PM", calls: 25 },
  { hour: "4 PM", calls: 20 },
  { hour: "6 PM", calls: 15 },
  { hour: "8 PM", calls: 12 },
  { hour: "10 PM", calls: 8 },
]

const weeklyData = [
  { day: "Mon", calls: 45, duration: 180 },
  { day: "Tue", calls: 52, duration: 210 },
  { day: "Wed", calls: 48, duration: 195 },
  { day: "Thu", calls: 60, duration: 240 },
  { day: "Fri", calls: 55, duration: 220 },
  { day: "Sat", calls: 30, duration: 120 },
  { day: "Sun", calls: 25, duration: 100 },
]

const COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#f43f5e", "#8b5cf6"]

export function CallMetrics() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [activeTab, setActiveTab] = useState("distribution")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="distribution" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="distribution"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Call Distribution
          </TabsTrigger>
          <TabsTrigger
            value="hourly"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Hourly Activity
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Weekly Trends
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="distribution" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle>Call Duration Distribution</CardTitle>
                    <CardDescription>Breakdown of calls by duration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            {COLORS.map((color, index) => (
                              <linearGradient
                                key={`gradient-${index}`}
                                id={`colorGradient-${index}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                              </linearGradient>
                            ))}
                          </defs>
                          <Pie
                            data={durationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            paddingAngle={2}
                            animationDuration={1000}
                            animationBegin={200}
                          >
                            {durationData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={`url(#colorGradient-${index % COLORS.length})`}
                                stroke="none"
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} calls`, "Volume"]}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "1px solid var(--border)",
                              backgroundColor: "var(--background)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle>Call Success Rate</CardTitle>
                    <CardDescription>Percentage of successful vs. missed calls</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="relative h-48 w-48">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            className="text-muted-foreground/20"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <motion.circle
                            className="text-primary"
                            strokeWidth="10"
                            strokeDasharray={`${85 * 2.5} ${100 * 2.5}`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            initial={{ strokeDashoffset: 100 * 2.5 }}
                            animate={{ strokeDashoffset: (100 - 85) * 2.5 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            className="text-4xl font-bold"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            85%
                          </motion.span>
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="hourly" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Hourly Call Volume</CardTitle>
                  <CardDescription>Call distribution throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hourlyData}>
                        <defs>
                          <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            backgroundColor: "var(--background)",
                          }}
                        />
                        <Bar
                          dataKey="calls"
                          fill="url(#hourlyGradient)"
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Weekly Call Trends</CardTitle>
                  <CardDescription>Call volume and duration by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <defs>
                          <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
                          </linearGradient>
                          <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.3} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            backgroundColor: "var(--background)",
                          }}
                        />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="calls"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                          activeDot={{ r: 8 }}
                          name="Number of Calls"
                          animationDuration={1500}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="duration"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                          name="Avg. Duration (sec)"
                          animationDuration={1500}
                          animationBegin={300}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

