import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClerkjsModule } from './clerkjs/clerkjs.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UsersModule, ClerkjsModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
