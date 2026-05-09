import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('link')
  async linkWallet(@Request() req, @Body() dto: { publicKey: string }) {
    return this.walletService.linkWallet(req.user.userId, dto.publicKey);
  }

  @Delete('unlink')
  async unlinkWallet(@Request() req) {
    return this.walletService.unlinkWallet(req.user.userId);
  }

  @Get('info')
  async getWalletInfo(@Request() req) {
    return this.walletService.getWalletInfo(req.user.userId);
  }

  @Post('challenge')
  async generateChallenge(@Request() req) {
    return this.walletService.generateChallenge(req.user.userId);
  }

  @Post('verify')
  async verifySignature(
    @Request() req,
    @Body() dto: { publicKey: string; signature: string; challenge: string }
  ) {
    return this.walletService.verifySignature(
      req.user.userId,
      dto.publicKey,
      dto.signature,
      dto.challenge
    );
  }

  @Get('balance/:publicKey')
  async getBalance(@Param('publicKey') publicKey: string) {
    return this.walletService.getBalance(publicKey);
  }
}
