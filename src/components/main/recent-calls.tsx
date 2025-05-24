"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PhoneCall, PhoneOff, Clock, ArrowUpRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Call {
  id: string
  caller: string
  duration: string
  timestamp: string
  status: "completed" | "missed" | "ongoing"
  avatar?: string
}

const recentCalls: Call[] = [
  {
    id: "1",
    caller: "John Smith",
    duration: "4m 12s",
    timestamp: "Today, 10:30 AM",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    caller: "Sarah Johnson",
    duration: "2m 45s",
    timestamp: "Today, 9:15 AM",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    caller: "Michael Brown",
    duration: "0m 0s",
    timestamp: "Yesterday, 4:30 PM",
    status: "missed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    caller: "Emma Wilson",
    duration: "8m 32s",
    timestamp: "Now",
    status: "ongoing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    caller: "David Lee",
    duration: "1m 18s",
    timestamp: "Yesterday, 2:45 PM",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const allCalls: Call[] = [
  ...recentCalls,
  {
    id: "6",
    caller: "Lisa Chen",
    duration: "5m 22s",
    timestamp: "Yesterday, 1:10 PM",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    caller: "Robert Taylor",
    duration: "0m 0s",
    timestamp: "2 days ago, 11:30 AM",
    status: "missed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    caller: "Jennifer Garcia",
    duration: "3m 45s",
    timestamp: "2 days ago, 9:15 AM",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentCalls({ showAll = false }: { showAll?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("")
  const calls = showAll ? allCalls : recentCalls.slice(0, 5)

  const filteredCalls = calls.filter((call) => call.caller.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      {showAll && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            className="pl-9 bg-background/50 focus:bg-background transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-3">
        {filteredCalls.map((call, index) => (
          <motion.div
            key={call.id}
            className="flex items-center justify-between space-x-4 rounded-xl border bg-card/50 backdrop-blur-sm p-3 hover:bg-card/80 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={call.avatar} alt={call.caller} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                  {call.caller
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{call.caller}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{call.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  call.status === "completed" ? "outline" : call.status === "ongoing" ? "default" : "destructive"
                }
                className="flex items-center space-x-1 px-2.5 py-0.5"
              >
                {call.status === "completed" ? (
                  <PhoneOff className="h-3 w-3 mr-1" />
                ) : call.status === "ongoing" ? (
                  <PhoneCall className="h-3 w-3 mr-1" />
                ) : (
                  <PhoneOff className="h-3 w-3 mr-1" />
                )}
                <span>
                  {call.status === "completed" ? call.duration : call.status === "ongoing" ? "Active" : "Missed"}
                </span>
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View call details</span>
              </Button>
            </div>
          </motion.div>
        ))}

        {filteredCalls.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No calls found</p>
          </div>
        )}
      </div>

      {!showAll && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/calls">View all calls</Link>
        </Button>
      )}
    </div>
  )
}

