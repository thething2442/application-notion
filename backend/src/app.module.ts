import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClerkjsModule } from './clerkjs/clerkjs.module';
import { ProjectDataModule } from './project-data/project-data.module';

@Module({ 
  imports: [UsersModule, ClerkjsModule, ProjectDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
