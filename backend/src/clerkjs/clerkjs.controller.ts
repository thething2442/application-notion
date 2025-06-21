// src/clerk/clerk.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ClerkUserCreatedDto } from './dto/create-clerkj.dto'; // external DTO
import { CreateUserDto } from '../users/dto/create-user.dto'; // internal DTO
import { UsersService } from '../users/users.service';

@Controller('clerk')
export class ClerkController {
  constructor(private readonly usersService: UsersService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    if (body.type === 'user.created') {
      const data = body.data;

      const clerkUser: ClerkUserCreatedDto = {
        id: data.id,
        email: data.email_addresses[0]?.email_address,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        image_url: data.image_url,
        phone_number: data.phone_numbers?.[0]?.phone_number,
      };

      const createUserDto: CreateUserDto = {
        externalId: clerkUser.id,
        email: clerkUser.email,
        firstName: clerkUser.first_name,
        lastName: clerkUser.last_name,
        role: 'user',
        plan: 'free',
      };

      await this.usersService.create(createUserDto);
    }

    return { ok: true };
  }
}
