import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { BugReportsService } from './bug-reports.service';
import { CreateBugReportDto, UpdateBugReportDto, BugStatus, BugSeverity } from './dto/create-bug-report.dto';

@Controller('bug-reports')
export class BugReportsController {
  constructor(private readonly bugReportsService: BugReportsService) {}

  @Post()
  createBugReport(@Body() createBugReportDto: CreateBugReportDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.createBugReport(userId, createBugReportDto);
  }

  @Get()
  findAllBugReports(
    @Req() req: any,
    @Query('status') status?: string,
    @Query('severity') severity?: string,
    @Query('projectId') projectId?: string,
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    const filters = {
      ...(status && { status: status as BugStatus }),
      ...(severity && { severity: severity as BugSeverity }),
      ...(projectId && { projectId }),
    };
    return this.bugReportsService.findAllBugReports(userId, Object.keys(filters).length > 0 ? filters : undefined);
  }

  @Get('stats')
  getBugReportStats(@Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.getBugReportStats(userId);
  }

  @Get(':id')
  findOneBugReport(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.findOneBugReport(userId, id);
  }

  @Patch(':id')
  updateBugReport(
    @Param('id') id: string, 
    @Body() updateBugReportDto: UpdateBugReportDto, 
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.updateBugReport(userId, id, updateBugReportDto);
  }

  @Patch(':id/assign')
  assignBugReport(
    @Param('id') id: string,
    @Body() body: { assignedTo: string },
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.assignBugReport(userId, id, body.assignedTo);
  }

  @Patch(':id/resolve')
  resolveBugReport(
    @Param('id') id: string,
    @Body() body: { resolution: string },
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.resolveBugReport(userId, id, body.resolution);
  }

  @Delete(':id')
  removeBugReport(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.bugReportsService.removeBugReport(userId, id);
  }
} 