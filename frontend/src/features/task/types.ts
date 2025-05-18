
type CreatedBy = {
  id: string;
  name: string;
  createdAt: string;
}

type Assignment = {
  taskId: number;
  userId: string;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'waiting' | 'inprogress' | 'test' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  projectId: number;
  createdById: string;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;

  assingments: Assignment[];
}

export type Response = {
  message: string;
  data: Task[];
}
