# User Relations API Documentation

This document describes the User Relations API endpoints that demonstrate the relationships between users and project data, including projects, project data, project records, bug reports, and dynamic content.

## Overview

The database schema includes comprehensive relations between users and all other entities:

- **Users** → **Projects** (one-to-many)
- **Users** → **Project Data** (one-to-many)
- **Users** → **Project Records** (one-to-many)
- **Users** → **Bug Reports** (one-to-many, both as reporter and assignee)
- **Users** → **Dynamic Content** (one-to-many, both as creator and publisher)
- **Projects** → **Project Data** (one-to-many)
- **Projects** → **Project Records** (one-to-many)
- **Projects** → **Bug Reports** (one-to-many)

## Database Relations

### Foreign Key Relationships

```sql
-- Users table (parent)
users (id) PRIMARY KEY

-- Projects table
projects (user_id) → users (id) ON DELETE CASCADE

-- Project Data table
project_data (user_id) → users (id) ON DELETE CASCADE
project_data (project_id) → projects (id) ON DELETE CASCADE

-- Project Records table
project_records (user_id) → users (id) ON DELETE CASCADE
project_records (project_id) → projects (id) ON DELETE CASCADE
project_records (created_by) → users (id) ON DELETE CASCADE

-- Bug Reports table
bug_reports (reported_by) → users (id) ON DELETE CASCADE
bug_reports (assigned_to) → users (id) ON DELETE SET NULL
bug_reports (project_id) → projects (id) ON DELETE SET NULL

-- Dynamic Content table
dynamic_content (created_by) → users (id) ON DELETE CASCADE
dynamic_content (published_by) → users (id) ON DELETE SET NULL
```

### Indexes for Performance

```sql
-- Projects indexes
CREATE INDEX projects_user_id_idx ON projects (user_id);

-- Project Data indexes
CREATE INDEX project_data_user_id_idx ON project_data (user_id);
CREATE INDEX project_data_project_id_idx ON project_data (project_id);
CREATE INDEX project_data_user_project_idx ON project_data (user_id, project_id);

-- Project Records indexes
CREATE INDEX project_records_user_id_idx ON project_records (user_id);
CREATE INDEX project_records_project_id_idx ON project_records (project_id);
CREATE INDEX project_records_created_by_idx ON project_records (created_by);
CREATE INDEX project_records_user_project_idx ON project_records (user_id, project_id);

-- Bug Reports indexes
CREATE INDEX bug_reports_reported_by_idx ON bug_reports (reported_by);
CREATE INDEX bug_reports_assigned_to_idx ON bug_reports (assigned_to);
CREATE INDEX bug_reports_project_id_idx ON bug_reports (project_id);
CREATE INDEX bug_reports_status_idx ON bug_reports (status);
CREATE INDEX bug_reports_severity_idx ON bug_reports (severity);

-- Dynamic Content indexes
CREATE INDEX dynamic_content_created_by_idx ON dynamic_content (created_by);
CREATE INDEX dynamic_content_published_by_idx ON dynamic_content (published_by);
CREATE INDEX dynamic_content_type_idx ON dynamic_content (type);
CREATE INDEX dynamic_content_status_idx ON dynamic_content (status);
CREATE INDEX dynamic_content_language_idx ON dynamic_content (language);
```

## Endpoints

### Base URL
```
/users
```

### 1. Get User with All Relations
**GET** `/users/:id/relations`

Retrieves a user with all their related data including projects, project data, project records, bug reports, and dynamic content.

**Response:**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "pro",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "projects": [
    {
      "id": "project-123",
      "userId": "user-123",
      "name": "My Project",
      "description": "A sample project",
      "isPublic": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "projectData": [
    {
      "id": "data-123",
      "userId": "user-123",
      "projectId": "project-123",
      "title": "Name Field",
      "type": "text",
      "data": { "default": "Enter name" },
      "properties": { "required": true },
      "isRequired": true,
      "order": 1,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "projectRecords": [
    {
      "id": "record-123",
      "userId": "user-123",
      "projectId": "project-123",
      "recordData": { "name": "John Doe", "email": "john@example.com" },
      "createdBy": "user-123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "reportedBugs": [
    {
      "id": "bug-123",
      "title": "Button not working",
      "description": "Submit button doesn't respond",
      "severity": "high",
      "status": "open",
      "reportedBy": "user-123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "assignedBugs": [
    {
      "id": "bug-456",
      "title": "Login issue",
      "description": "Users can't log in",
      "severity": "critical",
      "status": "in_progress",
      "assignedTo": "user-123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "createdContent": [
    {
      "id": "content-123",
      "title": "New Pricing Plans",
      "type": "pricing",
      "content": { "plans": [...] },
      "status": "draft",
      "createdBy": "user-123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "publishedContent": [
    {
      "id": "content-456",
      "title": "Updated Navbar",
      "type": "navbar",
      "content": { "items": [...] },
      "status": "published",
      "publishedBy": "user-123",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Get User Project Data
**GET** `/users/:id/project-data`

Retrieves all project data for a user, optionally filtered by project ID.

**Query Parameters:**
- `projectId` - Filter by specific project ID (optional)

**Example:**
```
GET /users/user-123/project-data?projectId=project-456
```

**Response:**
```json
[
  {
    "id": "data-123",
    "userId": "user-123",
    "projectId": "project-456",
    "title": "Name Field",
    "type": "text",
    "data": { "default": "Enter name" },
    "properties": { "required": true },
    "project": {
      "id": "project-456",
      "name": "Customer Database",
      "description": "Store customer information"
    }
  }
]
```

### 3. Get User Project Records
**GET** `/users/:id/project-records`

Retrieves all project records for a user, optionally filtered by project ID.

**Query Parameters:**
- `projectId` - Filter by specific project ID (optional)

**Response:**
```json
[
  {
    "id": "record-123",
    "userId": "user-123",
    "projectId": "project-456",
    "recordData": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "createdBy": "user-123",
    "project": {
      "id": "project-456",
      "name": "Customer Database"
    },
    "creator": {
      "id": "user-123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

### 4. Get User Bug Reports
**GET** `/users/:id/bug-reports`

Retrieves bug reports for a user, either reported by them or assigned to them.

**Query Parameters:**
- `type` - Type of bug reports to retrieve: `reported` or `assigned` (default: `reported`)

**Examples:**
```
GET /users/user-123/bug-reports?type=reported
GET /users/user-123/bug-reports?type=assigned
```

**Response:**
```json
[
  {
    "id": "bug-123",
    "title": "Button not working",
    "description": "Submit button doesn't respond to clicks",
    "severity": "high",
    "status": "open",
    "reportedBy": "user-123",
    "assignedTo": "user-456",
    "tags": ["ui", "button", "form"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### 5. Get User Statistics
**GET** `/users/:id/stats`

Retrieves statistics about a user's data across all entities.

**Response:**
```json
{
  "projects": 5,
  "projectData": 25,
  "projectRecords": 150,
  "reportedBugs": 8,
  "assignedBugs": 3,
  "createdContent": 12,
  "publishedContent": 6
}
```

### 6. Search User Content
**GET** `/users/:id/search`

Searches through a user's project data and dynamic content by title.

**Query Parameters:**
- `q` - Search term (required)

**Example:**
```
GET /users/user-123/search?q=pricing
```

**Response:**
```json
{
  "projectData": [
    {
      "id": "data-123",
      "title": "Pricing Field",
      "type": "number",
      "data": { "min": 0, "max": 1000 },
      "properties": { "currency": "USD" }
    }
  ],
  "dynamicContent": [
    {
      "id": "content-123",
      "title": "New Pricing Plans",
      "type": "pricing",
      "content": { "plans": [...] },
      "status": "draft"
    }
  ]
}
```

### 7. Get Project with Relations
**GET** `/users/:id/projects/:projectId/relations`

Retrieves a specific project with all its related data including project data, project records, and bug reports.

**Response:**
```json
{
  "project": {
    "id": "project-123",
    "userId": "user-123",
    "name": "Customer Database",
    "description": "Store customer information",
    "isPublic": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "projectData": [
    {
      "id": "data-123",
      "projectId": "project-123",
      "title": "Name Field",
      "type": "text",
      "data": { "default": "Enter name" },
      "properties": { "required": true },
      "order": 1
    }
  ],
  "projectRecords": [
    {
      "id": "record-123",
      "projectId": "project-123",
      "recordData": { "name": "John Doe", "email": "john@example.com" },
      "creator": {
        "id": "user-123",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "bugReports": [
    {
      "id": "bug-123",
      "title": "Data not saving",
      "description": "Customer data is not being saved properly",
      "severity": "high",
      "status": "open",
      "projectId": "project-123",
      "reportedBy": "user-123"
    }
  ]
}
```

## Usage Examples

### Getting User Dashboard Data
```javascript
// Get all user data for dashboard
const response = await fetch('/users/user-123/relations', {
  headers: {
    'user-id': 'user-123'
  }
});

const userData = await response.json();
console.log(`User has ${userData.projects.length} projects`);
console.log(`User has ${userData.reportedBugs.length} reported bugs`);
```

### Getting Project-Specific Data
```javascript
// Get all project data for a specific project
const response = await fetch('/users/user-123/project-data?projectId=project-456', {
  headers: {
    'user-id': 'user-123'
  }
});

const projectData = await response.json();
console.log(`Project has ${projectData.length} data fields`);
```

### Getting User Statistics
```javascript
// Get user statistics for analytics
const response = await fetch('/users/user-123/stats', {
  headers: {
    'user-id': 'user-123'
  }
});

const stats = await response.json();
console.log(`User has created ${stats.projects} projects`);
console.log(`User has ${stats.reportedBugs} reported bugs`);
```

### Searching User Content
```javascript
// Search through user's content
const response = await fetch('/users/user-123/search?q=pricing', {
  headers: {
    'user-id': 'user-123'
  }
});

const searchResults = await response.json();
console.log(`Found ${searchResults.projectData.length} project data items`);
console.log(`Found ${searchResults.dynamicContent.length} dynamic content items`);
```

## Relation Benefits

### 1. Data Integrity
- Foreign key constraints ensure referential integrity
- Cascade deletes automatically clean up related data when a user is deleted
- Set null deletes preserve data while removing references

### 2. Performance
- Indexes on foreign keys improve query performance
- Composite indexes optimize multi-column queries
- Efficient joins between related tables

### 3. Data Consistency
- Automatic validation of relationships
- Prevents orphaned records
- Maintains data consistency across the application

### 4. Query Flexibility
- Easy to query related data in multiple ways
- Support for complex joins and aggregations
- Efficient filtering and sorting

## Best Practices

### 1. Use Indexes
- Always create indexes on foreign key columns
- Use composite indexes for frequently queried combinations
- Monitor query performance and add indexes as needed

### 2. Handle Cascading
- Be aware of cascade delete behavior
- Use SET NULL for optional relationships
- Consider soft deletes for important data

### 3. Optimize Queries
- Use specific queries instead of fetching all relations
- Implement pagination for large datasets
- Use appropriate WHERE clauses to filter data

### 4. Error Handling
- Handle cases where related data doesn't exist
- Provide meaningful error messages
- Implement proper validation

## Migration Notes

The relations were added in migration `0005_huge_klaw.sql` which includes:

1. **Foreign Key Constraints**: Added proper foreign key relationships with appropriate ON DELETE actions
2. **Indexes**: Created performance indexes on all foreign key columns
3. **Composite Indexes**: Added indexes for common query patterns
4. **Data Integrity**: Ensured all existing data maintains referential integrity

To apply the migration:
```bash
npm run db:migrate
``` 