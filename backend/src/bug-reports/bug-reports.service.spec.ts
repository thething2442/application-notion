import { Test, TestingModule } from '@nestjs/testing';
import { BugReportsService } from './bug-reports.service';
import { BugSeverity, BugStatus } from './dto/create-bug-report.dto';

describe('BugReportsService', () => {
  let service: BugReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BugReportsService],
    }).compile();

    service = module.get<BugReportsService>(BugReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBugReport', () => {
    it('should create a bug report with default values', async () => {
      const createBugReportDto = {
        title: 'Test Bug',
        description: 'This is a test bug',
      };
      const userId = 'test-user-id';

      const result = await service.createBugReport(userId, createBugReportDto);
      
      expect(result).toBeDefined();
      expect(result.title).toBe(createBugReportDto.title);
      expect(result.description).toBe(createBugReportDto.description);
      expect(result.severity).toBe(BugSeverity.MEDIUM);
      expect(result.status).toBe(BugStatus.OPEN);
      expect(result.reportedBy).toBe(userId);
    });
  });
}); 