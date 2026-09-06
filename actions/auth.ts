'use server';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { registerSchema } from '@/validations/auth';
import { z } from 'zod';

export async function registerUser(
  data: z.infer<typeof registerSchema>
) {
  try {
    const validated = registerSchema.parse(data);

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'Email already in use',
      };
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password);

    // Create user
    const user = await db.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        passwordHash,
      },
    });

    // Create profile
    await db.profile.create({
      data: {
        userId: user.id,
      },
    });

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Validation failed',
      };
    }
    return {
      success: false,
      error: 'Registration failed',
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
