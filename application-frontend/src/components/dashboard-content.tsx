"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Keep Avatar for Activity Feed
import {
  FileText,
  Users,
  Calendar,
  Database,
  TrendingUp,
  Zap,
  Plus,
} from "lucide-react" // Removed unused: Star, Clock, MoreHorizontal, Badge
// Removed unused: Image as it's no longer used for templates
import { Button } from "@/components/ui/button"
import { useUser, SignOutButton} from "@clerk/nextjs" // Keep useUser for user data

export function DashboardContent() {
  const { user, isLoaded } = useUser() // Get user and isLoaded state from Clerk

  // No longer needed: recentPages and templates arrays

  const quickActions = [
    { title: "New Page", icon: FileText, description: "Start with a blank page" },
    { title: "Meeting Notes", icon: Users, description: "Template for meetings" },
    { title: "Task List", icon: Calendar, description: "Organize your todos" },
    { title: "Database", icon: Database, description: "Structured data table" },
  ]

  // Determine the name to display
  const userName = isLoaded ? (user?.firstName || user?.username || 'User') : 'User';

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Welcome Section */}           
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Good morning, {userName}! 👋
        </h1>
        <p className="text-gray-600">Welcome back to your workspace. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      

     
      <SignOutButton />
      </div>
  )
}