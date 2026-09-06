'use server';

import { db } from '@/lib/db';
import { updateProfileSchema, type UpdateProfileInput } from '@/validations/profile';

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput
) {
  try {
    const validated = updateProfileSchema.safeParse(input);

    if (!validated.success) {
      return {
        success: false,
        error: 'Invalid input',
      };
    }

    const profile = await db.profile.update({
      where: { userId },
      data: validated.data,
    });

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: 'Failed to update profile',
    };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return profile;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

export async function getAllSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { category: 'asc' },
    });

    return skills;
  } catch (error) {
    console.error('Get skills error:', error);
    return [];
  }
}

export async function getUserSkills(userId: string) {
  try {
    const skills = await db.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });

    return skills;
  } catch (error) {
    console.error('Get user skills error:', error);
    return [];
  }
}

export async function addUserSkill(
  userId: string,
  skillId: string,
  level: string = 'INTERMEDIATE'
) {
  try {
    const userSkill = await db.userSkill.upsert({
      where: {
        userId_skillId: { userId, skillId },
      },
      update: { level },
      create: { userId, skillId, level },
    });

    return {
      success: true,
      userSkill,
    };
  } catch (error) {
    console.error('Add user skill error:', error);
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
        userId_skillId: { userId, skillId },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Remove user skill error:', error);
    return {
      success: false,
      error: 'Failed to remove skill',
    };
  }
}

export async function completeOnboarding(
  userId: string,
  data: any
) {
  try {
    const profile = await db.profile.update({
      where: { userId },
      data: {
        availability: data.availability,
        experienceLevel: data.experienceLevel,
        userType: data.userType,
        goal: data.goal,
      },
    });

    // Add skills
    if (data.skillIds && Array.isArray(data.skillIds)) {
      await Promise.all(
        data.skillIds.map((skillId: string) =>
          addUserSkill(userId, skillId, 'INTERMEDIATE')
        )
      );
    }

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Complete onboarding error:', error);
    return {
      success: false,
      error: 'Failed to complete onboarding',
    };
  }
}
