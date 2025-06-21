import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface UserData {
  user: {
    id: string
    email: string
    name: string
    plan: string
    createdAt: string
  }
  projects: Array<{
    id: string
    name: string
    description: string
    isPublic: boolean
    createdAt: string
    updatedAt: string
  }>
  projectData: Array<{
    id: string
    title: string
    type: string
    projectId: string
    createdAt: string
  }>
  projectRecords: Array<{
    id: string
    projectId: string
    recordData: any
    createdAt: string
  }>
  reportedBugs: Array<{
    id: string
    title: string
    severity: string
    status: string
    createdAt: string
  }>
  assignedBugs: Array<{
    id: string
    title: string
    severity: string
    status: string
    createdAt: string
  }>
  createdContent: Array<{
    id: string
    title: string
    type: string
    status: string
    createdAt: string
  }>
  publishedContent: Array<{
    id: string
    title: string
    type: string
    status: string
    publishedAt: string
  }>
}

export function useUserData() {
  const { user, isLoaded } = useUser()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiUser = process.env.NEXT_PUBLIC_API_USER || 'http://localhost:4000/users'

  const fetchUserData = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${apiUser}/${user.id}/relations`, {
        headers: {
          'user-id': user.id,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`)
      }

      const data = await response.json()
      setUserData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchUserData()
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData()
    }
  }, [isLoaded, user])

  return {
    userData,
    loading,
    error,
    refetch,
    isLoaded,
    user
  }
}

// Hook for fetching user statistics
export function useUserStats() {
  const { user, isLoaded } = useUser()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiUser = process.env.NEXT_PUBLIC_API_USER || 'http://localhost:4000/users'

  const fetchStats = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${apiUser}/${user.id}/stats`, {
        headers: {
          'user-id': user.id,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user stats: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchStats()
    }
  }, [isLoaded, user])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}

// Hook for fetching user projects
export function useUserProjects() {
  const { user, isLoaded } = useUser()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiProjects = process.env.NEXT_PUBLIC_API_PROJECTS || 'http://localhost:4000/projects'

  const fetchProjects = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${apiProjects}/user/${user.id}`, {
        headers: {
          'user-id': user.id,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user projects: ${response.status}`)
      }

      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchProjects()
    }
  }, [isLoaded, user])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  }
}

// Hook for fetching user bug reports
export function useUserBugReports(type: 'reported' | 'assigned' = 'reported') {
  const { user, isLoaded } = useUser()
  const [bugReports, setBugReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiBugReports = process.env.NEXT_PUBLIC_API_BUG_REPORT || 'http://localhost:4000/bug-reports'

  const fetchBugReports = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${apiBugReports}/user/${user.id}?type=${type}`, {
        headers: {
          'user-id': user.id,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch bug reports: ${response.status}`)
      }

      const data = await response.json()
      setBugReports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bug reports')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchBugReports()
    }
  }, [isLoaded, user, type])

  return {
    bugReports,
    loading,
    error,
    refetch: fetchBugReports
  }
} 