import { PartialType } from '@nestjs/mapped-types';
import { ClerkUserCreatedDto } from './create-clerkj.dto';

export class UpdateClerkjDto extends PartialType(ClerkUserCreatedDto) {}
