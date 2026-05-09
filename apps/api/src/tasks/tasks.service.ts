import { Injectable } from '@nestjs/common';
import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TasksService {
  async create(creatorId: string, data: any) {
    return prisma.task.create({
      data: {
        ...data,
        creatorId,
        status: TaskStatus.DRAFT,
      },
    });
  }

  async findAll(filters: any = {}) {
    const { status, category, difficulty, page = 1, limit = 20 } = filters;
    const where: any = {};
    
    if (status) where.status = status;
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: { creator: { include: { profile: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    return { tasks, total, page, limit };
  }

  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        creator: { include: { profile: true } },
        assignee: { include: { profile: true } },
        submissions: true,
      },
    });
  }

  async claim(taskId: string, contributorId: string) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        assigneeId: contributorId,
        status: TaskStatus.ASSIGNED,
      },
    });
  }

  async updateStatus(taskId: string, status: TaskStatus) {
    return prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
