import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskStateMachine {
  private readonly transitions: Record<TaskStatus, TaskStatus[]> = {
    [TaskStatus.DRAFT]:              [TaskStatus.FUNDING, TaskStatus.CANCELLED],
    [TaskStatus.FUNDING]:            [TaskStatus.OPEN, TaskStatus.CANCELLED],
    [TaskStatus.OPEN]:               [TaskStatus.ASSIGNED, TaskStatus.CANCELLED, TaskStatus.EXPIRED],
    [TaskStatus.ASSIGNED]:           [TaskStatus.IN_REVIEW, TaskStatus.OPEN, TaskStatus.DISPUTED, TaskStatus.EXPIRED],
    [TaskStatus.IN_REVIEW]:          [TaskStatus.COMPLETED, TaskStatus.REVISION_REQUESTED, TaskStatus.DISPUTED],
    [TaskStatus.REVISION_REQUESTED]: [TaskStatus.IN_REVIEW, TaskStatus.DISPUTED, TaskStatus.EXPIRED],
    [TaskStatus.COMPLETED]:          [],
    [TaskStatus.DISPUTED]:           [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
    [TaskStatus.CANCELLED]:          [],
    [TaskStatus.EXPIRED]:            [TaskStatus.OPEN],
  };

  validate(current: TaskStatus, next: TaskStatus) {
    if (!this.transitions[current].includes(next)) {
      throw new BadRequestException(`Invalid transition from ${current} to ${next}`);
    }
  }
}
