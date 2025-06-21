# Project Data API Documentation

## 🎯 Overview

This API provides a Notion-like type system for managing project data with flexible JSON storage and validation. All data is properly related to users, ensuring complete data isolation and security.

## 🔐 User Relationships

**All data is user-scoped:**
- ✅ **Projects** belong to specific users
- ✅ **Project Data (Schema)** belongs to specific projects and users
- ✅ **Project Records** belong to specific projects and users
- ✅ **Access Control** - Users can only access their own data

## 📊 Data Types Supported

- **text** - Plain text input
- **number** - Numeric values
- **select** - Single choice from options
- **multi_select** - Multiple choices from options
- **date** - Date/time values
- **checkbox** - Boolean true/false
- **url** - Web URLs
- **email** - Email addresses
- **phone** - Phone numbers
- **formula** - Calculated fields
- **relation** - Links to other records
- **rollup** - Aggregated data from relations
- **created_time** - Automatic timestamp
- **created_by** - User who created
- **last_edited_time** - Last edit timestamp
- **last_edited_by** - User who last edited

## 🚀 API Endpoints

### Projects Management

#### Create Project
```http
POST /projects
Content-Type: application/json
X-User-ID: user-uuid

{
  "name": "My Project",
  "description": "Project description",
  "icon": "📊",
  "color": "#3B82F6",
  "isPublic": false
}
```

#### Get All Projects (User's Projects Only)
```http
GET /projects
X-User-ID: user-uuid
```

#### Get Project by ID (User's Project Only)
```http
GET /projects/:id
X-User-ID: user-uuid
```

#### Update Project
```http
PATCH /projects/:id
Content-Type: application/json
X-User-ID: user-uuid

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /projects/:id
X-User-ID: user-uuid
```

### Project Data Schema Management

#### Create Project Data Field
```http
POST /projects/data
Content-Type: application/json
X-User-ID: user-uuid

{
  "projectId": "project-uuid",
  "title": "Task Name",
  "description": "Name of the task",
  "type": "text",
  "data": {
    "default": "New Task"
  },
  "properties": {
    "maxLength": 100
  },
  "isRequired": true,
  "isUnique": false,
  "order": 1
}
```

#### Get All Project Data Fields (User's Only)
```http
GET /projects/data/all
X-User-ID: user-uuid
```

#### Get Project Data Fields by Project
```http
GET /projects/data/project/:projectId
X-User-ID: user-uuid
```

#### Get Project Data by Type
```http
GET /projects/data/type/:type
X-User-ID: user-uuid
```

#### Get Project Data by Type and Project
```http
GET /projects/data/type/:type/project/:projectId
X-User-ID: user-uuid
```

#### Update Project Data Field
```http
PATCH /projects/data/:id
Content-Type: application/json
X-User-ID: user-uuid

{
  "title": "Updated Field Name",
  "isRequired": true
}
```

#### Delete Project Data Field
```http
DELETE /projects/data/:id
X-User-ID: user-uuid
```

### Project Records Management

#### Create Project Record
```http
POST /projects/records
Content-Type: application/json
X-User-ID: user-uuid

{
  "projectId": "project-uuid",
  "recordData": {
    "Task Name": "Complete API Documentation",
    "Priority": "High",
    "Tags": ["Backend", "Documentation"],
    "Due Date": "2024-01-15",
    "Completed": false
  }
}
```

#### Get All Records (User's Only)
```http
GET /projects/records
X-User-ID: user-uuid
```

#### Get Records by Project
```http
GET /projects/records/project/:projectId
X-User-ID: user-uuid
```

#### Get Single Record
```http
GET /projects/records/:id
X-User-ID: user-uuid
```

#### Update Record
```http
PATCH /projects/records/:id
Content-Type: application/json
X-User-ID: user-uuid

{
  "Task Name": "Updated Task Name",
  "Priority": "Medium",
  "Completed": true
}
```

#### Delete Record
```http
DELETE /projects/records/:id
X-User-ID: user-uuid
```

### Utility Endpoints

#### Get Project Schema
```http
GET /projects/schema/:projectId
X-User-ID: user-uuid
```

#### Validate Record Data
```http
POST /projects/validate/:projectId
Content-Type: application/json
X-User-ID: user-uuid

{
  "Task Name": "New Task",
  "Priority": "High",
  "Tags": ["Frontend"]
}
```

## 📝 Example Usage

### 1. Create a Task Management Project

```javascript
// Create project
const project = await fetch('/projects', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'X-User-ID': 'user-uuid'
  },
  body: JSON.stringify({
    name: 'Task Manager',
    description: 'Manage tasks and projects',
    icon: '✅',
    color: '#10B981'
  })
});

const projectData = await project.json();
const projectId = projectData.id;

// Create schema fields
const fields = [
  {
    projectId: projectId,
    title: 'Task Name',
    type: 'text',
    data: { default: 'New Task' },
    properties: { maxLength: 200 },
    isRequired: true,
    order: 1
  },
  {
    projectId: projectId,
    title: 'Priority',
    type: 'select',
    data: {
      options: [
        { name: 'Low', color: 'gray' },
        { name: 'Medium', color: 'yellow' },
        { name: 'High', color: 'red' }
      ]
    },
    properties: { default: 'Medium' },
    isRequired: true,
    order: 2
  },
  {
    projectId: projectId,
    title: 'Due Date',
    type: 'date',
    data: {},
    properties: {},
    isRequired: false,
    order: 3
  },
  {
    projectId: projectId,
    title: 'Completed',
    type: 'checkbox',
    data: { default: false },
    properties: {},
    isRequired: false,
    order: 4
  }
];

// Create each field
for (const field of fields) {
  await fetch('/projects/data', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'X-User-ID': 'user-uuid'
    },
    body: JSON.stringify(field)
  });
}
```

### 2. Add Records to the Project

```javascript
// Add a task record
const record = await fetch('/projects/records', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'X-User-ID': 'user-uuid'
  },
  body: JSON.stringify({
    projectId: projectId,
    recordData: {
      'Task Name': 'Build API Documentation',
      'Priority': 'High',
      'Due Date': '2024-01-20',
      'Completed': false
    }
  })
});
```

## 🔧 Data Validation & Security

### User Isolation
- ✅ **All data is user-scoped** - Users can only access their own projects
- ✅ **Project ownership verification** - All operations verify project belongs to user
- ✅ **Record ownership verification** - All records are tied to user's projects

### Data Validation
The API automatically validates:
- **Required fields** - Must be provided
- **Unique fields** - No duplicates allowed within user's data
- **Type validation** - Email, URL, number format checking
- **Data constraints** - Max length, min/max values, etc.
- **Project ownership** - Users can only access their own projects

## 🎨 Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

## 🔐 Authentication

All endpoints require user authentication. Include user ID in headers:

```http
X-User-ID: user-uuid
```

Or use Clerk authentication context.

## 🚀 Getting Started

1. **Create a project** using `POST /projects`
2. **Define your schema** using `POST /projects/data` (include projectId)
3. **Add records** using `POST /projects/records` (include projectId)
4. **Query and manage** your data using the provided endpoints

## 🔒 Security Features

- **Complete user isolation** - No cross-user data access
- **Project ownership verification** - All operations verify project belongs to user
- **Input validation** - All data is validated before storage
- **Type safety** - Strong typing for all data types
- **Access control** - Users can only modify their own data

This API provides a secure, flexible, Notion-like database system with complete user data isolation! 🎉 