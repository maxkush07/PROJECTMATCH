import { z } from 'zod';
import { Availability, ExperienceLevel, UserType, Goal } from '@prisma/client';

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  headline: z.string().max(120).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  availability: z.nativeEnum(Availability).optional(),
  experienceLevel: z.nativeEnum(ExperienceLevel).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const onboardingSchema = z.object({
  userType: z.nativeEnum(UserType),
  goal: z.nativeEnum(Goal),
  skillIds: z.array(z.string()).min(1, 'Select at least one skill'),
  availability: z.nativeEnum(Availability),
  experienceLevel: z.nativeEnum(ExperienceLevel),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
