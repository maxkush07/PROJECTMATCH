'use server';

import { db } from '@/lib/db';

// Get user for public profile
export async function getPublicProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            location: true,
            website: true,
            twitter: true,
            github: true,
            linkedin: true,
            experienceLevel: true,
            userType: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        _count: {
          select: {
            skills: true,
            connectedBy: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting public profile:', error);
    return null;
  }
}

// Share profile
export async function shareProfile(
  userId: string,
  platform: string
) {
  try {
    const profileUrl = `${process.env.NEXTAUTH_URL}/profile/${userId}`;
    const shareText = 'Check out my profile on ProjectMatch!';

    const shareUrls = {
      TWITTER: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`,
      LINKEDIN: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      FACEBOOK: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      GITHUB: `https://github.com/search?q=${encodeURIComponent(profileUrl)}`,
    };

    return {
      success: true,
      url: shareUrls[platform as keyof typeof shareUrls] || profileUrl,
    };
  } catch (error) {
    console.error('Error sharing profile:', error);
    return {
      success: false,
      error: 'Failed to share profile',
    };
  }
}

// Update SEO metadata
export async function generateProfileSEO(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        skills: {
          include: { skill: true },
        },
      },
    });

    if (!user) return null;

    return {
      title: `${user.name} - ProjectMatch`,
      description: user.profile?.bio || `${user.name}'s profile on ProjectMatch`,
      keywords: [
        'ProjectMatch',
        user.name,
        user.profile?.userType,
        ...user.skills.map((s) => s.skill.name),
      ],
      image: user.avatarUrl,
    };
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    return null;
  }
}
