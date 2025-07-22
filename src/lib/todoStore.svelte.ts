import type { Todo, TodoFilter, TodoSort } from './types';

class TodoStore {
  private todos = $state<Todo[]>([]);
  private filter = $state<TodoFilter>('all');
  private sort = $state<TodoSort>('createdAt');

  get allTodos() {
    return this.todos;
  }

  get filteredTodos() {
    return this.todos.filter(todo => {
      if (this.filter === 'all') return true;
      return todo.status === this.filter;
    }).sort((a, b) => {
      switch (this.sort) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updatedAt':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });
  }

  get currentFilter() {
    return this.filter;
  }

  get currentSort() {
    return this.sort;
  }

  get stats() {
    return {
      total: this.todos.length,
      pending: this.todos.filter(t => t.status === 'pending').length,
      inProgress: this.todos.filter(t => t.status === 'in_progress').length,
      completed: this.todos.filter(t => t.status === 'completed').length
    };
  }

  addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.todos.push(newTodo);
    this.saveToStorage();
  }

  updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        ...updates,
        updatedAt: new Date()
      };
      this.saveToStorage();
    }
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToStorage();
  }

  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  setSort(sort: TodoSort) {
    this.sort = sort;
  }

  private saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('todos');
      if (stored) {
        this.todos = JSON.parse(stored);
      }
    }
  }
}

export const todoStore = new TodoStore();