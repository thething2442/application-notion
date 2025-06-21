import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClerkjsModule } from './clerkjs/clerkjs.module';

@Module({ 
  imports: [UsersModule, ClerkjsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
