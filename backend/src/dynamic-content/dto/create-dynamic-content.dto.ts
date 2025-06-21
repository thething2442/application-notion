import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum } from 'class-validator';

export enum ContentType {
  PRICING = 'pricing',
  NAVBAR = 'navbar',
  HERO = 'hero',
  RULES = 'rules',
  REGULATIONS = 'regulations',
  FOOTER = 'footer',
  TERMS = 'terms',
  PRIVACY = 'privacy'
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export class CreateDynamicContentDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ContentType)
  type: ContentType;

  @IsObject()
  content: any; // JSON content for the specific type

  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;

  @IsString()
  @IsOptional()
  version?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  language?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  publishedBy?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateDynamicContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  content?: any;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  publishedBy?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

// Specific DTOs for different content types
export class PricingPlanDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  billingCycle?: string; // monthly, yearly, etc.

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @IsBoolean()
  @IsOptional()
  isCustom?: boolean;

  @IsString()
  @IsOptional()
  buttonText?: string;

  @IsString()
  @IsOptional()
  buttonUrl?: string;
}

export class NavbarItemDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsBoolean()
  @IsOptional()
  isExternal?: boolean;

  @IsArray()
  @IsOptional()
  children?: NavbarItemDto[];
}

export class HeroSectionDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  primaryButtonText?: string;

  @IsString()
  @IsOptional()
  primaryButtonUrl?: string;

  @IsString()
  @IsOptional()
  secondaryButtonText?: string;

  @IsString()
  @IsOptional()
  secondaryButtonUrl?: string;

  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsString()
  @IsOptional()
  heroImage?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  highlights?: string[];
}

export class RuleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class RegulationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  section?: string;

  @IsString()
  @IsOptional()
  subsection?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  effectiveDate?: string;
} 