import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, CreateProjectDataDto, CreateProjectRecordDto, UpdateProjectDto, UpdateProjectDataDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Project CRUD endpoints
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.createProject(userId, createProjectDto);
  }

  @Get()
  findAllProjects(@Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findAllProjects(userId);
  }

  @Get(':id')
  findOneProject(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findOneProject(userId, id);
  }

  @Patch(':id')
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.updateProject(userId, id, updateProjectDto);
  }

  @Delete(':id')
  removeProject(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.removeProject(userId, id);
  }

  // Project Data (Schema) endpoints
  @Post('data')
  createProjectData(@Body() createProjectDataDto: CreateProjectDataDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.createProjectData(userId, createProjectDataDto);
  }

  @Get('data/all')
  findAllProjectData(@Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findAllProjectData(userId);
  }

  @Get('data/project/:projectId')
  findProjectDataByProject(@Param('projectId') projectId: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findAllProjectData(userId, projectId);
  }

  @Get('data/type/:type')
  findProjectDataByType(@Param('type') type: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findProjectDataByType(userId, type as any);
  }

  @Get('data/type/:type/project/:projectId')
  findProjectDataByTypeAndProject(@Param('type') type: string, @Param('projectId') projectId: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findProjectDataByType(userId, type as any, projectId);
  }

  @Patch('data/:id')
  updateProjectData(@Param('id') id: string, @Body() updateProjectDataDto: UpdateProjectDataDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.updateProjectData(userId, id, updateProjectDataDto);
  }

  @Delete('data/:id')
  removeProjectData(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.removeProjectData(userId, id);
  }

  // Project Records endpoints
  @Post('records')
  createProjectRecord(@Body() createProjectRecordDto: CreateProjectRecordDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.createProjectRecord(userId, createProjectRecordDto);
  }

  @Get('records')
  findAllProjectRecords(@Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findAllProjectRecords(userId);
  }

  @Get('records/project/:projectId')
  findProjectRecords(@Param('projectId') projectId: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findAllProjectRecords(userId, projectId);
  }

  @Get('records/:id')
  findOneProjectRecord(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.findOneProjectRecord(userId, id);
  }

  @Patch('records/:id')
  updateProjectRecord(@Param('id') id: string, @Body() recordData: any, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.updateProjectRecord(userId, id, recordData);
  }

  @Delete('records/:id')
  removeProjectRecord(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.removeProjectRecord(userId, id);
  }

  // Utility endpoints
  @Get('schema/:projectId')
  getProjectSchema(@Param('projectId') projectId: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.getProjectSchema(userId, projectId);
  }

  @Post('validate/:projectId')
  validateRecordData(@Param('projectId') projectId: string, @Body() recordData: any, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.projectsService.validateRecordData(userId, projectId, recordData);
  }
} 