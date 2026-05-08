import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskStateMachine {
  private readonly transitions: Record<TaskStatus, TaskStatus[]> = {
    [TaskStatus.DRAFT]:     [TaskStatus.FUNDING, TaskStatus.CANCELLED],
    [TaskStatus.FUNDING]:   [TaskStatus.OPEN, TaskStatus.CANCELLED],
    [TaskStatus.OPEN]:      [TaskStatus.ASSIGNED, TaskStatus.CANCELLED],
    [TaskStatus.ASSIGNED]:  [TaskStatus.IN_REVIEW, TaskStatus.OPEN, TaskStatus.DISPUTED],
    [TaskStatus.IN_REVIEW]: [TaskStatus.COMPLETED, TaskStatus.ASSIGNED, TaskStatus.DISPUTED],
    [TaskStatus.COMPLETED]: [],
    [TaskStatus.DISPUTED]:  [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
    [TaskStatus.CANCELLED]: [],
  };

  validate(current: TaskStatus, next: TaskStatus) {
    if (!this.transitions[current].includes(next)) {
      throw new BadRequestException(`Invalid transition from ${current} to ${next}`);
    }
  }
}
