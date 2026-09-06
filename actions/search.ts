'use server';

import { db } from '@/lib/db';

// Advanced search with filters
export async function searchUsers(
  query: string,
  filters?: {
    skills?: string[];
    availability?: string;
    experienceLevel?: string;
    location?: string;
    minMatchScore?: number;
  },
  skip = 0,
  take = 20
) {
  try {
    const users = await db.user.findMany({
      where: {
        AND: [
          query
            ? {
                OR: [
                  { name: { contains: query, mode: 'insensitive' } },
                  { profile: { bio: { contains: query, mode: 'insensitive' } } },
                ],
              }
            : {},
          filters?.availability
            ? { profile: { availability: filters.availability } }
            : {},
          filters?.experienceLevel
            ? { profile: { experienceLevel: filters.experienceLevel } }
            : {},
          filters?.location
            ? { profile: { location: { contains: filters.location, mode: 'insensitive' } } }
            : {},
          filters?.skills
            ? {
                skills: {
                  some: {
                    skillId: { in: filters.skills },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        profile: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
      skip,
      take,
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

// Save search
export async function saveSearch(
  userId: string,
  data: {
    name: string;
    query: string;
    filters?: Record<string, any>;
  }
) {
  try {
    const search = await db.savedSearch.create({
      data: {
        userId,
        ...data,
      },
    });

    return {
      success: true,
      search,
    };
  } catch (error) {
    console.error('Error saving search:', error);
    return {
      success: false,
      error: 'Failed to save search',
    };
  }
}

// Get saved searches
export async function getSavedSearches(userId: string) {
  try {
    const searches = await db.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return searches;
  } catch (error) {
    console.error('Error getting saved searches:', error);
    return [];
  }
}

// Get search suggestions
export async function getSearchSuggestions(query: string) {
  try {
    const suggestions = await db.user.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
      take: 10,
    });

    return suggestions;
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
}
