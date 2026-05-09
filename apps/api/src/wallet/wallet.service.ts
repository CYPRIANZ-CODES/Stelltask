import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Keypair, StrKey } from '@stellar-sdk/stellar-sdk';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async linkWallet(userId: string, publicKey: string) {
    // Validate Stellar public key
    if (!StrKey.isValidEd25519PublicKey(publicKey)) {
      throw new BadRequestException('Invalid Stellar public key');
    }

    // Check if public key is already linked to another user
    const existing = await this.prisma.user.findUnique({
      where: { stellarPublicKey: publicKey },
    });

    if (existing && existing.id !== userId) {
      throw new BadRequestException('This wallet is already linked to another account');
    }

    // Check if user already has a wallet linked
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.stellarPublicKey) {
      throw new BadRequestException('You already have a wallet linked. Disconnect it first.');
    }

    // Update user with public key
    return this.prisma.user.update({
      where: { id: userId },
      data: { stellarPublicKey: publicKey },
    });
  }

  async unlinkWallet(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stellarPublicKey) {
      throw new BadRequestException('No wallet linked to this account');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { stellarPublicKey: null },
    });
  }

  async getWalletInfo(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        stellarPublicKey: true,
        profile: {
          select: {
            totalEarned: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      publicKey: user.stellarPublicKey,
      totalEarned: user.profile?.totalEarned || 0,
      isLinked: !!user.stellarPublicKey,
    };
  }

  async generateChallenge(userId: string) {
    // Generate a challenge message for wallet signature verification
    const timestamp = Date.now();
    const challenge = `stelltask:link:${userId}:${timestamp}`;

    return {
      challenge,
      timestamp,
    };
  }

  async verifySignature(
    userId: string,
    publicKey: string,
    signature: string,
    challenge: string
  ) {
    try {
      // Verify the signature using Stellar SDK
      const isValid = Keypair.fromPublicKey(publicKey).verify(
        Buffer.from(challenge),
        Buffer.from(signature, 'base64')
      );

      if (!isValid) {
        throw new BadRequestException('Invalid signature');
      }

      // Link the wallet after successful verification
      return this.linkWallet(userId, publicKey);
    } catch (error) {
      throw new BadRequestException('Signature verification failed');
    }
  }

  async getBalance(publicKey: string) {
    // This would connect to Stellar Horizon to get the actual balance
    // For now, returning mock data
    return {
      publicKey,
      balance: '1000.5',
      currency: 'XLM',
    };
  }
}
