import { Test, TestingModule } from '@nestjs/testing';
import { ClerkjsService } from './clerkjs.service';

describe('ClerkjsService', () => {
  let service: ClerkjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClerkjsService],
    }).compile();

    service = module.get<ClerkjsService>(ClerkjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
