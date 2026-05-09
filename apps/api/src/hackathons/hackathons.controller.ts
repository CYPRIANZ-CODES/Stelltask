import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async create(@Request() req, @Body() dto: any) {
    return this.hackathonsService.createHackathon(req.user.userId, dto);
  }

  @Get()
  async list(@Query() filters: any) {
    return this.hackathonsService.listHackathons(filters);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.hackathonsService.getHackathon(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async update(@Param('id') id: string, @Request() req, @Body() dto: any) {
    // Implementation would update hackathon (organizer only, DRAFT only)
    return { message: 'Update endpoint to be implemented' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async delete(@Param('id') id: string, @Request() req) {
    // Implementation would cancel hackathon (organizer only)
    return { message: 'Delete endpoint to be implemented' };
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async publish(@Param('id') id: string, @Request() req) {
    return this.hackathonsService.publishHackathon(id, req.user.userId);
  }

  @Post(':id/fund')
  @UseGuards(JwtAuthGuard)
  async confirmFunding(@Param('id') id: string, @Body() dto: { txHash: string }) {
    return this.hackathonsService.confirmFunding(id, dto.txHash);
  }

  @Get(':id/projects')
  async getProjects(@Param('id') id: string) {
    return this.hackathonsService.getHackathonProjects(id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  async register(@Param('id') id: string, @Request() req) {
    return this.hackathonsService.registerParticipant(id, req.user.userId);
  }

  @Delete(':id/register')
  @UseGuards(JwtAuthGuard)
  async withdraw(@Param('id') id: string, @Request() req) {
    // Implementation would withdraw registration
    return { message: 'Withdraw endpoint to be implemented' };
  }

  @Post(':id/projects')
  @UseGuards(JwtAuthGuard)
  async submitProject(@Param('id') id: string, @Request() req, @Body() dto: any) {
    return this.hackathonsService.submitProject(req.user.userId, id, dto);
  }

  @Patch(':id/projects/:projectId')
  @UseGuards(JwtAuthGuard)
  async updateProject(@Param('id') id: string, @Param('projectId') projectId: string, @Request() req, @Body() dto: any) {
    // Implementation would update project (before submission deadline)
    return { message: 'Update project endpoint to be implemented' };
  }

  @Post(':id/judges')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async addJudge(@Param('id') id: string, @Request() req, @Body() dto: { judgeId: string }) {
    return this.hackathonsService.addJudge(id, req.user.userId, dto.judgeId);
  }

  @Delete(':id/judges/:judgeId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async removeJudge(@Param('id') id: string, @Param('judgeId') judgeId: string, @Request() req) {
    // Implementation would remove judge
    return { message: 'Remove judge endpoint to be implemented' };
  }

  @Post(':id/projects/:projectId/review')
  @UseGuards(JwtAuthGuard)
  async reviewProject(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @Request() req,
    @Body() dto: any
  ) {
    return this.hackathonsService.reviewProject(req.user.userId, projectId, dto);
  }

  @Get(':id/projects/:projectId/reviews')
  @UseGuards(JwtAuthGuard)
  async getProjectReviews(@Param('id') id: string, @Param('projectId') projectId: string) {
    // Implementation would get all reviews for project
    return { message: 'Get reviews endpoint to be implemented' };
  }

  @Post(':id/calculate-winners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async calculateWinners(@Param('id') id: string) {
    return this.hackathonsService.calculateWinners(id);
  }

  @Post(':id/announce-winners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TASK_OWNER, Role.ADMIN)
  async announceWinners(@Param('id') id: string, @Request() req) {
    return this.hackathonsService.announceWinners(id, req.user.userId);
  }
}
