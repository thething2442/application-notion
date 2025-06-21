import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDatumDto } from './create-project-datum.dto';

export class UpdateProjectDatumDto extends PartialType(CreateProjectDatumDto) {}
