import { Controller, Post, Body, UseGuards } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Post('confirm-funding')
  async confirmFunding(@Body() dto: { taskId: string; txHash: string }) {
    return { success: true };
  }

  @Post('release')
  async release(@Body() dto: { submissionId: string }) {
    return { txHash: '...' };
  }
}
