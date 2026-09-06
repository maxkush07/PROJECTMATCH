'use server';

import { db } from '@/lib/db';
import { updateProfileSchema } from '@/validations/profile';
import { z } from 'zod';

export async function updateProfile(
  userId: string,
  data: z.infer<typeof updateProfileSchema>
) {
  try {
    const validated = updateProfileSchema.parse(data);

    const profile = await db.profile.update({
      where: { userId },
      data: validated,
      include: {
        user: true,
      },
    });

    return {
      success: true,
      profile,
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
      error: 'Failed to update profile',
    };
  }
}

export async function addUserSkill(
  userId: string,
  skillId: string,
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT',
  yearsExperience: number = 0
) {
  try {
    const userSkill = await db.userSkill.create({
      data: {
        userId,
        skillId,
        level,
        yearsExperience,
      },
      include: {
        skill: true,
      },
    });

    return {
      success: true,
      userSkill,
    };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        success: false,
        error: 'Skill already added',
      };
    }
    return {
      success: false,
      error: 'Failed to add skill',
    };
  }
}

export async function removeUserSkill(userId: string, skillId: string) {
  try {
    await db.userSkill.delete({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to remove skill',
    };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    return profile;
  } catch (error) {
    return null;
  }
}

export async function getUserSkills(userId: string) {
  try {
    const skills = await db.userSkill.findMany({
      where: { userId },
      include: {
        skill: true,
      },
    });

    return skills;
  } catch (error) {
    return [];
  }
}

export async function getAllSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: {
        category: 'asc',
      },
    });

    return skills;
  } catch (error) {
    return [];
  }
}

export async function completeOnboarding(
  userId: string,
  data: {
    userType: string;
    goal: string;
    availability: string;
    experienceLevel: string;
    skillIds: string[];
  }
) {
  try {
    // Update profile with onboarding data
    await db.profile.update({
      where: { userId },
      data: {
        availability: data.availability,
        experienceLevel: data.experienceLevel,
      },
    });

    // Add skills
    for (const skillId of data.skillIds) {
      await db.userSkill.create({
        data: {
          userId,
          skillId,
          level: 'INTERMEDIATE',
          yearsExperience: 1,
        },
      }).catch(() => null);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to complete onboarding',
    };
  }
}

export async function calculateProfileCompletion(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!profile) return 0;

    let completion = 0;

    // Basic information (20%)
    if (profile.user?.name) completion += 20;

    // Bio (10%)
    if (profile.bio) completion += 10;

    // Skills (30%)
    const skills = await db.userSkill.count({
      where: { userId },
    });
    if (skills > 0) completion += 30;

    // Availability (20%)
    if (profile.availability) completion += 20;

    // Experience (20%)
    if (profile.experienceLevel) completion += 20;

    return Math.min(completion, 100);
  } catch (error) {
    return 0;
  }
}
