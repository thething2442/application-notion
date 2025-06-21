import { drizzle } from 'drizzle-orm/libsql';

let db;

// Check if Turso database credentials are available
if (process.env.DATABASE_URL && process.env.DATABASE_TOKEN) {
  // Use Turso database
  db = drizzle({ 
    connection: {
      url: process.env.DATABASE_URL, 
      authToken: process.env.DATABASE_TOKEN 
    }
  });
  console.log('✅ Connected to Turso database');
} else {
  // Fallback to local SQLite for development
  console.log('⚠️  Turso credentials not found, using local SQLite database for development');
  console.log('📝 To use Turso database, create a .env file with DATABASE_URL and DATABASE_TOKEN');
  
  // For now, we'll create a simple local database connection
  // You can replace this with your preferred local database setup
  db = drizzle({ 
    connection: {
      url: 'file:./local.db'
    }
  });
}

export default db;
