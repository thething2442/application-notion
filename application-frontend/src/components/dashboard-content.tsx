import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Users,
  Calendar,
  Database,
  Star,
  Clock,
  TrendingUp,
  Zap,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function DashboardContent() {
  const recentPages = [
    {
      title: "Project Planning Template",
      type: "Template",
      lastEdited: "2 hours ago",
      author: "You",
      icon: FileText,
    },
    {
      title: "Team Meeting Notes - Q4 Review",
      type: "Meeting Notes",
      lastEdited: "1 day ago",
      author: "Sarah Chen",
      icon: Users,
    },
    {
      title: "Product Roadmap 2024",
      type: "Database",
      lastEdited: "3 days ago",
      author: "Mike Johnson",
      icon: Database,
    },
    {
      title: "Weekly Goals & Tasks",
      type: "Task List",
      lastEdited: "5 days ago",
      author: "You",
      icon: Calendar,
    },
  ]

  const quickActions = [
    { title: "New Page", icon: FileText, description: "Start with a blank page" },
    { title: "Meeting Notes", icon: Users, description: "Template for meetings" },
    { title: "Task List", icon: Calendar, description: "Organize your todos" },
    { title: "Database", icon: Database, description: "Structured data table" },
  ]

  const templates = [
    {
      title: "Project Tracker",
      description: "Track project progress and milestones",
      image: "/placeholder.svg?height=120&width=200",
      category: "Project Management",
    },
    {
      title: "Meeting Notes",
      description: "Structured template for meeting documentation",
      image: "/placeholder.svg?height=120&width=200",
      category: "Productivity",
    },
    {
      title: "Personal Journal",
      description: "Daily reflection and note-taking template",
      image: "/placeholder.svg?height=120&width=200",
      category: "Personal",
    },
    {
      title: "Team Wiki",
      description: "Knowledge base for team documentation",
      image: "/placeholder.svg?height=120&width=200",
      category: "Team",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, John! 👋</h1>
        <p className="text-gray-600">Welcome back to your workspace. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Assists</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Start creating something new</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-gray-50">
                <action.icon className="h-5 w-5 mr-3 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Pages */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Pages
            </CardTitle>
            <CardDescription>Pages you've worked on recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <page.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{page.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Badge variant="secondary" className="text-xs">
                          {page.type}
                        </Badge>
                        <span>•</span>
                        <span>
                          Edited {page.lastEdited} by {page.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Popular Templates
          </CardTitle>
          <CardDescription>Get started quickly with these templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-md transition-shadow">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    width={200}
                    height={120}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>What's happening in your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Sarah Chen</span> commented on{" "}
                  <span className="font-medium">Team Meeting Notes</span>
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Mike Johnson</span> shared{" "}
                  <span className="font-medium">Product Roadmap 2024</span> with the team
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  You created <span className="font-medium">Weekly Goals & Tasks</span>
                </p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}