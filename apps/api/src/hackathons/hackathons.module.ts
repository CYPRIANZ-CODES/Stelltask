import { Module } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  controllers: [HackathonsController],
  providers: [HackathonsService, PrismaService],
  exports: [HackathonsService],
})
export class HackathonsModule {}
