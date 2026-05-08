export interface User {
  id: string;
  email: string;
  role: 'CONTRIBUTOR' | 'TASK_OWNER' | 'ADMIN';
  stellarPublicKey?: string;
  trustScore: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  rewardXLM: number;
  status: TaskStatus;
}

export type TaskStatus = 
  | 'DRAFT' 
  | 'FUNDING' 
  | 'OPEN' 
  | 'ASSIGNED' 
  | 'IN_REVIEW' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'DISPUTED';
