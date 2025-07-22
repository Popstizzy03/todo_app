<script lang="ts">
  import { todoStore } from './todoStore.svelte';
  import type { Todo } from './types';
  import { Button } from '../lib/components/ui/button/index.js';

  type Props = {
    todo: Todo;
    onEdit: (todo: Todo) => void;
  };

  let { todo, onEdit }: Props = $props();

  function handleStatusChange(newStatus: 'pending' | 'in_progress' | 'completed') {
    todoStore.updateTodo(todo.id, { status: newStatus });
  }

  function handleDelete() {
    if (confirm('Are you sure you want to delete this todo?')) {
      todoStore.deleteTodo(todo.id);
    }
  }

  function getPriorityClass(priority: string) {
    return `priority-${priority}`;
  }

  function getStatusClass(status: string) {
    return `status-${status.replace('_', '-')}`;
  }
</script>

<div class="todo-item {getPriorityClass(todo.priority)} {getStatusClass(todo.status)}">
  <div class="todo-header">
    <h4 class="todo-title">{todo.title}</h4>
    <div class="todo-meta">
      <span class="priority-badge priority-{todo.priority}">{todo.priority}</span>
      <span class="status-badge status-{todo.status.replace('_', '-')}">{todo.status.replace('_', ' ')}</span>
    </div>
  </div>

  {#if todo.description}
    <p class="todo-description">{todo.description}</p>
  {/if}

  {#if todo.tags.length > 0}
    <div class="todo-tags">
      {#each todo.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  {/if}

  <div class="todo-dates">
    <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
    <small>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</small>
  </div>

  <div class="todo-actions">
    <div class="status-actions">
      <Button
        size="sm"
        variant={todo.status === 'pending' ? 'default' : 'outline'}
        onclick={() => handleStatusChange('pending')}
      >
        Pending
      </Button>
      <Button
        size="sm"
        variant={todo.status === 'in_progress' ? 'default' : 'outline'}
        onclick={() => handleStatusChange('in_progress')}
      >
        In Progress
      </Button>
      <Button
        size="sm"
        variant={todo.status === 'completed' ? 'default' : 'outline'}
        onclick={() => handleStatusChange('completed')}
      >
        Completed
      </Button>
    </div>

    <div class="item-actions">
      <Button size="sm" variant="secondary" onclick={() => onEdit(todo)}>
        Edit
      </Button>
      <Button size="sm" variant="destructive" onclick={handleDelete}>
        Delete
      </Button>
    </div>
  </div>
</div>

<style>
  .todo-item {
    background: white;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #ddd;
    transition: all 0.2s;
  }

  .todo-item:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .todo-item.priority-high {
    border-left-color: #dc3545;
  }

  .todo-item.priority-medium {
    border-left-color: #ffc107;
  }

  .todo-item.priority-low {
    border-left-color: #28a745;
  }

  .todo-item.status-completed {
    opacity: 0.7;
  }

  .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .todo-title {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
  }

  .todo-meta {
    display: flex;
    gap: 0.5rem;
  }

  .priority-badge, .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .priority-badge.priority-high {
    background-color: #dc3545;
    color: white;
  }

  .priority-badge.priority-medium {
    background-color: #ffc107;
    color: #212529;
  }

  .priority-badge.priority-low {
    background-color: #28a745;
    color: white;
  }

  .status-badge.status-pending {
    background-color: #6c757d;
    color: white;
  }

  .status-badge.status-in-progress {
    background-color: #007bff;
    color: white;
  }

  .status-badge.status-completed {
    background-color: #28a745;
    color: white;
  }

  .todo-description {
    margin: 0 0 1rem 0;
    color: #666;
    line-height: 1.5;
  }

  .todo-tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .tag {
    background-color: #f8f9fa;
    color: #495057;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    border: 1px solid #dee2e6;
  }

  .todo-dates {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    color: #999;
  }

  .todo-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .status-actions {
    display: flex;
    gap: 0.5rem;
  }

  .item-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }

  .btn-outline {
    background-color: transparent;
    border: 1px solid #dee2e6;
    color: #6c757d;
  }

  .btn-outline:hover {
    background-color: #f8f9fa;
  }

  .btn-active {
    background-color: #007bff;
    color: white;
  }

  .btn-edit {
    background-color: #ffc107;
    color: #212529;
  }

  .btn-edit:hover {
    background-color: #e0a800;
  }

  .btn-delete {
    background-color: #dc3545;
    color: white;
  }

  .btn-delete:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    .todo-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .todo-actions {
      flex-direction: column;
      gap: 0.5rem;
    }

    .status-actions {
      justify-content: center;
    }
  }
</style>