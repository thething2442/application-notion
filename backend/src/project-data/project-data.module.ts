import { Module } from '@nestjs/common';
import { ProjectDataService } from './project-data.service';
import { ProjectDataController } from './project-data.controller';

@Module({
  controllers: [ProjectDataController],
  providers: [ProjectDataService],
})
export class ProjectDataModule {}
