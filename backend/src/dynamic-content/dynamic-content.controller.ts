import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DynamicContentService } from './dynamic-content.service';
import { CreateDynamicContentDto, UpdateDynamicContentDto, ContentType, ContentStatus } from './dto/create-dynamic-content.dto';

@Controller('dynamic-content')
export class DynamicContentController {
  constructor(private readonly dynamicContentService: DynamicContentService) {}

  // General CRUD endpoints
  @Post()
  createDynamicContent(@Body() createDynamicContentDto: CreateDynamicContentDto, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.createDynamicContent(userId, createDynamicContentDto);
  }

  @Get()
  findAllDynamicContent(
    @Req() req: any,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('language') language?: string,
    @Query('isActive') isActive?: string,
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    const filters = {
      ...(type && { type: type as ContentType }),
      ...(status && { status: status as ContentStatus }),
      ...(language && { language }),
      ...(isActive !== undefined && { isActive: isActive === 'true' }),
    };
    return this.dynamicContentService.findAllDynamicContent(userId, Object.keys(filters).length > 0 ? filters : undefined);
  }

  @Get('stats')
  getContentStats(@Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.getContentStats(userId);
  }

  @Get('search')
  searchContent(
    @Req() req: any,
    @Query('q') searchTerm: string,
    @Query('type') type?: string,
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.searchContent(userId, searchTerm, type as ContentType);
  }

  @Get(':id')
  findOneDynamicContent(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findOneDynamicContent(userId, id);
  }

  @Patch(':id')
  updateDynamicContent(
    @Param('id') id: string, 
    @Body() updateDynamicContentDto: UpdateDynamicContentDto, 
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.updateDynamicContent(userId, id, updateDynamicContentDto);
  }

  @Patch(':id/publish')
  publishContent(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.publishContent(userId, id);
  }

  @Patch(':id/archive')
  archiveContent(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.archiveContent(userId, id);
  }

  @Post(':id/duplicate')
  duplicateContent(
    @Param('id') id: string,
    @Body() body: { newTitle: string },
    @Req() req: any
  ) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.duplicateContent(userId, id, body.newTitle);
  }

  @Delete(':id')
  removeDynamicContent(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.removeDynamicContent(userId, id);
  }

  // Public endpoints for frontend consumption
  @Get('public/pricing')
  getPricingPlans(@Query('language') language?: string) {
    return this.dynamicContentService.getPricingPlans(language || 'en');
  }

  @Get('public/navbar')
  getNavbarContent(@Query('language') language?: string) {
    return this.dynamicContentService.getNavbarContent(language || 'en');
  }

  @Get('public/hero')
  getHeroContent(@Query('language') language?: string) {
    return this.dynamicContentService.getHeroContent(language || 'en');
  }

  @Get('public/rules')
  getRulesContent(@Query('language') language?: string) {
    return this.dynamicContentService.getRulesContent(language || 'en');
  }

  @Get('public/regulations')
  getRegulationsContent(@Query('language') language?: string) {
    return this.dynamicContentService.getRegulationsContent(language || 'en');
  }

  // Type-specific endpoints
  @Get('type/pricing')
  getPricingContent(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.PRICING,
      language: language || 'en'
    });
  }

  @Get('type/navbar')
  getNavbarContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.NAVBAR,
      language: language || 'en'
    });
  }

  @Get('type/hero')
  getHeroContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.HERO,
      language: language || 'en'
    });
  }

  @Get('type/rules')
  getRulesContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.RULES,
      language: language || 'en'
    });
  }

  @Get('type/regulations')
  getRegulationsContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.REGULATIONS,
      language: language || 'en'
    });
  }

  @Get('type/footer')
  getFooterContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.FOOTER,
      language: language || 'en'
    });
  }

  @Get('type/terms')
  getTermsContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.TERMS,
      language: language || 'en'
    });
  }

  @Get('type/privacy')
  getPrivacyContentAdmin(@Req() req: any, @Query('language') language?: string) {
    const userId = req.user?.id || req.headers['user-id'];
    return this.dynamicContentService.findAllDynamicContent(userId, { 
      type: ContentType.PRIVACY,
      language: language || 'en'
    });
  }
} 