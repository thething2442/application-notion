"use client"

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Folder, Database, Users, Settings, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface ProjectData {
  id: string;
  projectId: string;
  schema: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface DashboardStats {
  totalProjects: number;
  totalDataEntries: number;
  recentActivity: any[];
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalDataEntries: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  const fetchUserData = async () => {
    try {
      // Fetch user's projects from backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      
      const projectsResponse = await fetch(`${backendUrl}/projects`, {
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user?.id || ''
        }
      });
      
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
        setStats(prev => ({ ...prev, totalProjects: projectsData.length }));
      }

      // Fetch user's project data from backend
      const dataResponse = await fetch(`${backendUrl}/project-data`, {
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user?.id || ''
        }
      });
      
      if (dataResponse.ok) {
        const dataEntries = await dataResponse.json();
        setProjectData(dataEntries);
        setStats(prev => ({ ...prev, totalDataEntries: dataEntries.length }));
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Badge variant="secondary">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                Your created projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Entries</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDataEntries}</div>
              <p className="text-xs text-muted-foreground">
                Total data entries across projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free</div>
              <p className="text-xs text-muted-foreground">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/projects/new">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Plus className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Create Project</h3>
                      <p className="text-sm text-muted-foreground">Start a new project</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/projects">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Folder className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">View Projects</h3>
                      <p className="text-sm text-muted-foreground">Manage your projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/data">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-medium">View Data</h3>
                      <p className="text-sm text-muted-foreground">Browse your data entries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-8 w-8 text-gray-600" />
                    <div>
                      <h3 className="font-medium">Settings</h3>
                      <p className="text-sm text-muted-foreground">Account preferences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
            <Link href="/projects">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          {projects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-500 mb-4">Create your first project to get started</p>
                <Link href="/projects/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{project.icon || '📁'}</span>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={project.isPublic ? "default" : "secondary"}>
                          {project.isPublic ? "Public" : "Private"}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Data Entries */}
        {projectData.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Data Entries</h2>
              <Link href="/data">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.slice(0, 6).map((data) => (
                <Card key={data.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-sm">Data Entry</CardTitle>
                    </div>
                    <CardDescription>
                      Project ID: {data.projectId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Schema Data</Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}