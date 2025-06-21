import { Module } from '@nestjs/common';
import { BugReportsService } from './bug-reports.service';
import { BugReportsController } from './bug-reports.controller';

@Module({
  controllers: [BugReportsController],
  providers: [BugReportsService],
  exports: [BugReportsService],
})
export class BugReportsModule {} 