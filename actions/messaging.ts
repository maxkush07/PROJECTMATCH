'use server';

import { db } from '@/lib/db';

// Get or create conversation
export async function getOrCreateConversation(
  userId: string,
  otherUserId: string
) {
  try {
    // Find existing conversation
    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { userAId: userId, userBId: otherUserId },
          { userAId: otherUserId, userBId: userId },
        ],
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (conversation) {
      return conversation;
    }

    // Create new conversation
    const newConversation = await db.conversation.create({
      data: {
        userAId: userId,
        userBId: otherUserId,
      },
    });

    return newConversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
}

// Send message
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
) {
  try {
    const message = await db.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Create notification
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    if (conversation) {
      const receiverId =
        conversation.userAId === senderId
          ? conversation.userBId
          : conversation.userAId;

      await createNotification(receiverId, 'MESSAGE', {
        title: 'New message',
        content: message.content.substring(0, 50),
        link: `/messages/${conversationId}`,
      });
    }

    return message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Get conversations
export async function getConversations(userId: string) {
  try {
    const conversations = await db.conversation.findMany({
      where: {
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      include: {
        userA: {
          select: { id: true, name: true, avatarUrl: true },
        },
        userB: {
          select: { id: true, name: true, avatarUrl: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return conversations;
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
}

// Get messages
export async function getMessages(
  conversationId: string,
  skip = 0,
  take = 50
) {
  try {
    const messages = await db.message.findMany({
      where: { conversationId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return messages.reverse();
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

// Mark messages as read
export async function markMessagesAsRead(
  conversationId: string,
  userId: string
) {
  try {
    await db.message.updateMany({
      where: {
        conversationId,
        NOT: { senderId: userId },
        read: false,
      },
      data: { read: true },
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}

// Create notification
export async function createNotification(
  userId: string,
  type: string,
  data: any
) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        type,
        title: data.title,
        content: data.content,
        link: data.link,
      },
    });

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

// Get notifications
export async function getNotifications(userId: string) {
  try {
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  try {
    await db.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

// Delete notification
export async function deleteNotification(notificationId: string) {
  try {
    await db.notification.delete({
      where: { id: notificationId },
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
}
