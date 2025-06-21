import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users, projects, projectData, projectRecords, bugReports, dynamicContent } from '../../drizzle/schema';
import db from '../../db/db';
import { eq, and, desc, asc, like, SQL, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
  // Create a new user (Clerk user)
  async create(createUserDto: CreateUserDto) {
    try {
      // Map DTO to DB fields
      const user = await db.insert(users).values({
        id: createUserDto.externalId, // Clerk ID as PK
        email: createUserDto.email,
        name: [createUserDto.firstName, createUserDto.lastName].filter(Boolean).join(' '),
        plan: createUserDto.plan || 'free',
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  }

  // Upsert user by Clerk ID
  async createOrUpdateUser(createUserDto: CreateUserDto) {
    try {
      const existing = await db.select().from(users).where(eq(users.id, createUserDto.externalId)).get();
      if (existing) {
        // Update user
        await db.update(users).set({
          email: createUserDto.email,
          name: [createUserDto.firstName, createUserDto.lastName].filter(Boolean).join(' '),
          plan: createUserDto.plan || 'free',
        }).where(eq(users.id, createUserDto.externalId));
        return { ...existing, ...createUserDto };
      } else {
        // Create user
        return await this.create(createUserDto);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update user');
    }
  }

  // Example: return all users (for testing)
  async findAll() {
    return db.select().from(users).all();
  }

  // Example: find one user by Clerk ID
  async findOne(id: string) {
    return db.select().from(users).where(eq(users.id, id)).get();
  }

  // Example: update user by Clerk ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    return db.update(users).set(updateUserDto).where(eq(users.id, id));
  }

  // Example: remove user by Clerk ID
  async remove(id: string) {
    return db.delete(users).where(eq(users.id, id));
  }

  async findUserWithRelations(userId: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Get user's projects
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.createdAt));

    // Get user's project data
    const userProjectData = await db
      .select()
      .from(projectData)
      .where(eq(projectData.userId, userId))
      .orderBy(desc(projectData.createdAt));

    // Get user's project records
    const userProjectRecords = await db
      .select()
      .from(projectRecords)
      .where(eq(projectRecords.userId, userId))
      .orderBy(desc(projectRecords.createdAt));

    // Get bug reports reported by user
    const reportedBugs = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.reportedBy, userId))
      .orderBy(desc(bugReports.createdAt));

    // Get bug reports assigned to user
    const assignedBugs = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.assignedTo, userId))
      .orderBy(desc(bugReports.createdAt));

    // Get dynamic content created by user
    const createdContent = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.createdBy, userId))
      .orderBy(desc(dynamicContent.createdAt));

    // Get dynamic content published by user
    const publishedContent = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.publishedBy, userId))
      .orderBy(desc(dynamicContent.createdAt));

    return {
      user,
      projects: userProjects,
      projectData: userProjectData.map(data => ({
        ...data,
        data: JSON.parse(data.data),
        properties: JSON.parse(data.properties),
      })),
      projectRecords: userProjectRecords.map(record => ({
        ...record,
        recordData: JSON.parse(record.recordData),
      })),
      reportedBugs: reportedBugs.map(bug => ({
        ...bug,
        tags: bug.tags ? JSON.parse(bug.tags) : [],
      })),
      assignedBugs: assignedBugs.map(bug => ({
        ...bug,
        tags: bug.tags ? JSON.parse(bug.tags) : [],
      })),
      createdContent: createdContent.map(content => ({
        ...content,
        tags: content.tags ? JSON.parse(content.tags) : [],
        content: JSON.parse(content.content),
      })),
      publishedContent: publishedContent.map(content => ({
        ...content,
        tags: content.tags ? JSON.parse(content.tags) : [],
        content: JSON.parse(content.content),
      })),
    };
  }

  async getUserProjectData(userId: string, projectId?: string) {
    let query = db
      .select({
        projectData: projectData,
        project: projects,
      })
      .from(projectData)
      .innerJoin(projects, eq(projectData.projectId, projects.id))
      .where(eq(projectData.userId, userId));

    if (projectId) {
      query = query.where(and(eq(projectData.userId, userId), eq(projectData.projectId, projectId)));
    }

    const results = await query.orderBy(desc(projectData.createdAt));

    return results.map(result => ({
      ...result.projectData,
      data: JSON.parse(result.projectData.data),
      properties: JSON.parse(result.projectData.properties),
      project: result.project,
    }));
  }

  async getUserProjectRecords(userId: string, projectId?: string) {
    let query = db
      .select({
        record: projectRecords,
        project: projects,
        creator: users,
      })
      .from(projectRecords)
      .innerJoin(projects, eq(projectRecords.projectId, projects.id))
      .innerJoin(users, eq(projectRecords.createdBy, users.id))
      .where(eq(projectRecords.userId, userId));

    if (projectId) {
      query = query.where(and(eq(projectRecords.userId, userId), eq(projectRecords.projectId, projectId)));
    }

    const results = await query.orderBy(desc(projectRecords.createdAt));

    return results.map(result => ({
      ...result.record,
      recordData: JSON.parse(result.record.recordData),
      project: result.project,
      creator: result.creator,
    }));
  }

  async getUserBugReports(userId: string, type: 'reported' | 'assigned' = 'reported') {
    const query = type === 'reported' 
      ? db.select().from(bugReports).where(eq(bugReports.reportedBy, userId))
      : db.select().from(bugReports).where(eq(bugReports.assignedTo, userId));

    const results = await query.orderBy(desc(bugReports.createdAt));

    return results.map(bug => ({
      ...bug,
      tags: bug.tags ? JSON.parse(bug.tags) : [],
    }));
  }

  async getUserStats(userId: string) {
    // Get counts for different entities
    const [projectsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.userId, userId));

    const [projectDataCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projectData)
      .where(eq(projectData.userId, userId));

    const [projectRecordsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projectRecords)
      .where(eq(projectRecords.userId, userId));

    const [reportedBugsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bugReports)
      .where(eq(bugReports.reportedBy, userId));

    const [assignedBugsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bugReports)
      .where(eq(bugReports.assignedTo, userId));

    const [createdContentCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(dynamicContent)
      .where(eq(dynamicContent.createdBy, userId));

    const [publishedContentCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(dynamicContent)
      .where(eq(dynamicContent.publishedBy, userId));

    return {
      projects: projectsCount.count,
      projectData: projectDataCount.count,
      projectRecords: projectRecordsCount.count,
      reportedBugs: reportedBugsCount.count,
      assignedBugs: assignedBugsCount.count,
      createdContent: createdContentCount.count,
      publishedContent: publishedContentCount.count,
    };
  }

  async searchUserContent(userId: string, searchTerm: string) {
    // Search in project data
    const projectDataResults = await db
      .select()
      .from(projectData)
      .where(
        and(
          eq(projectData.userId, userId),
          like(projectData.title, `%${searchTerm}%`)
        )
      )
      .orderBy(desc(projectData.createdAt));

    // Search in dynamic content
    const dynamicContentResults = await db
      .select()
      .from(dynamicContent)
      .where(
        and(
          eq(dynamicContent.createdBy, userId),
          like(dynamicContent.title, `%${searchTerm}%`)
        )
      )
      .orderBy(desc(dynamicContent.createdAt));

    return {
      projectData: projectDataResults.map(data => ({
        ...data,
        data: JSON.parse(data.data),
        properties: JSON.parse(data.properties),
      })),
      dynamicContent: dynamicContentResults.map(content => ({
        ...content,
        tags: content.tags ? JSON.parse(content.tags) : [],
        content: JSON.parse(content.content),
      })),
    };
  }

  async getProjectWithRelations(projectId: string, userId: string) {
    // Get project
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found for user ${userId}`);
    }

    // Get project data
    const projectDataResults = await db
      .select()
      .from(projectData)
      .where(eq(projectData.projectId, projectId))
      .orderBy(asc(projectData.order), asc(projectData.createdAt));

    // Get project records
    const projectRecordsResults = await db
      .select({
        record: projectRecords,
        creator: users,
      })
      .from(projectRecords)
      .innerJoin(users, eq(projectRecords.createdBy, users.id))
      .where(eq(projectRecords.projectId, projectId))
      .orderBy(desc(projectRecords.createdAt));

    // Get related bug reports
    const bugReportsResults = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.projectId, projectId))
      .orderBy(desc(bugReports.createdAt));

    return {
      project,
      projectData: projectDataResults.map(data => ({
        ...data,
        data: JSON.parse(data.data),
        properties: JSON.parse(data.properties),
      })),
      projectRecords: projectRecordsResults.map(result => ({
        ...result.record,
        recordData: JSON.parse(result.record.recordData),
        creator: result.creator,
      })),
      bugReports: bugReportsResults.map(bug => ({
        ...bug,
        tags: bug.tags ? JSON.parse(bug.tags) : [],
      })),
    };
  }
}
