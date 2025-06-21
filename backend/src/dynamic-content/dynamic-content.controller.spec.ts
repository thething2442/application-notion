import { Test, TestingModule } from '@nestjs/testing';
import { DynamicContentController } from './dynamic-content.controller';
import { DynamicContentService } from './dynamic-content.service';
import { ContentType, ContentStatus } from './dto/create-dynamic-content.dto';

describe('DynamicContentController', () => {
  let controller: DynamicContentController;
  let service: DynamicContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicContentController],
      providers: [
        {
          provide: DynamicContentService,
          useValue: {
            createDynamicContent: jest.fn(),
            findAllDynamicContent: jest.fn(),
            findOneDynamicContent: jest.fn(),
            updateDynamicContent: jest.fn(),
            removeDynamicContent: jest.fn(),
            publishContent: jest.fn(),
            archiveContent: jest.fn(),
            duplicateContent: jest.fn(),
            getContentStats: jest.fn(),
            searchContent: jest.fn(),
            getPricingPlans: jest.fn(),
            getNavbarContent: jest.fn(),
            getHeroContent: jest.fn(),
            getRulesContent: jest.fn(),
            getRegulationsContent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DynamicContentController>(DynamicContentController);
    service = module.get<DynamicContentService>(DynamicContentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDynamicContent', () => {
    it('should create dynamic content', async () => {
      const createDynamicContentDto = {
        title: 'Test Pricing',
        description: 'Test pricing content',
        type: ContentType.PRICING,
        content: {
          plans: [
            {
              name: 'Free',
              price: 0,
              features: ['Basic features']
            }
          ]
        },
        status: ContentStatus.DRAFT,
      };
      const userId = 'test-user-id';
      const req = { user: { id: userId } };

      jest.spyOn(service, 'createDynamicContent').mockResolvedValue({
        id: 'test-id',
        ...createDynamicContentDto,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const result = await controller.createDynamicContent(createDynamicContentDto, req);
      expect(service.createDynamicContent).toHaveBeenCalledWith(userId, createDynamicContentDto);
      expect(result).toBeDefined();
    });
  });

  describe('getPricingPlans', () => {
    it('should return pricing plans', async () => {
      const mockPricingPlans = {
        plans: [
          {
            name: 'Free',
            price: 0,
            currency: 'USD',
            features: ['Basic features']
          }
        ]
      };

      jest.spyOn(service, 'getPricingPlans').mockResolvedValue(mockPricingPlans);

      const result = await controller.getPricingPlans('en');
      expect(service.getPricingPlans).toHaveBeenCalledWith('en');
      expect(result).toEqual(mockPricingPlans);
    });
  });

  describe('getNavbarContent', () => {
    it('should return navbar content', async () => {
      const mockNavbarContent = {
        logo: { text: 'YourApp', url: '/' },
        items: [
          { label: 'Home', url: '/' },
          { label: 'Features', url: '/features' }
        ]
      };

      jest.spyOn(service, 'getNavbarContent').mockResolvedValue(mockNavbarContent);

      const result = await controller.getNavbarContent('en');
      expect(service.getNavbarContent).toHaveBeenCalledWith('en');
      expect(result).toEqual(mockNavbarContent);
    });
  });
}); 