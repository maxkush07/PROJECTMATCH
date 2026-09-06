import { z } from 'zod';

export const updateProfileSchema = z.object({
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  availability: z.enum(['FULL_TIME', 'PART_TIME', 'WEEKENDS']).optional(),
  experienceLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
