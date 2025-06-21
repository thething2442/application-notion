import { Test, TestingModule } from '@nestjs/testing';
import { BugReportsController } from './bug-reports.controller';
import { BugReportsService } from './bug-reports.service';
import { BugSeverity } from './dto/create-bug-report.dto';

describe('BugReportsController', () => {
  let controller: BugReportsController;
  let service: BugReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugReportsController],
      providers: [
        {
          provide: BugReportsService,
          useValue: {
            createBugReport: jest.fn(),
            findAllBugReports: jest.fn(),
            findOneBugReport: jest.fn(),
            updateBugReport: jest.fn(),
            removeBugReport: jest.fn(),
            getBugReportStats: jest.fn(),
            assignBugReport: jest.fn(),
            resolveBugReport: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BugReportsController>(BugReportsController);
    service = module.get<BugReportsService>(BugReportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createBugReport', () => {
    it('should create a bug report', async () => {
      const createBugReportDto = {
        title: 'Test Bug',
        description: 'This is a test bug',
        severity: BugSeverity.MEDIUM,
      };
      const userId = 'test-user-id';
      const req = { user: { id: userId } };

      jest.spyOn(service, 'createBugReport').mockResolvedValue({
        id: 'test-id',
        ...createBugReportDto,
        reportedBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const result = await controller.createBugReport(createBugReportDto, req);
      expect(service.createBugReport).toHaveBeenCalledWith(userId, createBugReportDto);
      expect(result).toBeDefined();
    });
  });
}); 