import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'https://application-notion-rtm4-git-main-jade-leonard-alvezs-projects.vercel.app',
      'https://application-notion-rtm4.vercel.app',
      'https://application-notion-rtm4-f95sv00bn-jade-leonard-alvezs-projects.vercel.app',
      'http://localhost:3000', // Frontend development server
      'http://localhost:3001', // Alternative frontend port
      'https://your-production-domain.com', // Add your production domain
      
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'user-id', // Custom header for user identification,
      'id',
      'user_id'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
