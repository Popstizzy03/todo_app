export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export type TodoFilter = 'all' | 'pending' | 'in_progress' | 'completed';
export type TodoSort = 'priority' | 'createdAt' | 'updatedAt' | 'title';