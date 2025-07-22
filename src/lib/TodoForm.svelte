<script lang="ts">
  import { todoStore } from './todoStore.svelte';
  import type { Todo } from './types';
  import { Button } from '../lib/components/ui/button/index.js';

  type Props = {
    editingTodo?: Todo;
    onCancel?: () => void;
  };

  let { editingTodo, onCancel }: Props = $props();

  let title = $state(editingTodo?.title || '');
  let description = $state(editingTodo?.description || '');
  let priority = $state<'low' | 'medium' | 'high'>(editingTodo?.priority || 'medium');
  let status = $state<'pending' | 'in_progress' | 'completed'>(editingTodo?.status || 'pending');
  let tags = $state(editingTodo?.tags.join(', ') || '');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    if (editingTodo) {
      todoStore.updateTodo(editingTodo.id, todoData);
    } else {
      todoStore.addTodo(todoData);
    }

    resetForm();
    onCancel?.();
  }

  function resetForm() {
    title = '';
    description = '';
    priority = 'medium';
    status = 'pending';
    tags = '';
  }
</script>

<form onsubmit={handleSubmit} class="todo-form">
  <h3>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h3>
  
  <div class="form-group">
    <label for="title">Title *</label>
    <input
      id="title"
      type="text"
      bind:value={title}
      placeholder="Enter todo title"
      required
    />
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      bind:value={description}
      placeholder="Enter todo description"
      rows="3"
    ></textarea>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="priority">Priority</label>
      <select id="priority" bind:value={priority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div class="form-group">
      <label for="status">Status</label>
      <select id="status" bind:value={status}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="tags">Tags (comma-separated)</label>
    <input
      id="tags"
      type="text"
      bind:value={tags}
      placeholder="feature, bug, urgent"
    />
  </div>

  <div class="form-actions">
    <Button type="submit">
      {editingTodo ? 'Update' : 'Add'} Todo
    </Button>
    {#if editingTodo}
      <Button type="button" variant="outline" onclick={onCancel}>
        Cancel
      </Button>
    {/if}
  </div>
</form>

<style>
  .todo-form {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .todo-form h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

</style>