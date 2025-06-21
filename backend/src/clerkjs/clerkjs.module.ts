import { Module } from '@nestjs/common';
import { ClerkJsService } from './clerkjs.service';
import { ClerkController } from './clerkjs.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ClerkController],
  providers: [ClerkJsService],
})
export class ClerkjsModule {}
