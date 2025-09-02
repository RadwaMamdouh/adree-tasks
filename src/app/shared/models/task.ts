export type TaskCategory = 'Dev' | 'Test' | 'UI' | 'Db';
export type TaskStatus = 'New' | 'Active' | 'Closed';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  estimatedHours: number;
  category: TaskCategory;
  status: TaskStatus;
}
