# Account Page - Dynamic User Data Fetching

## Overview

The account page has been completely redesigned to use dynamic fetching of user account data with projects and other related information. The page now provides a comprehensive dashboard view of user data, projects, bug reports, and content.

## Features

### 🔄 **Dynamic Data Fetching**
- **Real-time Data**: Fetches user data from the backend API using the new relations endpoints
- **Automatic Updates**: Data is fetched when the user loads the page
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Proper loading indicators during data fetching

### 📊 **Comprehensive Dashboard**
- **User Profile**: Displays user information from Clerk authentication
- **Statistics Overview**: Shows key metrics across all user data
- **Tabbed Interface**: Organized view of different data types
- **Responsive Design**: Works on desktop and mobile devices

### 🎯 **Tabbed Sections**

#### 1. Overview Tab
- **User Statistics**: Projects, data fields, bug reports, and content counts
- **Quick Metrics**: At-a-glance view of user activity
- **Reusable Component**: Uses the `UserStats` component for consistency

#### 2. Projects Tab
- **Project List**: All user projects with details
- **Project Cards**: Each project shows name, description, visibility, and metrics
- **Data Field Count**: Shows how many data fields each project has
- **Quick Actions**: View project button for each project

#### 3. Bug Reports Tab
- **Reported Bugs**: Bugs reported by the user
- **Assigned Bugs**: Bugs assigned to the user
- **Status Indicators**: Color-coded severity and status badges
- **Timeline View**: Shows when bugs were created

#### 4. Content Tab
- **Created Content**: Dynamic content created by the user
- **Published Content**: Content published by the user
- **Content Types**: Shows different types of content (pricing, navbar, etc.)
- **Status Tracking**: Draft vs published content

## Technical Implementation

### Custom Hooks

#### `useUserData` Hook
```typescript
const { userData, loading, error, refetch, user } = useUserData()
```

**Features:**
- Fetches complete user data with all relations
- Handles loading and error states
- Provides refetch functionality
- Integrates with Clerk authentication

#### `useUserStats` Hook
```typescript
const { stats, loading, error, refetch } = useUserStats()
```

**Features:**
- Fetches user statistics only
- Optimized for performance
- Separate from full user data fetch

### API Integration

The account page uses the following backend endpoints:

1. **`GET /users/:id/relations`** - Complete user data with all relations
2. **`GET /users/:id/stats`** - User statistics only
3. **`GET /users/:id/project-data`** - User's project data
4. **`GET /users/:id/bug-reports`** - User's bug reports

### Components

#### `UserStats` Component
- **Reusable**: Can be used across the application
- **Loading States**: Shows skeleton loading animation
- **Error Handling**: Graceful error display
- **Responsive**: Adapts to different screen sizes

## Usage

### Basic Usage
```tsx
import AccountPage from '@/app/dashboard/account/page'

// The page automatically fetches user data when loaded
```

### Using Custom Hooks
```tsx
import { useUserData, useUserStats } from '@/hooks/useUserData'

function MyComponent() {
  const { userData, loading, error } = useUserData()
  const { stats } = useUserStats()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h1>Welcome, {userData?.user.name}</h1>
      <p>You have {stats?.projects} projects</p>
    </div>
  )
}
```

### Using UserStats Component
```tsx
import UserStats from '@/components/UserStats'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserStats className="mb-6" />
    </div>
  )
}
```

## Environment Variables

Make sure to set the following environment variable:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Error Handling

The account page includes comprehensive error handling:

1. **Network Errors**: Displays error message with retry button
2. **Authentication Errors**: Handles missing user data gracefully
3. **API Errors**: Shows specific error messages from the backend
4. **Loading States**: Prevents interaction during data fetching

## Performance Optimizations

1. **Separate Hooks**: Different hooks for different data types
2. **Conditional Fetching**: Only fetches data when user is authenticated
3. **Caching**: Data is cached in component state
4. **Lazy Loading**: Components load only when needed

## Styling

The account page uses:
- **Tailwind CSS**: For responsive design
- **Shadcn/ui**: For consistent UI components
- **Lucide Icons**: For iconography
- **Custom Badges**: For status and severity indicators

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live data updates
2. **Data Export**: Export user data to CSV/JSON
3. **Advanced Filtering**: Filter projects, bugs, and content
4. **Bulk Actions**: Perform actions on multiple items
5. **Analytics**: More detailed user activity analytics

## Troubleshooting

### Common Issues

1. **Data Not Loading**
   - Check if backend is running
   - Verify environment variables
   - Check browser console for errors

2. **Authentication Issues**
   - Ensure Clerk is properly configured
   - Check user authentication status

3. **API Errors**
   - Verify backend endpoints are working
   - Check network connectivity
   - Review backend logs

### Debug Mode

Enable debug mode by adding to your environment:
```env
NEXT_PUBLIC_DEBUG=true
```

This will show additional logging in the browser console. 