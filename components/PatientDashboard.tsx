"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Activity, Droplet, Scale, Utensils, Weight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export default function DashboardData() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-satoshi  tracking-tight">Health Dashboard</h1>
        <Link href="/dashboard/patient/create-concern">
            <Button variant="outline">
              Tell us your Concerns
            </Button>
        </Link>
        <Link href="/dashboard/patient/appointments">
            <Button variant="outline">
              View Your Appointments
            </Button>
        </Link>
        {/* <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      <div className="grid gap-6 mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Heart Rate</CardTitle>
              <CardDescription>24-hour overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={[
                    { time: "00:00", heartRate: 62 },
                    { time: "04:00", heartRate: 58 },
                    { time: "08:00", heartRate: 70 },
                    { time: "12:00", heartRate: 76 },
                    { time: "16:00", heartRate: 74 },
                    { time: "20:00", heartRate: 68 },
                    { time: "23:59", heartRate: 72 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="heartRate" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
                <Droplet className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">1.8L / 2.5L</div>
                <Progress value={72} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">1,850 kcal</div>
                <p className="text-xs text-muted-foreground">+250 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">BMI</CardTitle>
                <Scale className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">22.5</div>
                <p className="text-xs text-muted-foreground">Normal weight</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nutrition Score</CardTitle>
                <Utensils className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">8.5 / 10</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Blood Pressure</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={[
                    { date: "2024-01-01", systolic: 120, diastolic: 80 },
                    { date: "2024-01-02", systolic: 118, diastolic: 78 },
                    { date: "2024-01-03", systolic: 122, diastolic: 82 },
                    { date: "2024-01-04", systolic: 121, diastolic: 79 },
                    { date: "2024-01-05", systolic: 119, diastolic: 81 },
                    { date: "2024-01-06", systolic: 123, diastolic: 83 },
                    { date: "2024-01-07", systolic: 120, diastolic: 80 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="hsl(var(--chart-1))" />
                  <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--chart-2))" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Daily Steps</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { day: "Mon", steps: 7500 },
                    { day: "Tue", steps: 8200 },
                    { day: "Wed", steps: 7800 },
                    { day: "Thu", steps: 9100 },
                    { day: "Fri", steps: 8700 },
                    { day: "Sat", steps: 8900 },
                    { day: "Sun", steps: 8547 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Weight Trend</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={[
                    { date: "2024-01-01", weight: 70.5 },
                    { date: "2024-01-08", weight: 70.2 },
                    { date: "2024-01-15", weight: 69.8 },
                    { date: "2024-01-22", weight: 69.5 },
                    { date: "2024-01-29", weight: 69.3 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="hsl(var(--chart-5))" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Sleep Duration</CardTitle>
              <CardDescription>Last 7 nights</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { day: "Mon", hours: 7.5 },
                    { day: "Tue", hours: 6.8 },
                    { day: "Wed", hours: 7.2 },
                    { day: "Thu", hours: 8.0 },
                    { day: "Fri", hours: 7.7 },
                    { day: "Sat", hours: 8.5 },
                    { day: "Sun", hours: 7.9 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Calorie Intake</CardTitle>
              <CardDescription>Today's breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Protein", value: 30 },
                      { name: "Carbs", value: 50 },
                      { name: "Fat", value: 20 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    <Cell key="cell-0" fill="hsl(var(--chart-2))" />
                    <Cell key="cell-1" fill="hsl(var(--chart-3))" />
                    <Cell key="cell-2" fill="hsl(var(--chart-4))" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Annual Check-up</p>
                  <p className="text-sm text-muted-foreground">Dr. Smith, General Practitioner</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">March 15, 2024</p>
                  <p className="text-sm text-muted-foreground">10:00 AM</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dental Cleaning</p>
                  <p className="text-sm text-muted-foreground">Dr. Johnson, Dentist</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">April 2, 2024</p>
                  <p className="text-sm text-muted-foreground">2:30 PM</p>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4">Schedule New Appointment</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}