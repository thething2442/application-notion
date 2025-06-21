'use client'

import React, { useState,useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserStats from '@/components/UserStats'
import {  Mail, Calendar,   Briefcase,   Bug,   FileText,   Settings,   Plus, ExternalLink,  Activity} from 'lucide-react'
import { useRouter } from 'next/navigation'

const AccountPage = () => {
  const router = useRouter()
  const { userData, loading, error, refetch, user } = useUserData()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    console.log(userData)           
  }, [userData])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500'
      case 'in_progress': return 'bg-yellow-500'
      case 'resolved': return 'bg-green-500'
      case 'closed': return 'bg-gray-500'
      case 'published': return 'bg-green-500'
      case 'draft': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return 'bg-purple-500'
      case 'company': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refetch} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Account Dashboard</h1>
          <p className="text-muted-foreground">Manage your account and view your data</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.imageUrl} alt={user?.firstName || 'User'} />
              <AvatarFallback>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user?.emailAddresses[0]?.emailAddress}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Member since {user?.createdAt?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Last updated {user?.updatedAt?.toLocaleDateString()}
              </span>
            </div>
            {userData && (
              <div className="flex items-center space-x-2">
                <Badge className={getPlanColor(userData.user.plan)}>
                  {userData.user.plan.toUpperCase()} Plan
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'projects', label: 'Projects', icon: Briefcase },
          { id: 'bugs', label: 'Bug Reports', icon: Bug },
          { id: 'content', label: 'Content', icon: FileText },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="flex-1"
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content based on active tab */}
      {userData && (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <UserStats />
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Projects</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData.projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant={project.isPublic ? 'default' : 'secondary'}>
                          {project.isPublic ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Created:</span>
                          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Updated:</span>
                          <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data Fields:</span>
                          <span>
                            {userData.projectData.filter(d => d.projectId === project.id).length}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bug Reports Tab */}
          {activeTab === 'bugs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reported Bugs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bug className="mr-2 h-4 w-4" />
                      Reported Bugs ({userData.reportedBugs.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userData.reportedBugs.map((bug) => (
                      <div key={bug.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{bug.title}</h4>
                          <div className="flex space-x-1">
                            <Badge className={getSeverityColor(bug.severity)}>
                              {bug.severity}
                            </Badge>
                            <Badge className={getStatusColor(bug.status)}>
                              {bug.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(bug.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Assigned Bugs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bug className="mr-2 h-4 w-4" />
                      Assigned Bugs ({userData.assignedBugs.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userData.assignedBugs.map((bug) => (
                      <div key={bug.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{bug.title}</h4>
                          <div className="flex space-x-1">
                            <Badge className={getSeverityColor(bug.severity)}>
                              {bug.severity}
                            </Badge>
                            <Badge className={getStatusColor(bug.status)}>
                              {bug.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(bug.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Created Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Created Content ({userData.createdContent.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userData.createdContent.map((content) => (
                      <div key={content.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{content.title}</h4>
                          <div className="flex space-x-1">
                            <Badge variant="outline">{content.type}</Badge>
                            <Badge className={getStatusColor(content.status)}>
                              {content.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(content.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Published Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Published Content ({userData.publishedContent.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userData.publishedContent.map((content) => (
                      <div key={content.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{content.title}</h4>
                          <div className="flex space-x-1">
                            <Badge variant="outline">{content.type}</Badge>
                            <Badge className={getStatusColor(content.status)}>
                              {content.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(content.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AccountPage       