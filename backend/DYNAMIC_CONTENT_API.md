# Dynamic Content API Documentation

This document describes the Dynamic Content API endpoints for managing website content including pricing, navbar, hero, rules, and regulations.

## Base URL
```
/dynamic-content
```

## Authentication
Most endpoints require user authentication. The user ID is extracted from either:
- `req.user.id` (if using JWT middleware)
- `req.headers['user-id']` (fallback)

Public endpoints (prefixed with `/public`) do not require authentication.

## Data Models

### Content Types
- `pricing` - Pricing plans and packages
- `navbar` - Navigation menu structure
- `hero` - Hero section content
- `rules` - Platform rules and guidelines
- `regulations` - Platform regulations and policies
- `footer` - Footer content
- `terms` - Terms of service
- `privacy` - Privacy policy

### Content Status
- `draft` - Content is being worked on
- `published` - Content is live and active
- `archived` - Content is archived and inactive

## Endpoints

### 1. Create Dynamic Content
**POST** `/dynamic-content`

Creates new dynamic content.

**Request Body:**
```json
{
  "title": "New Pricing Plans",
  "description": "Updated pricing structure for 2024",
  "type": "pricing",
  "content": {
    "plans": [
      {
        "name": "Free",
        "price": 0,
        "currency": "USD",
        "billingCycle": "monthly",
        "features": ["Basic features", "Limited storage"],
        "buttonText": "Get Started",
        "buttonUrl": "/signup"
      },
      {
        "name": "Pro",
        "price": 29,
        "currency": "USD",
        "billingCycle": "monthly",
        "features": ["All Free features", "Advanced features", "Priority support"],
        "isPopular": true,
        "buttonText": "Start Free Trial",
        "buttonUrl": "/signup?plan=pro"
      }
    ]
  },
  "status": "draft",
  "language": "en",
  "tags": ["pricing", "2024", "update"]
}
```

**Response:**
```json
{
  "id": "content-123",
  "title": "New Pricing Plans",
  "description": "Updated pricing structure for 2024",
  "type": "pricing",
  "content": {
    "plans": [...]
  },
  "status": "draft",
  "version": null,
  "isActive": true,
  "language": "en",
  "tags": ["pricing", "2024", "update"],
  "publishedBy": null,
  "notes": null,
  "createdBy": "user-123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "publishedAt": null
}
```

### 2. Get All Dynamic Content
**GET** `/dynamic-content`

Retrieves all dynamic content with optional filtering.

**Query Parameters:**
- `type` - Filter by content type
- `status` - Filter by content status
- `language` - Filter by language
- `isActive` - Filter by active status (true/false)

**Example:**
```
GET /dynamic-content?type=pricing&status=published&language=en
```

### 3. Get Content Statistics
**GET** `/dynamic-content/stats`

Retrieves statistics about dynamic content.

**Response:**
```json
{
  "total": 25,
  "byType": {
    "pricing": 3,
    "navbar": 2,
    "hero": 2,
    "rules": 5,
    "regulations": 4,
    "footer": 2,
    "terms": 3,
    "privacy": 4
  },
  "byStatus": {
    "draft": 10,
    "published": 12,
    "archived": 3
  },
  "byLanguage": {
    "en": 20,
    "es": 3,
    "fr": 2
  }
}
```

### 4. Search Content
**GET** `/dynamic-content/search`

Searches content by title.

**Query Parameters:**
- `q` - Search term (required)
- `type` - Filter by content type (optional)

**Example:**
```
GET /dynamic-content/search?q=pricing&type=pricing
```

### 5. Get Single Content
**GET** `/dynamic-content/:id`

Retrieves a specific content item by ID.

### 6. Update Content
**PATCH** `/dynamic-content/:id`

Updates existing content.

**Request Body:**
```json
{
  "title": "Updated Pricing Plans",
  "status": "published",
  "content": {
    "plans": [...]
  }
}
```

### 7. Publish Content
**PATCH** `/dynamic-content/:id/publish`

Publishes content (changes status to published).

### 8. Archive Content
**PATCH** `/dynamic-content/:id/archive`

Archives content (changes status to archived and sets isActive to false).

### 9. Duplicate Content
**POST** `/dynamic-content/:id/duplicate`

Duplicates existing content with a new title.

**Request Body:**
```json
{
  "newTitle": "Copy of Original Content"
}
```

### 10. Delete Content
**DELETE** `/dynamic-content/:id`

Deletes content permanently.

## Public Endpoints (No Authentication Required)

### 11. Get Pricing Plans
**GET** `/dynamic-content/public/pricing`

Retrieves active pricing plans for frontend display.

**Query Parameters:**
- `language` - Language code (default: 'en')

**Response:**
```json
{
  "plans": [
    {
      "name": "Free",
      "price": 0,
      "currency": "USD",
      "billingCycle": "monthly",
      "features": ["Basic features", "Limited storage", "Community support"],
      "buttonText": "Get Started",
      "buttonUrl": "/signup"
    },
    {
      "name": "Pro",
      "price": 29,
      "currency": "USD",
      "billingCycle": "monthly",
      "features": ["All Free features", "Advanced features", "Priority support", "Unlimited storage"],
      "isPopular": true,
      "buttonText": "Start Free Trial",
      "buttonUrl": "/signup?plan=pro"
    },
    {
      "name": "Enterprise",
      "price": 99,
      "currency": "USD",
      "billingCycle": "monthly",
      "features": ["All Pro features", "Custom integrations", "Dedicated support", "SLA guarantee"],
      "buttonText": "Contact Sales",
      "buttonUrl": "/contact"
    }
  ]
}
```

### 12. Get Navbar Content
**GET** `/dynamic-content/public/navbar`

Retrieves active navbar content for frontend display.

**Response:**
```json
{
  "logo": {
    "text": "YourApp",
    "url": "/"
  },
  "items": [
    { "label": "Home", "url": "/" },
    { "label": "Features", "url": "/features" },
    { "label": "Pricing", "url": "/pricing" },
    { "label": "About", "url": "/about" },
    { "label": "Contact", "url": "/contact" }
  ],
  "cta": {
    "text": "Get Started",
    "url": "/signup"
  }
}
```

### 13. Get Hero Content
**GET** `/dynamic-content/public/hero`

Retrieves active hero section content.

**Response:**
```json
{
  "title": "Welcome to YourApp",
  "subtitle": "The best solution for your needs",
  "description": "Transform your workflow with our powerful platform. Get started today and see the difference.",
  "primaryButtonText": "Get Started",
  "primaryButtonUrl": "/signup",
  "secondaryButtonText": "Learn More",
  "secondaryButtonUrl": "/features",
  "backgroundImage": "https://example.com/hero-bg.jpg",
  "heroImage": "https://example.com/hero-image.png",
  "highlights": [
    "Easy to use",
    "Powerful features",
    "24/7 support"
  ]
}
```

### 14. Get Rules Content
**GET** `/dynamic-content/public/rules`

Retrieves active platform rules.

**Response:**
```json
{
  "title": "Platform Rules",
  "description": "Please follow these rules to ensure a positive experience for all users.",
  "rules": [
    {
      "title": "Be Respectful",
      "description": "Treat all users with respect and kindness.",
      "category": "Behavior",
      "order": 1
    },
    {
      "title": "No Spam",
      "description": "Do not post spam or irrelevant content.",
      "category": "Content",
      "order": 2
    },
    {
      "title": "Follow Guidelines",
      "description": "Follow all platform guidelines and terms of service.",
      "category": "General",
      "order": 3
    }
  ]
}
```

### 15. Get Regulations Content
**GET** `/dynamic-content/public/regulations`

Retrieves active platform regulations.

**Response:**
```json
{
  "title": "Platform Regulations",
  "description": "These regulations govern the use of our platform and services.",
  "regulations": [
    {
      "title": "Data Protection",
      "description": "We are committed to protecting your data and privacy.",
      "section": "Privacy",
      "order": 1
    },
    {
      "title": "Content Standards",
      "description": "All content must meet our community standards.",
      "section": "Content",
      "order": 2
    },
    {
      "title": "Service Usage",
      "description": "Use our services responsibly and in accordance with our terms.",
      "section": "Usage",
      "order": 3
    }
  ]
}
```

## Type-Specific Admin Endpoints

### 16. Get Pricing Content (Admin)
**GET** `/dynamic-content/type/pricing`

Retrieves all pricing content for admin management.

### 17. Get Navbar Content (Admin)
**GET** `/dynamic-content/type/navbar`

Retrieves all navbar content for admin management.

### 18. Get Hero Content (Admin)
**GET** `/dynamic-content/type/hero`

Retrieves all hero content for admin management.

### 19. Get Rules Content (Admin)
**GET** `/dynamic-content/type/rules`

Retrieves all rules content for admin management.

### 20. Get Regulations Content (Admin)
**GET** `/dynamic-content/type/regulations`

Retrieves all regulations content for admin management.

### 21. Get Footer Content (Admin)
**GET** `/dynamic-content/type/footer`

Retrieves all footer content for admin management.

### 22. Get Terms Content (Admin)
**GET** `/dynamic-content/type/terms`

Retrieves all terms of service content for admin management.

### 23. Get Privacy Content (Admin)
**GET** `/dynamic-content/type/privacy`

Retrieves all privacy policy content for admin management.

## Content Structure Examples

### Pricing Content Structure
```json
{
  "plans": [
    {
      "name": "Free",
      "description": "Perfect for getting started",
      "price": 0,
      "currency": "USD",
      "billingCycle": "monthly",
      "features": [
        "Basic features",
        "Limited storage",
        "Community support"
      ],
      "isPopular": false,
      "isCustom": false,
      "buttonText": "Get Started",
      "buttonUrl": "/signup"
    }
  ]
}
```

### Navbar Content Structure
```json
{
  "logo": {
    "text": "YourApp",
    "url": "/",
    "image": "https://example.com/logo.png"
  },
  "items": [
    {
      "label": "Home",
      "url": "/",
      "icon": "home"
    },
    {
      "label": "Features",
      "url": "/features",
      "icon": "star",
      "children": [
        { "label": "Overview", "url": "/features" },
        { "label": "Pricing", "url": "/pricing" }
      ]
    }
  ],
  "cta": {
    "text": "Get Started",
    "url": "/signup",
    "variant": "primary"
  }
}
```

### Hero Content Structure
```json
{
  "title": "Welcome to YourApp",
  "subtitle": "The best solution for your needs",
  "description": "Transform your workflow with our powerful platform.",
  "primaryButtonText": "Get Started",
  "primaryButtonUrl": "/signup",
  "secondaryButtonText": "Learn More",
  "secondaryButtonUrl": "/features",
  "backgroundImage": "https://example.com/hero-bg.jpg",
  "heroImage": "https://example.com/hero-image.png",
  "highlights": [
    "Easy to use",
    "Powerful features",
    "24/7 support"
  ]
}
```

## Error Responses

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Dynamic content with ID content-123 not found",
  "error": "Not Found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["title should not be empty", "type must be a valid enum value"],
  "error": "Bad Request"
}
```

## Database Schema

The dynamic content is stored in the `dynamic_content` table:

```sql
CREATE TABLE `dynamic_content` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `type` text NOT NULL,
  `content` text NOT NULL,
  `status` text DEFAULT 'draft' NOT NULL,
  `version` text,
  `is_active` integer DEFAULT true,
  `language` text DEFAULT 'en',
  `tags` text,
  `published_by` text,
  `notes` text,
  `created_by` text NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `published_at` text,
  FOREIGN KEY (`published_by`) REFERENCES `users`(`id`),
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);
```

## Usage Examples

### Creating Pricing Content
```javascript
const response = await fetch('/dynamic-content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'user-id': 'your-user-id'
  },
  body: JSON.stringify({
    title: 'New Pricing Plans 2024',
    description: 'Updated pricing structure',
    type: 'pricing',
    content: {
      plans: [
        {
          name: 'Free',
          price: 0,
          currency: 'USD',
          features: ['Basic features', 'Limited storage']
        },
        {
          name: 'Pro',
          price: 29,
          currency: 'USD',
          features: ['All Free features', 'Advanced features'],
          isPopular: true
        }
      ]
    },
    status: 'draft',
    language: 'en',
    tags: ['pricing', '2024']
  })
});

const content = await response.json();
```

### Getting Public Pricing
```javascript
const response = await fetch('/dynamic-content/public/pricing?language=en');
const pricingPlans = await response.json();
console.log(pricingPlans.plans);
```

### Publishing Content
```javascript
const response = await fetch('/dynamic-content/content-123/publish', {
  method: 'PATCH',
  headers: {
    'user-id': 'your-user-id'
  }
});

const publishedContent = await response.json();
```

### Searching Content
```javascript
const response = await fetch('/dynamic-content/search?q=pricing&type=pricing', {
  headers: {
    'user-id': 'your-user-id'
  }
});

const searchResults = await response.json();
``` 