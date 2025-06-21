import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../../drizzle/schema';
import db from '../../db/db';
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  // Create a new user (Clerk user)
  async create(createUserDto: CreateUserDto) {
    try {
      // Map DTO to DB fields
      const user = await db.insert(users).values({
        id: createUserDto.externalId, // Clerk ID as PK
        email: createUserDto.email,
        name: [createUserDto.firstName, createUserDto.lastName].filter(Boolean).join(' '),
        plan: createUserDto.plan || 'free',
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  }

  // Upsert user by Clerk ID
  async createOrUpdateUser(createUserDto: CreateUserDto) {
    try {
      const existing = await db.select().from(users).where(eq(users.id, createUserDto.externalId)).get();
      if (existing) {
        // Update user
        await db.update(users).set({
          email: createUserDto.email,
          name: [createUserDto.firstName, createUserDto.lastName].filter(Boolean).join(' '),
          plan: createUserDto.plan || 'free',
        }).where(eq(users.id, createUserDto.externalId));
        return { ...existing, ...createUserDto };
      } else {
        // Create user
        return await this.create(createUserDto);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update user');
    }
  }

  // Example: return all users (for testing)
  async findAll() {
    return db.select().from(users).all();
  }

  // Example: find one user by Clerk ID
  async findOne(id: string) {
    return db.select().from(users).where(eq(users.id, id)).get();
  }

  // Example: update user by Clerk ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    return db.update(users).set(updateUserDto).where(eq(users.id, id));
  }

  // Example: remove user by Clerk ID
  async remove(id: string) {
    return db.delete(users).where(eq(users.id, id));
  }
}
