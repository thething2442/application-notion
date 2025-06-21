# Bug Reports API Documentation

This document describes the Bug Reports API endpoints for tracking and managing application bugs.

## Base URL
```
/bug-reports
```

## Authentication
All endpoints require user authentication. The user ID is extracted from either:
- `req.user.id` (if using JWT middleware)
- `req.headers['user-id']` (fallback)

## Data Models

### Bug Severity
- `low` - Minor issues, cosmetic problems
- `medium` - Moderate issues, some functionality affected
- `high` - Major issues, significant functionality affected
- `critical` - Critical issues, application unusable

### Bug Status
- `open` - Bug reported, not yet addressed
- `in_progress` - Bug is being worked on
- `resolved` - Bug has been fixed
- `closed` - Bug report closed (duplicate, won't fix, etc.)
- `duplicate` - Bug is a duplicate of another report

## Endpoints

### 1. Create Bug Report
**POST** `/bug-reports`

Creates a new bug report.

**Request Body:**
```json
{
  "title": "Button not working on mobile",
  "description": "The submit button doesn't respond to touch on mobile devices",
  "stepsToReproduce": "1. Open app on mobile\n2. Navigate to form\n3. Try to tap submit button",
  "expectedBehavior": "Button should submit the form",
  "actualBehavior": "Button doesn't respond to touch",
  "severity": "high",
  "browser": "Chrome Mobile",
  "operatingSystem": "iOS 15.0",
  "screenshotUrl": "https://example.com/screenshot.png",
  "tags": ["mobile", "ui", "form"],
  "projectId": "project-123",
  "pageUrl": "https://app.example.com/form"
}
```

**Response:**
```json
{
  "id": "bug-123",
  "title": "Button not working on mobile",
  "description": "The submit button doesn't respond to touch on mobile devices",
  "stepsToReproduce": "1. Open app on mobile\n2. Navigate to form\n3. Try to tap submit button",
  "expectedBehavior": "Button should submit the form",
  "actualBehavior": "Button doesn't respond to touch",
  "severity": "high",
  "status": "open",
  "browser": "Chrome Mobile",
  "operatingSystem": "iOS 15.0",
  "screenshotUrl": "https://example.com/screenshot.png",
  "tags": ["mobile", "ui", "form"],
  "projectId": "project-123",
  "pageUrl": "https://app.example.com/form",
  "assignedTo": null,
  "resolution": null,
  "reportedBy": "user-123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "resolvedAt": null
}
```

### 2. Get All Bug Reports
**GET** `/bug-reports`

Retrieves all bug reports with optional filtering.

**Query Parameters:**
- `status` - Filter by bug status
- `severity` - Filter by bug severity
- `projectId` - Filter by project ID

**Example:**
```
GET /bug-reports?status=open&severity=high&projectId=project-123
```

**Response:**
```json
[
  {
    "id": "bug-123",
    "title": "Button not working on mobile",
    "description": "The submit button doesn't respond to touch on mobile devices",
    "severity": "high",
    "status": "open",
    "reportedBy": "user-123",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "tags": ["mobile", "ui", "form"]
  }
]
```

### 3. Get Bug Report Statistics
**GET** `/bug-reports/stats`

Retrieves statistics about bug reports.

**Response:**
```json
{
  "total": 25,
  "byStatus": {
    "open": 10,
    "in_progress": 5,
    "resolved": 8,
    "closed": 1,
    "duplicate": 1
  },
  "bySeverity": {
    "low": 5,
    "medium": 10,
    "high": 8,
    "critical": 2
  }
}
```

### 4. Get Single Bug Report
**GET** `/bug-reports/:id`

Retrieves a specific bug report by ID.

**Response:**
```json
{
  "id": "bug-123",
  "title": "Button not working on mobile",
  "description": "The submit button doesn't respond to touch on mobile devices",
  "stepsToReproduce": "1. Open app on mobile\n2. Navigate to form\n3. Try to tap submit button",
  "expectedBehavior": "Button should submit the form",
  "actualBehavior": "Button doesn't respond to touch",
  "severity": "high",
  "status": "in_progress",
  "browser": "Chrome Mobile",
  "operatingSystem": "iOS 15.0",
  "screenshotUrl": "https://example.com/screenshot.png",
  "tags": ["mobile", "ui", "form"],
  "projectId": "project-123",
  "pageUrl": "https://app.example.com/form",
  "assignedTo": "developer-456",
  "resolution": null,
  "reportedBy": "user-123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T14:20:00Z",
  "resolvedAt": null
}
```

### 5. Update Bug Report
**PATCH** `/bug-reports/:id`

Updates an existing bug report.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "severity": "medium",
  "status": "in_progress",
  "tags": ["updated", "tags"]
}
```

**Response:** Returns the updated bug report object.

### 6. Assign Bug Report
**PATCH** `/bug-reports/:id/assign`

Assigns a bug report to a specific user.

**Request Body:**
```json
{
  "assignedTo": "developer-456"
}
```

**Response:** Returns the updated bug report with status changed to "in_progress".

### 7. Resolve Bug Report
**PATCH** `/bug-reports/:id/resolve`

Marks a bug report as resolved.

**Request Body:**
```json
{
  "resolution": "Fixed by updating touch event handlers for mobile devices"
}
```

**Response:** Returns the updated bug report with status changed to "resolved" and resolvedAt timestamp set.

### 8. Delete Bug Report
**DELETE** `/bug-reports/:id`

Deletes a bug report.

**Response:**
```json
{
  "message": "Bug report deleted successfully"
}
```

## Error Responses

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Bug report with ID bug-123 not found",
  "error": "Not Found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["title should not be empty", "description should not be empty"],
  "error": "Bad Request"
}
```

## Database Schema

The bug reports are stored in the `bug_reports` table with the following structure:

```sql
CREATE TABLE `bug_reports` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `steps_to_reproduce` text,
  `expected_behavior` text,
  `actual_behavior` text,
  `severity` text DEFAULT 'medium' NOT NULL,
  `status` text DEFAULT 'open' NOT NULL,
  `browser` text,
  `operating_system` text,
  `screenshot_url` text,
  `tags` text,
  `project_id` text,
  `page_url` text,
  `assigned_to` text,
  `resolution` text,
  `reported_by` text NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `resolved_at` text,
  FOREIGN KEY (`reported_by`) REFERENCES `users`(`id`)
);
```

## Usage Examples

### Creating a Bug Report
```javascript
const response = await fetch('/bug-reports', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'user-id': 'your-user-id'
  },
  body: JSON.stringify({
    title: 'Login page crashes on Safari',
    description: 'The login page crashes when trying to submit credentials on Safari browser',
    severity: 'high',
    browser: 'Safari',
    operatingSystem: 'macOS 12.0',
    tags: ['login', 'safari', 'crash']
  })
});

const bugReport = await response.json();
```

### Getting Bug Reports by Status
```javascript
const response = await fetch('/bug-reports?status=open&severity=high', {
  headers: {
    'user-id': 'your-user-id'
  }
});

const openHighPriorityBugs = await response.json();
```

### Updating Bug Status
```javascript
const response = await fetch('/bug-reports/bug-123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'user-id': 'your-user-id'
  },
  body: JSON.stringify({
    status: 'in_progress',
    assignedTo: 'developer-456'
  })
});

const updatedBug = await response.json();
``` 