import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { eq, and, desc, asc, like, SQL } from 'drizzle-orm';
import db from '../../db/db';
import { dynamicContent } from '../../drizzle/schema';
import { CreateDynamicContentDto, UpdateDynamicContentDto, ContentType, ContentStatus } from './dto/create-dynamic-content.dto';
@Injectable()
export class DynamicContentService {
  async createDynamicContent(userId: string, createDynamicContentDto: CreateDynamicContentDto) {
    const contentData = {
      id: crypto.randomUUID(),
      ...createDynamicContentDto,
      createdBy: userId,
      tags: createDynamicContentDto.tags ? JSON.stringify(createDynamicContentDto.tags) : null,
      content: JSON.stringify(createDynamicContentDto.content),
    };

    const [newContent] = await db.insert(dynamicContent).values(contentData).returning();
    
    return {
      ...newContent,
      tags: newContent.tags ? JSON.parse(newContent.tags) : [],
      content: JSON.parse(newContent.content),
    };
  }

  async findAllDynamicContent(userId: string, filters?: {
    type?: ContentType;
    status?: ContentStatus;
    language?: string;
    isActive?: boolean;
  }) {
    let query = db.select().from(dynamicContent);
    
    const conditions: SQL[] = [];
    
    // Add filters if provided
    if (filters?.type) {
      conditions.push(eq(dynamicContent.type, filters.type));
    }
    if (filters?.status) {
      conditions.push(eq(dynamicContent.status, filters.status));
    }
    if (filters?.language) {
      conditions.push(eq(dynamicContent.language, filters.language));
    }
    if (filters?.isActive !== undefined) {
      conditions.push(eq(dynamicContent.isActive, filters.isActive));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const results = await query.orderBy(desc(dynamicContent.updatedAt));
    
    return results.map(content => ({
      ...content,
      tags: content.tags ? JSON.parse(content.tags) : [],
      content: JSON.parse(content.content),
    }));
  }

  async findOneDynamicContent(userId: string, id: string) {
    const [content] = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.id, id));

    if (!content) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    return {
      ...content,
      tags: content.tags ? JSON.parse(content.tags) : [],
      content: JSON.parse(content.content),
    };
  }

  async findActiveContentByType(type: ContentType, language: string = 'en') {
    const [content] = await db
      .select()
      .from(dynamicContent)
      .where(
        and(
          eq(dynamicContent.type, type),
          eq(dynamicContent.status, ContentStatus.PUBLISHED),
          eq(dynamicContent.isActive, true),
          eq(dynamicContent.language, language)
        )
      )
      .orderBy(desc(dynamicContent.updatedAt));

    if (!content) {
      throw new NotFoundException(`No active ${type} content found for language ${language}`);
    }

    return {
      ...content,
      tags: content.tags ? JSON.parse(content.tags) : [],
      content: JSON.parse(content.content),
    };
  }

  async updateDynamicContent(userId: string, id: string, updateDynamicContentDto: UpdateDynamicContentDto) {
    // Check if content exists
    const [existingContent] = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.id, id));

    if (!existingContent) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    // Prepare update data
    const updateData: any = { ...updateDynamicContentDto };
    
    if (updateDynamicContentDto.tags) {
      updateData.tags = JSON.stringify(updateDynamicContentDto.tags);
    }
    
    if (updateDynamicContentDto.content) {
      updateData.content = JSON.stringify(updateDynamicContentDto.content);
    }
    
    // Set publishedAt if status is being changed to published
    if (updateDynamicContentDto.status === ContentStatus.PUBLISHED && existingContent.status !== ContentStatus.PUBLISHED) {
      updateData.publishedAt = new Date().toISOString();
      updateData.publishedBy = userId;
    }

    const [updatedContent] = await db
      .update(dynamicContent)
      .set(updateData)
      .where(eq(dynamicContent.id, id))
      .returning();

    return {
      ...updatedContent,
      tags: updatedContent.tags ? JSON.parse(updatedContent.tags) : [],
      content: JSON.parse(updatedContent.content),
    };
  }

  async removeDynamicContent(userId: string, id: string) {
    // Check if content exists
    const [existingContent] = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.id, id));

    if (!existingContent) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    await db.delete(dynamicContent).where(eq(dynamicContent.id, id));
    
    return { message: 'Dynamic content deleted successfully' };
  }

  async publishContent(userId: string, id: string) {
    const [updatedContent] = await db
      .update(dynamicContent)
      .set({ 
        status: ContentStatus.PUBLISHED,
        publishedBy: userId,
        publishedAt: new Date().toISOString()
      })
      .where(eq(dynamicContent.id, id))
      .returning();

    if (!updatedContent) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    return {
      ...updatedContent,
      tags: updatedContent.tags ? JSON.parse(updatedContent.tags) : [],
      content: JSON.parse(updatedContent.content),
    };
  }

  async archiveContent(userId: string, id: string) {
    const [updatedContent] = await db
      .update(dynamicContent)
      .set({ 
        status: ContentStatus.ARCHIVED,
        isActive: false
      })
      .where(eq(dynamicContent.id, id))
      .returning();

    if (!updatedContent) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    return {
      ...updatedContent,
      tags: updatedContent.tags ? JSON.parse(updatedContent.tags) : [],
      content: JSON.parse(updatedContent.content),
    };
  }

  async duplicateContent(userId: string, id: string, newTitle: string) {
    const [existingContent] = await db
      .select()
      .from(dynamicContent)
      .where(eq(dynamicContent.id, id));

    if (!existingContent) {
      throw new NotFoundException(`Dynamic content with ID ${id} not found`);
    }

    const duplicatedContent = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: existingContent.description,
      type: existingContent.type,
      content: existingContent.content,
      status: ContentStatus.DRAFT,
      version: '1.0',
      isActive: true,
      language: existingContent.language,
      tags: existingContent.tags,
      createdBy: userId,
    };

    const [newContent] = await db.insert(dynamicContent).values(duplicatedContent).returning();
    
    return {
      ...newContent,
      tags: newContent.tags ? JSON.parse(newContent.tags) : [],
      content: JSON.parse(newContent.content),
    };
  }

  async getContentStats(userId: string) {
    const allContent = await db.select().from(dynamicContent);
    
    const stats = {
      total: allContent.length,
      byType: {
        pricing: 0,
        navbar: 0,
        hero: 0,
        rules: 0,
        regulations: 0,
        footer: 0,
        terms: 0,
        privacy: 0,
      },
      byStatus: {
        draft: 0,
        published: 0,
        archived: 0,
      },
      byLanguage: {},
    };

    allContent.forEach(content => {
      stats.byType[content.type]++;
      stats.byStatus[content.status]++;
      stats.byLanguage[content.language] = (stats.byLanguage[content.language] || 0) + 1;
    });

    return stats;
  }

  async searchContent(userId: string, searchTerm: string, type?: ContentType) {
    let query = db.select().from(dynamicContent);
    
    const conditions: SQL[] = [
      like(dynamicContent.title, `%${searchTerm}%`)
    ];
    
    if (type) {
      conditions.push(eq(dynamicContent.type, type));
    }
    
    const results = await query
      .where(and(...conditions))
      .orderBy(desc(dynamicContent.updatedAt));
    
    return results.map(content => ({
      ...content,
      tags: content.tags ? JSON.parse(content.tags) : [],
      content: JSON.parse(content.content),
    }));
  }

  // Specific methods for different content types
  async getPricingPlans(language: string = 'en') {
    try {
      const content = await this.findActiveContentByType(ContentType.PRICING, language);
      return content.content;
    } catch (error) {
      // Return default pricing if no content found
      return {
        plans: [
          {
            name: "Free",
            price: 0,
            currency: "USD",
            billingCycle: "monthly",
            features: ["Basic features", "Limited storage", "Community support"],
            buttonText: "Get Started",
            buttonUrl: "/signup"
          },
          {
            name: "Pro",
            price: 29,
            currency: "USD",
            billingCycle: "monthly",
            features: ["All Free features", "Advanced features", "Priority support", "Unlimited storage"],
            isPopular: true,
            buttonText: "Start Free Trial",
            buttonUrl: "/signup?plan=pro"
          },
          {
            name: "Enterprise",
            price: 99,
            currency: "USD",
            billingCycle: "monthly",
            features: ["All Pro features", "Custom integrations", "Dedicated support", "SLA guarantee"],
            buttonText: "Contact Sales",
            buttonUrl: "/contact"
          }
        ]
      };
    }
  }

  async getNavbarContent(language: string = 'en') {
    try {
      const content = await this.findActiveContentByType(ContentType.NAVBAR, language);
      return content.content;
    } catch (error) {
      // Return default navbar if no content found
      return {
        logo: {
          text: "YourApp",
          url: "/"
        },
        items: [
          { label: "Home", url: "/" },
          { label: "Features", url: "/features" },
          { label: "Pricing", url: "/pricing" },
          { label: "About", url: "/about" },
          { label: "Contact", url: "/contact" }
        ],
        cta: {
          text: "Get Started",
          url: "/signup"
        }
      };
    }
  }

  async getHeroContent(language: string = 'en') {
    try {
      const content = await this.findActiveContentByType(ContentType.HERO, language);
      return content.content;
    } catch (error) {
      // Return default hero if no content found
      return {
        title: "Welcome to YourApp",
        subtitle: "The best solution for your needs",
        description: "Transform your workflow with our powerful platform. Get started today and see the difference.",
        primaryButtonText: "Get Started",
        primaryButtonUrl: "/signup",
        secondaryButtonText: "Learn More",
        secondaryButtonUrl: "/features",
        highlights: [
          "Easy to use",
          "Powerful features",
          "24/7 support"
        ]
      };
    }
  }

  async getRulesContent(language: string = 'en') {
    try {
      const content = await this.findActiveContentByType(ContentType.RULES, language);
      return content.content;
    } catch (error) {
      // Return default rules if no content found
      return {
        title: "Platform Rules",
        description: "Please follow these rules to ensure a positive experience for all users.",
        rules: [
          {
            title: "Be Respectful",
            description: "Treat all users with respect and kindness.",
            category: "Behavior",
            order: 1
          },
          {
            title: "No Spam",
            description: "Do not post spam or irrelevant content.",
            category: "Content",
            order: 2
          },
          {
            title: "Follow Guidelines",
            description: "Follow all platform guidelines and terms of service.",
            category: "General",
            order: 3
          }
        ]
      };
    }
  }

  async getRegulationsContent(language: string = 'en') {
    try {
      const content = await this.findActiveContentByType(ContentType.REGULATIONS, language);
      return content.content;
    } catch (error) {
      // Return default regulations if no content found
      return {
        title: "Platform Regulations",
        description: "These regulations govern the use of our platform and services.",
        regulations: [
          {
            title: "Data Protection",
            description: "We are committed to protecting your data and privacy.",
            section: "Privacy",
            order: 1
          },
          {
            title: "Content Standards",
            description: "All content must meet our community standards.",
            section: "Content",
            order: 2
          },
          {
            title: "Service Usage",
            description: "Use our services responsibly and in accordance with our terms.",
            section: "Usage",
            order: 3
          }
        ]
      };
    }
  }
} 