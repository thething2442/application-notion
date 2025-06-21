import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { eq, and, desc, asc, like, SQL } from 'drizzle-orm';
import db from '../../db/db';
import { bugReports } from './entities/bug-report.entity';
import { CreateBugReportDto, UpdateBugReportDto, BugStatus, BugSeverity } from './dto/create-bug-report.dto';

@Injectable()
export class BugReportsService {
  async createBugReport(userId: string, createBugReportDto: CreateBugReportDto) {
    const bugReportData = {
      id: crypto.randomUUID(),
      ...createBugReportDto,
      reportedBy: userId,
      tags: createBugReportDto.tags ? JSON.stringify(createBugReportDto.tags) : null,
    };

    const [newBugReport] = await db.insert(bugReports).values(bugReportData).returning();
    
    return {
      ...newBugReport,
      tags: newBugReport.tags ? JSON.parse(newBugReport.tags) : [],
    };
  }

  async findAllBugReports(userId: string, filters?: {
    status?: BugStatus;
    severity?: BugSeverity;
    projectId?: string;
  }) {
    let query = db.select().from(bugReports);
    
    const conditions: SQL[] = [];
    
    // Add filters if provided
    if (filters?.status) {
      conditions.push(eq(bugReports.status, filters.status));
    }
    if (filters?.severity) {
      conditions.push(eq(bugReports.severity, filters.severity));
    }
    if (filters?.projectId) {
      conditions.push(eq(bugReports.projectId, filters.projectId));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const results = await query.orderBy(desc(bugReports.createdAt));
    
    return results.map(bugReport => ({
      ...bugReport,
      tags: bugReport.tags ? JSON.parse(bugReport.tags) : [],
    }));
  }

  async findOneBugReport(userId: string, id: string) {
    const [bugReport] = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.id, id));

    if (!bugReport) {
      throw new NotFoundException(`Bug report with ID ${id} not found`);
    }

    return {
      ...bugReport,
      tags: bugReport.tags ? JSON.parse(bugReport.tags) : [],
    };
  }

  async updateBugReport(userId: string, id: string, updateBugReportDto: UpdateBugReportDto) {
    // Check if bug report exists
    const [existingBugReport] = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.id, id));

    if (!existingBugReport) {
      throw new NotFoundException(`Bug report with ID ${id} not found`);
    }

    // Prepare update data
    const updateData: any = { ...updateBugReportDto };
    
    if (updateBugReportDto.tags) {
      updateData.tags = JSON.stringify(updateBugReportDto.tags);
    }
    
    // Set resolvedAt if status is being changed to resolved
    if (updateBugReportDto.status === BugStatus.RESOLVED && existingBugReport.status !== BugStatus.RESOLVED) {
      updateData.resolvedAt = new Date().toISOString();
    }

    const [updatedBugReport] = await db
      .update(bugReports)
      .set(updateData)
      .where(eq(bugReports.id, id))
      .returning();

    return {
      ...updatedBugReport,
      tags: updatedBugReport.tags ? JSON.parse(updatedBugReport.tags) : [],
    };
  }

  async removeBugReport(userId: string, id: string) {
    // Check if bug report exists
    const [existingBugReport] = await db
      .select()
      .from(bugReports)
      .where(eq(bugReports.id, id));

    if (!existingBugReport) {
      throw new NotFoundException(`Bug report with ID ${id} not found`);
    }

    await db.delete(bugReports).where(eq(bugReports.id, id));
    
    return { message: 'Bug report deleted successfully' };
  }

  async getBugReportStats(userId: string) {
    const allBugReports = await db.select().from(bugReports);
    
    const stats = {
      total: allBugReports.length,
      byStatus: {
        open: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0,
        duplicate: 0,
      },
      bySeverity: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      },
    };

    allBugReports.forEach(bugReport => {
      stats.byStatus[bugReport.status]++;
      stats.bySeverity[bugReport.severity]++;
    });

    return stats;
  }

  async assignBugReport(userId: string, id: string, assignedTo: string) {
    const [updatedBugReport] = await db
      .update(bugReports)
      .set({ 
        assignedTo,
        status: BugStatus.IN_PROGRESS 
      })
      .where(eq(bugReports.id, id))
      .returning();

    if (!updatedBugReport) {
      throw new NotFoundException(`Bug report with ID ${id} not found`);
    }

    return {
      ...updatedBugReport,
      tags: updatedBugReport.tags ? JSON.parse(updatedBugReport.tags) : [],
    };
  }

  async resolveBugReport(userId: string, id: string, resolution: string) {
    const [updatedBugReport] = await db
      .update(bugReports)
      .set({ 
        status: BugStatus.RESOLVED,
        resolution,
        resolvedAt: new Date().toISOString()
      })
      .where(eq(bugReports.id, id))
      .returning();

    if (!updatedBugReport) {
      throw new NotFoundException(`Bug report with ID ${id} not found`);
    }

    return {
      ...updatedBugReport,
      tags: updatedBugReport.tags ? JSON.parse(updatedBugReport.tags) : [],
    };
  }
} 