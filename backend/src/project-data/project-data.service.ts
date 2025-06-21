import { Injectable } from '@nestjs/common';
import { CreateProjectDatumDto } from './dto/create-project-datum.dto';
import { UpdateProjectDatumDto } from './dto/update-project-datum.dto';

@Injectable()
export class ProjectDataService {
  create(createProjectDatumDto: CreateProjectDatumDto) {
    return 'This action adds a new projectDatum';
  }

  findAll() {
    return `This action returns all projectData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectDatum`;
  }

  update(id: number, updateProjectDatumDto: UpdateProjectDatumDto) {
    return `This action updates a #${id} projectDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectDatum`;
  }
}
