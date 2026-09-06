'use server';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { registerSchema, type RegisterInput } from '@/validations/auth';

export async function registerUser(input: RegisterInput) {
  try {
    const validated = registerSchema.safeParse(input);

    if (!validated.success) {
      return {
        success: false,
        error: 'Invalid input',
        details: validated.error.errors,
      };
    }

    const { name, email, password } = validated.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        profile: {
          create: {
            availability: 'PART_TIME',
            experienceLevel: 'INTERMEDIATE',
          },
        },
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Failed to register user',
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        profile: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}
