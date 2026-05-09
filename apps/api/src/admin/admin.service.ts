import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AdminService {
  async getDashboardStats() {
    const totalUsers = await prisma.user.count();
    const totalTasks = await prisma.task.count();
    const totalSubmissions = await prisma.submission.count();

    return {
      totalUsers,
      totalTasks,
      totalSubmissions,
    };
  }

  async listUsers() {
    return prisma.user.findMany({
      include: { profile: true },
    });
  }
}
