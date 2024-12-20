"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Calendar, Clock, Users, Activity, FileText, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function DoctorsDashboard() {
  const [selectedDate, setSelectedDate] = useState("today")

  const appointmentData = [
    { time: "09:00", patientName: "John Doe", reason: "Follow-up" },
    { time: "10:30", patientName: "Jane Smith", reason: "Annual check-up" },
    { time: "11:45", patientName: "Robert Johnson", reason: "Lab results review" },
    { time: "14:15", patientName: "Emily Brown", reason: "New patient consultation" },
    { time: "15:30", patientName: "Michael Davis", reason: "Prescription renewal" },
  ]

  const patientData = [
    { id: "PT001", name: "Alice Thompson", age: 45, lastVisit: "2024-02-15" },
    { id: "PT002", name: "David Wilson", age: 62, lastVisit: "2024-02-28" },
    { id: "PT003", name: "Sarah Martinez", age: 33, lastVisit: "2024-03-05" },
    { id: "PT004", name: "James Anderson", age: 28, lastVisit: "2024-03-10" },
  ]

  const patientVisitsData = [
    { name: "Mon", visits: 24 },
    { name: "Tue", visits: 18 },
    { name: "Wed", visits: 30 },
    { name: "Thu", visits: 27 },
    { name: "Fri", visits: 22 },
    { name: "Sat", visits: 15 },
    { name: "Sun", visits: 5 },
  ]

  return (
    <div className="p-8 bg-background text-foreground">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-col">
        <h1 className="text-3xl font-regular">Doctor&apos;s Dashboard</h1>
            <div className="flex gap-3 items-center text-sm mt-2">
          <span>
            Connected to the Hospital Servers
            </span>
            <div className="blinking-dot">
            </div>
          </div>
        </div>
        <div className="items-center hidden sm:flex">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="next-week">Next Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-6 grid gap-4 md:grid-cols-2">
      <Link href="/dashboard/doctor/concerns">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9H6a2.25 2.25 0 00-2.25 2.25v7.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0018 9h-2.25M9.75 12V6m4.5 0v6M15 3.75H9M21 16.5v1.875a1.125 1.125 0 01-1.125 1.125H4.125A1.125 1.125 0 013 18.375V16.5"
                />
              </svg>
            </div>
            <CardTitle className="text-lg font-medium">Read Patient's Concerns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review health concerns shared by patients and provide guidance.
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/doctor/appointments">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-300 text-white">
            <Calendar className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg font-medium">Check your Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm  text-muted-foreground">
              View and manage your appointments for today or upcoming days.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">1,234</div>
            <p className="text-xs">+5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">8</div>
            <p className="text-xs">2 slots available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-yellow-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">18 min</div>
            <p className="text-xs text-muted-foreground">-2 min from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">98%</div>
            <p className="text-xs text-muted-foreground">Based on recent surveys</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today&apos;s Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentData.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Patient Visits This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={patientVisitsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="visits" fill="#2ebb8e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Quick access to patient information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools and resources</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Follow-up
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Patient Records
              </Button>
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Lab Results
              </Button>
            </div>
            <div className="relative">
              <Input placeholder="Search patients..." />
              <Button className="absolute right-0 top-0" size="sm" variant="ghost">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}