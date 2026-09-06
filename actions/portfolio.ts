'use server';

import { db } from '@/lib/db';

// Create portfolio item
export async function createPortfolioItem(
  userId: string,
  data: {
    title: string;
    description?: string;
    type: string;
    imageUrl?: string;
    projectUrl?: string;
    technologies?: string[];
  }
) {
  try {
    const item = await db.portfolioItem.create({
      data: {
        userId,
        ...data,
      },
    });

    return {
      success: true,
      item,
    };
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return {
      success: false,
      error: 'Failed to create portfolio item',
    };
  }
}

// Get user portfolio
export async function getUserPortfolio(userId: string) {
  try {
    const items = await db.portfolioItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return items;
  } catch (error) {
    console.error('Error getting portfolio:', error);
    return [];
  }
}

// Update portfolio item
export async function updatePortfolioItem(
  itemId: string,
  data: any
) {
  try {
    const item = await db.portfolioItem.update({
      where: { id: itemId },
      data,
    });

    return {
      success: true,
      item,
    };
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return {
      success: false,
      error: 'Failed to update portfolio item',
    };
  }
}

// Delete portfolio item
export async function deletePortfolioItem(itemId: string) {
  try {
    await db.portfolioItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return {
      success: false,
      error: 'Failed to delete portfolio item',
    };
  }
}

// Create review
export async function createReview(
  reviewerId: string,
  revieweeId: string,
  data: {
    rating: number;
    title: string;
    content: string;
    categories?: Record<string, number>;
  }
) {
  try {
    const review = await db.review.create({
      data: {
        reviewerId,
        revieweeId,
        ...data,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId: revieweeId,
        type: 'REVIEW_RECEIVED',
        title: 'You received a new review',
        content: `${review.reviewer.name} left a ${review.rating}-star review`,
        link: `/profile/${reviewerId}`,
      },
    });

    return {
      success: true,
      review,
    };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      success: false,
      error: 'Failed to create review',
    };
  }
}

// Get user reviews
export async function getUserReviews(userId: string) {
  try {
    const reviews = await db.review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return {
      reviews,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    };
  } catch (error) {
    console.error('Error getting reviews:', error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }
}
