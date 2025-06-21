import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectDataService } from './project-data.service';
import { CreateProjectDatumDto } from './dto/create-project-datum.dto';
import { UpdateProjectDatumDto } from './dto/update-project-datum.dto';

@Controller('project-data')
export class ProjectDataController {
  constructor(private readonly projectDataService: ProjectDataService) {}

  @Post()
  create(@Body() createProjectDatumDto: CreateProjectDatumDto) {
    return this.projectDataService.create(createProjectDatumDto);
  }

  @Get()
  findAll() {
    return this.projectDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDatumDto: UpdateProjectDatumDto) {
    return this.projectDataService.update(+id, updateProjectDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectDataService.remove(+id);
  }
}
