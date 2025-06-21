import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // New relation-based endpoints
  @Get(':id/relations')
  findUserWithRelations(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.findUserWithRelations(userId);
  }

  @Get(':id/project-data')
  getUserProjectData(
    @Param('id') id: string,
    @Req() req: any,
    @Query('projectId') projectId?: string
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.getUserProjectData(userId, projectId);
  }

  @Get(':id/project-records')
  getUserProjectRecords(
    @Param('id') id: string,
    @Req() req: any,
    @Query('projectId') projectId?: string
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.getUserProjectRecords(userId, projectId);
  }

  @Get(':id/bug-reports')
  getUserBugReports(
    @Param('id') id: string,
    @Query('type') type: 'reported' | 'assigned' = 'reported',
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.getUserBugReports(userId, type);
  }

  @Get(':id/stats')
  getUserStats(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.getUserStats(userId);
  }

  @Get(':id/search')
  searchUserContent(
    @Param('id') id: string,
    @Query('q') searchTerm: string,
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.searchUserContent(userId, searchTerm);
  }

  @Get(':id/projects/:projectId/relations')
  getProjectWithRelations(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.usersService.getProjectWithRelations(projectId, userId);
  }
}
