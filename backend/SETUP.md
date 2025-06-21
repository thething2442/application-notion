# Backend Setup Guide

## Database Configuration

This backend supports two database options:

### Option 1: Turso Database (Recommended for Production)

1. **Install Turso CLI** (if not already installed):
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. **Create a Turso database**:
   ```bash
   turso db create your-database-name
   ```

3. **Get your database URL and token**:
   ```bash
   turso db show your-database-name
   turso db tokens create your-database-name
   ```

4. **Create a `.env` file** in the backend directory:
   ```env
   DATABASE_URL=your_turso_database_url_here
   DATABASE_TOKEN=your_turso_auth_token_here
   PORT=3001
   NODE_ENV=development
   ```

### Option 2: Local SQLite (Development)

If you don't have Turso credentials, the application will automatically fall back to a local SQLite database for development.

## Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run database migrations** (if using Turso):
   ```bash
   npx drizzle-kit push
   ```

3. **Start the development server**:
   ```bash
   npm run start:dev
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration (Optional - falls back to local SQLite if not provided)
DATABASE_URL=your_turso_database_url_here
DATABASE_TOKEN=your_turso_auth_token_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Optional: JWT Secret for authentication
JWT_SECRET=your_jwt_secret_here
```

## Troubleshooting

- **"URL_INVALID" error**: Make sure your DATABASE_URL is properly formatted
- **"Connection failed"**: Check your DATABASE_TOKEN and network connection
- **"Database not found"**: Ensure your Turso database exists and is accessible

## Development Notes

- The application will automatically use local SQLite if Turso credentials are not provided
- Check the console output to see which database connection is being used
- For production, always use Turso or another cloud database service 