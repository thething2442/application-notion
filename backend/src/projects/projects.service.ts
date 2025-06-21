import { Injectable } from '@nestjs/common';
import { CreateProjectDto, CreateProjectDataDto, CreateProjectRecordDto, UpdateProjectDto, UpdateProjectDataDto } from './dto/create-project.dto';
import { projects, projectData, projectRecords, users } from '../../drizzle/schema';
import db from '../../db/db';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  // Project CRUD operations
  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    try {
      const project = await db.insert(projects).values({
        id: uuidv4(),
        userId,
        name: createProjectDto.name,
        description: createProjectDto.description,
        icon: createProjectDto.icon,
        color: createProjectDto.color,
        isPublic: createProjectDto.isPublic || false,
      });
      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  async findAllProjects(userId: string) {
    try {
      return await db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.createdAt));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects');
    }
  }

  async findOneProject(userId: string, projectId: string) {
    try {
      return await db.select().from(projects).where(and(eq(projects.id, projectId), eq(projects.userId, userId))).get();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error('Failed to fetch project');
    }
  }

  async updateProject(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    try {
      await db.update(projects).set({
        ...updateProjectDto,
        updatedAt: new Date().toISOString(),
      }).where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
      return { message: 'Project updated successfully' };
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }

  async removeProject(userId: string, projectId: string) {
    try {
      await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
      return { message: 'Project deleted successfully' };
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }

  // Project Data (Schema) operations
  async createProjectData(userId: string, createProjectDataDto: CreateProjectDataDto) {
    try {
      // Verify the project belongs to the user
      const project = await this.findOneProject(userId, createProjectDataDto.projectId);
      if (!project) {
        throw new Error('Project not found or access denied');
      }

      const projectDataItem = await db.insert(projectData).values({
        id: uuidv4(),
        userId,
        projectId: createProjectDataDto.projectId,
        title: createProjectDataDto.title,
        description: createProjectDataDto.description,
        type: createProjectDataDto.type,
        data: JSON.stringify(createProjectDataDto.data),
        properties: JSON.stringify(createProjectDataDto.properties),
        isRequired: createProjectDataDto.isRequired || false,
        isUnique: createProjectDataDto.isUnique || false,
        order: createProjectDataDto.order || 0,
      });
      return projectDataItem;
    } catch (error) {
      console.error('Error creating project data:', error);
      throw new Error('Failed to create project data');
    }
  }

  async findAllProjectData(userId: string, projectId?: string) {
    try {
      let query = db.select().from(projectData).where(eq(projectData.userId, userId));
      
      if (projectId) {
        query = query.where(and(eq(projectData.userId, userId), eq(projectData.projectId, projectId)));
      }
      
      const data = await query.orderBy(projectData.order);
      return data.map(item => ({
        ...item,
        data: JSON.parse(item.data),
        properties: JSON.parse(item.properties),
      }));
    } catch (error) {
      console.error('Error fetching project data:', error);
      throw new Error('Failed to fetch project data');
    }
  }

  async findProjectDataByType(userId: string, type: 'text' | 'number' | 'select' | 'multi_select' | 'date' | 'checkbox' | 'url' | 'email' | 'phone' | 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by', projectId?: string) {
    try {
      let query = db.select().from(projectData).where(and(eq(projectData.userId, userId), eq(projectData.type, type)));
      
      if (projectId) {
        query = query.where(and(eq(projectData.userId, userId), eq(projectData.type, type), eq(projectData.projectId, projectId)));
      }
      
      const data = await query.orderBy(projectData.order);
      return data.map(item => ({
        ...item,
        data: JSON.parse(item.data),
        properties: JSON.parse(item.properties),
      }));
    } catch (error) {
      console.error('Error fetching project data by type:', error);
      throw new Error('Failed to fetch project data by type');
    }
  }

  async updateProjectData(userId: string, dataId: string, updateProjectDataDto: UpdateProjectDataDto) {
    try {
      const updateData: any = {
        updatedAt: new Date().toISOString(),
      };

      if (updateProjectDataDto.title) updateData.title = updateProjectDataDto.title;
      if (updateProjectDataDto.description) updateData.description = updateProjectDataDto.description;
      if (updateProjectDataDto.type) updateData.type = updateProjectDataDto.type;
      if (updateProjectDataDto.data) updateData.data = JSON.stringify(updateProjectDataDto.data);
      if (updateProjectDataDto.properties) updateData.properties = JSON.stringify(updateProjectDataDto.properties);
      if (updateProjectDataDto.isRequired !== undefined) updateData.isRequired = updateProjectDataDto.isRequired;
      if (updateProjectDataDto.isUnique !== undefined) updateData.isUnique = updateProjectDataDto.isUnique;
      if (updateProjectDataDto.order !== undefined) updateData.order = updateProjectDataDto.order;

      await db.update(projectData).set(updateData).where(and(eq(projectData.id, dataId), eq(projectData.userId, userId)));
      return { message: 'Project data updated successfully' };
    } catch (error) {
      console.error('Error updating project data:', error);
      throw new Error('Failed to update project data');
    }
  }

  async removeProjectData(userId: string, dataId: string) {
    try {
      await db.delete(projectData).where(and(eq(projectData.id, dataId), eq(projectData.userId, userId)));
      return { message: 'Project data deleted successfully' };
    } catch (error) {
      console.error('Error deleting project data:', error);
      throw new Error('Failed to delete project data');
    }
  }

  // Project Records operations
  async createProjectRecord(userId: string, createProjectRecordDto: CreateProjectRecordDto) {
    try {
      // Verify the project belongs to the user
      const project = await this.findOneProject(userId, createProjectRecordDto.projectId);
      if (!project) {
        throw new Error('Project not found or access denied');
      }

      const record = await db.insert(projectRecords).values({
        id: uuidv4(),
        userId,
        projectId: createProjectRecordDto.projectId,
        recordData: JSON.stringify(createProjectRecordDto.recordData),
        createdBy: userId,
      });
      return record;
    } catch (error) {
      console.error('Error creating project record:', error);
      throw new Error('Failed to create project record');
    }
  }

  async findAllProjectRecords(userId: string, projectId?: string) {
    try {
      let query = db.select().from(projectRecords).where(eq(projectRecords.userId, userId));
      
      if (projectId) {
        // Verify the project belongs to the user
        const project = await this.findOneProject(userId, projectId);
        if (!project) {
          throw new Error('Project not found or access denied');
        }
        query = query.where(and(eq(projectRecords.userId, userId), eq(projectRecords.projectId, projectId)));
      }
      
      const records = await query.orderBy(desc(projectRecords.createdAt));
      return records.map(record => ({
        ...record,
        recordData: JSON.parse(record.recordData),
      }));
    } catch (error) {
      console.error('Error fetching project records:', error);
      throw new Error('Failed to fetch project records');
    }
  }

  async findOneProjectRecord(userId: string, recordId: string) {
    try {
      const record = await db.select().from(projectRecords).where(and(eq(projectRecords.id, recordId), eq(projectRecords.userId, userId))).get();
      if (record) {
        return {
          ...record,
          recordData: JSON.parse(record.recordData),
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching project record:', error);
      throw new Error('Failed to fetch project record');
    }
  }

  async updateProjectRecord(userId: string, recordId: string, recordData: any) {
    try {
      await db.update(projectRecords).set({
        recordData: JSON.stringify(recordData),
        updatedAt: new Date().toISOString(),
      }).where(and(eq(projectRecords.id, recordId), eq(projectRecords.userId, userId)));
      return { message: 'Project record updated successfully' };
    } catch (error) {
      console.error('Error updating project record:', error);
      throw new Error('Failed to update project record');
    }
  }

  async removeProjectRecord(userId: string, recordId: string) {
    try {
      await db.delete(projectRecords).where(and(eq(projectRecords.id, recordId), eq(projectRecords.userId, userId)));
      return { message: 'Project record deleted successfully' };
    } catch (error) {
      console.error('Error deleting project record:', error);
      throw new Error('Failed to delete project record');
    }
  }

  // Utility methods for Notion-like functionality
  async getProjectSchema(userId: string, projectId: string) {
    try {
      // Verify the project belongs to the user
      const project = await this.findOneProject(userId, projectId);
      if (!project) {
        throw new Error('Project not found or access denied');
      }

      const data = await db.select().from(projectData).where(and(eq(projectData.userId, userId), eq(projectData.projectId, projectId))).orderBy(projectData.order);
      return data.map(item => ({
        ...item,
        data: JSON.parse(item.data),
        properties: JSON.parse(item.properties),
      }));
    } catch (error) {
      console.error('Error fetching project schema:', error);
      throw new Error('Failed to fetch project schema');
    }
  }

  async validateRecordData(userId: string, projectId: string, recordData: any) {
    try {
      // Verify the project belongs to the user
      const project = await this.findOneProject(userId, projectId);
      if (!project) {
        throw new Error('Project not found or access denied');
      }

      const schema = await this.getProjectSchema(userId, projectId);
      const errors: string[] = [];

      for (const field of schema) {
        const fieldData = recordData[field.title];
        
        // Check required fields
        if (field.isRequired && (fieldData === undefined || fieldData === null || fieldData === '')) {
          errors.push(`${field.title} is required`);
        }

        // Check unique fields
        if (field.isUnique && fieldData !== undefined && fieldData !== null && fieldData !== '') {
          const existingRecords = await this.findAllProjectRecords(userId, projectId);
          const hasDuplicate = existingRecords.some(record => 
            record.recordData[field.title] === fieldData
          );
          if (hasDuplicate) {
            errors.push(`${field.title} must be unique`);
          }
        }

        // Type validation
        if (fieldData !== undefined && fieldData !== null) {
          switch (field.type) {
            case 'number':
              if (isNaN(Number(fieldData))) {
                errors.push(`${field.title} must be a number`);
              }
              break;
            case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(fieldData)) {
                errors.push(`${field.title} must be a valid email`);
              }
              break;
            case 'url':
              try {
                new URL(fieldData);
              } catch {
                errors.push(`${field.title} must be a valid URL`);
              }
              break;
            case 'date':
              if (isNaN(Date.parse(fieldData))) {
                errors.push(`${field.title} must be a valid date`);
              }
              break;
          }
        }
      }

      return { isValid: errors.length === 0, errors };
    } catch (error) {
      console.error('Error validating record data:', error);
      throw new Error('Failed to validate record data');
    }
  }
} 