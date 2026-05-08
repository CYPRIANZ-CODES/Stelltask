import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  @Get()
  async findAll() {
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { id, title: 'Mock Task', status: TaskStatus.OPEN };
  }
}
