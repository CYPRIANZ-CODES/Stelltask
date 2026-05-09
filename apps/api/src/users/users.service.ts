import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async updateProfile(userId: string, data: any) {
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  }

  async linkStellarWallet(userId: string, publicKey: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { stellarPublicKey: publicKey },
    });
  }
}
