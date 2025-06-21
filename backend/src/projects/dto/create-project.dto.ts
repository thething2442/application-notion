import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class CreateProjectDataDto {
  @IsString()
  projectId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  type: 'text' | 'number' | 'select' | 'multi_select' | 'date' | 'checkbox' | 'url' | 'email' | 'phone' | 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by';

  @IsObject()
  data: any; // JSON data for the field

  @IsObject()
  properties: any; // JSON properties for the field

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsBoolean()
  isUnique?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateProjectRecordDto {
  @IsString()
  projectId: string;

  @IsObject()
  recordData: any; // JSON object containing all field values
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateProjectDataDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: 'text' | 'number' | 'select' | 'multi_select' | 'date' | 'checkbox' | 'url' | 'email' | 'phone' | 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by';

  @IsOptional()
  @IsObject()
  data?: any;

  @IsOptional()
  @IsObject()
  properties?: any;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsBoolean()
  isUnique?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
} 