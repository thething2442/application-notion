// src/clerk/dto/clerk-user-created.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ClerkUserCreatedDto {
  @IsString()
  id: string; // Clerk User ID

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}
