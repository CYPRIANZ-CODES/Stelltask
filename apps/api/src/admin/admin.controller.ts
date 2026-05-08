import { Controller, Get, UseGuards, Patch, Param, Body } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  @Get('stats')
  async getStats() {
    return { message: 'Admin statistics' };
  }

  @Get('disputes')
  async listDisputes() {
    return [];
  }

  @Patch('disputes/:id/resolve')
  async resolveDispute(@Param('id') id: string, @Body() resolution: any) {
    return { id, resolved: true };
  }
}
