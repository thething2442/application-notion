// Your DashboardPage component
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@clerk/nextjs'; 

export default function DashboardPage() {
  const { user, isLoaded } = useUser(); // You're using the 'user' object here

  // ... (loading and unauthenticated states)

  if (!user) {
    // Renders if user is not authenticated
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

  // If user is loaded and authenticated, you can access properties like this:
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              {/* Accessing user data here */}
              <Badge variant="secondary">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}</Badge>
            </div>
            {/* ... rest of your header */}
          </div>
        </div>
      </div>

      {/* ... other parts of your dashboard */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Type</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Free</div>
          {/* Accessing user data here */}
          <p className="text-xs text-muted-foreground">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </CardContent>
      </Card>
      {/* ... rest of your dashboard */}
    </div>
  );
}