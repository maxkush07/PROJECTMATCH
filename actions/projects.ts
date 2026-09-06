'use server';

import { db } from '@/lib/db';

// Create project
export async function createProject(
  createdBy: string,
  data: {
    title: string;
    description: string;
    status?: string;
    targetRoles?: string[];
  }
) {
  try {
    const project = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || 'IDEATION',
        createdBy,
        members: {
          create: [
            {
              userId: createdBy,
              role: 'FOUNDER',
            },
          ],
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      project,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      success: false,
      error: 'Failed to create project',
    };
  }
}

// Get user projects
export async function getUserProjects(userId: string) {
  try {
    const projects = await db.project.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        tasks: {
          where: {
            status: { not: 'DONE' },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return projects;
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
}

// Create task
export async function createTask(
  projectId: string,
  data: {
    title: string;
    description?: string;
    assignedTo?: string;
    dueDate?: Date;
    priority?: string;
  }
) {
  try {
    const task = await db.task.create({
      data: {
        projectId,
        ...data,
        status: 'TODO',
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return {
      success: true,
      task,
    };
  } catch (error) {
    console.error('Error creating task:', error);
    return {
      success: false,
      error: 'Failed to create task',
    };
  }
}

// Get project tasks
export async function getProjectTasks(projectId: string) {
  try {
    const tasks = await db.task.findMany({
      where: { projectId },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
}

// Update task status
export async function updateTaskStatus(
  taskId: string,
  status: string
) {
  try {
    const task = await db.task.update({
      where: { id: taskId },
      data: { status },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      success: true,
      task,
    };
  } catch (error) {
    console.error('Error updating task status:', error);
    return {
      success: false,
      error: 'Failed to update task status',
    };
  }
}

// Schedule meeting
export async function scheduleMeeting(
  projectId: string,
  data: {
    title: string;
    description?: string;
    scheduledAt: Date;
    duration: number; // minutes
    participants: string[];
  }
) {
  try {
    const meeting = await db.meeting.create({
      data: {
        projectId,
        ...data,
        status: 'PENDING',
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return {
      success: true,
      meeting,
    };
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    return {
      success: false,
      error: 'Failed to schedule meeting',
    };
  }
}
