import { Test, TestingModule } from '@nestjs/testing';
import { ClerkjsController } from './clerkjs.controller';
import { ClerkjsService } from './clerkjs.service';

describe('ClerkjsController', () => {
  let controller: ClerkjsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClerkjsController],
      providers: [ClerkjsService],
    }).compile();

    controller = module.get<ClerkjsController>(ClerkjsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
