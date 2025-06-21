// src/clerk/clerkjs.service.ts
import { Injectable } from '@nestjs/common';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { ClerkUserCreatedDto } from './dto/create-clerkj.dto';
@Injectable()
export class ClerkJsService {
  private JWKS = createRemoteJWKSet(new URL(process.env.JWT_CLERK_JWKS_API!));

  async verifyToken(token: string): Promise<ClerkUserCreatedDto> {
    if (!token) throw new Error('No token provided');

    try {
      const { payload } = await jwtVerify(token, this.JWKS, {
        issuer: 'https://clerk.dev',
      });

      if (!payload.sub || !payload.email) throw new Error('Missing required Clerk fields');
      return {
        id: payload.sub,
        email: payload.email as string,
        first_name: (payload.first_name as string) ?? '',
        last_name: (payload.last_name as string) ?? '',
        username: (payload.username as string) ?? '',
        image_url: (payload.image_url as string) ?? '',
        phone_number: (payload.primary_phone_number as string) ?? '',
      };
    } catch (error) {
      throw new Error('Invalid Clerk token');
    }
  }

}
