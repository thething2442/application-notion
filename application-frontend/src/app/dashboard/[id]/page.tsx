'use client'

import React, { useState } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserStats from '@/components/UserStats'
import { ExternalLink, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFetch } from '@/hooks/usefetch'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { TypeProjects } from '@/components/type-projects'

type UserDataResponse = {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    priority: string;
    severity: string;
    type: string;
  }>;
};

const AccountPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: userData, loading, error, user, refetch } = useFetch<UserDataResponse>(`${process.env.NEXT_PUBLIC_API_USER!}/${id}`);

  // Component adder state
  const [componentName, setComponentName] = useState('');
  const [components, setComponents] = useState<string[]>([]);

  const handleAddComponent = () => {
    if (componentName.trim()) {
      setComponents([...components, componentName.trim()]);
      setComponentName('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
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
            <Button onClick={refetch}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.projects && userData.projects.length > 0 ? (
          userData.projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{project.status}</Badge>
                  <Badge variant="outline">{project.priority}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">{project.description}</p>
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  <ExternalLink className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer hover:shadow-lg transition-shadow hover:bg-gray-100'
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="mt-4 text-lg">Create your first project</span>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="ghost" size="icon" asChild>
                        <Plus className="h-8 w-8" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-full w-full p-4 space-y-4">
                      <TypeProjects />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
