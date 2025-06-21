import { Module } from '@nestjs/common';
import { DynamicContentService } from './dynamic-content.service';
import { DynamicContentController } from './dynamic-content.controller';

@Module({
  controllers: [DynamicContentController],
  providers: [DynamicContentService],
  exports: [DynamicContentService],
})
export class DynamicContentModule {} 