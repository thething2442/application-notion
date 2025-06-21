// src/users/dto/create-user.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  externalId: string; // Store Clerk ID here, or generate UUID if not using Clerk

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  role?: 'user' | 'admin';

  @IsOptional()
  @IsString()
  plan?: 'free' | 'pro' | 'company';
}
