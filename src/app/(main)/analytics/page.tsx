"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  BellRing,
  Check,
  Clock,
  PhoneCall,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AnalyticsDashboard() {
  const callMetrics = [
    { name: "Total Calls", value: 12450, change: 12.5, type: "increase" },
    { name: "Successful Calls", value: 9870, change: 8.2, type: "increase" },
    {
      name: "Average Call Duration",
      value: "3:45 min",
      change: 5.1,
      type: "decrease",
    },
    { name: "Failed Calls", value: 2580, change: 3.1, type: "increase" },
  ];

  const aiInteractionData = [
    { month: "Jan", "AI Interactions": 4000, "Human Handoffs": 2400 },
    { month: "Feb", "AI Interactions": 3000, "Human Handoffs": 1398 },
    { month: "Mar", "AI Interactions": 2000, "Human Handoffs": 9800 },
    { month: "Apr", "AI Interactions": 2780, "Human Handoffs": 3908 },
    { month: "May", "AI Interactions": 1890, "Human Handoffs": 4800 },
    { month: "Jun", "AI Interactions": 2390, "Human Handoffs": 3800 },
    { month: "Jul", "AI Interactions": 3490, "Human Handoffs": 4300 },
  ];

  const recentCalls = [
    {
      id: "001",
      caller: "John Doe",
      duration: "2:30",
      status: "Completed",
      aiResolved: true,
    },
    {
      id: "002",
      caller: "Jane Smith",
      duration: "4:15",
      status: "Transferred",
      aiResolved: false,
    },
    {
      id: "003",
      caller: "Mike Johnson",
      duration: "1:05",
      status: "Completed",
      aiResolved: true,
    },
    {
      id: "004",
      caller: "Emily White",
      duration: "0:45",
      status: "Failed",
      aiResolved: false,
    },
    {
      id: "005",
      caller: "David Green",
      duration: "3:50",
      status: "Completed",
      aiResolved: true,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <PhoneCall className="h-8 w-8 text-blue-600" /> AI Voice Calling
        Analytics
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {callMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              {metric.name === "Total Calls" && (
                <BellRing className="h-4 w-4 text-muted-foreground" />
              )}
              {metric.name === "Successful Calls" && (
                <Check className="h-4 w-4 text-muted-foreground" />
              )}
              {metric.name === "Average Call Duration" && (
                <Clock className="h-4 w-4 text-muted-foreground" />
              )}
              {metric.name === "Failed Calls" && (
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p
                className={`text-xs ${
                  metric.type === "increase" ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.type === "increase" ? (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                )}
                {metric.change}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>AI Interaction vs. Human Handoffs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={aiInteractionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="AI Interactions"
                  fill="#8884d8"
                  name="AI Interactions"
                />
                <Bar
                  dataKey="Human Handoffs"
                  fill="#82ca9d"
                  name="Human Handoffs"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top AI-Resolved Topics (Example)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <span>Account Balance Inquiry</span>{" "}
                <Badge variant="secondary">2500</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Password Reset</span>{" "}
                <Badge variant="secondary">1800</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Order Status Check</span>{" "}
                <Badge variant="secondary">1500</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Support Ticket Creation</span>{" "}
                <Badge variant="secondary">1200</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call ID</TableHead>
                <TableHead>Caller</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">AI Resolved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.id}</TableCell>
                  <TableCell>{call.caller}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        call.status === "Completed" ? "default" : "outline"
                      }
                    >
                      {call.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {call.aiResolved ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Alert>
        <BellRing className="h-4 w-4" />
        <AlertTitle>Analytics Insights</AlertTitle>
        <AlertDescription>
          {`Monitor these metrics regularly to optimize your AI voice calling
          system's performance and user satisfaction.`}
        </AlertDescription>
      </Alert>
    </div>
  );
}
