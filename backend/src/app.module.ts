import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClerkjsModule } from './clerkjs/clerkjs.module';
import { ProjectsModule } from './projects/projects.module';
import { BugReportsModule } from './bug-reports/bug-reports.module';
import { DynamicContentModule } from './dynamic-content/dynamic-content.module';

@Module({
  imports: [UsersModule, ClerkjsModule, ProjectsModule, BugReportsModule, DynamicContentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
