<script lang="ts">
  import { onMount } from 'svelte';
  import { todoStore } from './lib/todoStore.svelte';
  import TodoForm from './lib/TodoForm.svelte';
  import TodoFilters from './lib/TodoFilters.svelte';
  import TodoItem from './lib/TodoItem.svelte';
  import type { Todo } from './lib/types';
  import './app.css'
  import { Dashboard, StatsCard } from './lib/components/dashboard';
  import { Button } from './lib/components/ui/button/index.js';

  let showForm = $state(false);
  let editingTodo = $state<Todo | undefined>();
  let filteredTodos = $state<Todo[]>([]);

  onMount(() => {
    todoStore.loadFromStorage();
  });

  function handleAddTodo() {
    editingTodo = undefined;
    showForm = true;
  }

  function handleEditTodo(todo: Todo) {
    editingTodo = todo;
    showForm = true;
  }

  function handleCancelEdit() {
    editingTodo = undefined;
    showForm = false;
  }
</script>

<Dashboard 
  title="Engineer's Todo App" 
  description="Manage your engineering tasks with priorities and statuses"
>
  {#snippet actions()}
    <Button onclick={handleAddTodo}>
      Add New Todo
    </Button>
  {/snippet}

  <!-- Stats Dashboard -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard 
      title="Total Tasks" 
      value={todoStore.stats.total}
      description="All tasks in the system"
    />
    <StatsCard 
      title="Pending" 
      value={todoStore.stats.pending}
      description="Tasks waiting to be started"
    />
    <StatsCard 
      title="In Progress" 
      value={todoStore.stats.inProgress}
      description="Tasks currently being worked on"
    />
    <StatsCard 
      title="Completed" 
      value={todoStore.stats.completed}
      description="Tasks that are finished"
    />
  </div>

  {#if showForm}
    <div class="mb-8">
      <TodoForm {editingTodo} onCancel={handleCancelEdit} />
    </div>
  {/if}

  <div class="mb-8">
    <TodoFilters bind:filteredTodos />
  </div>

  <div class="space-y-4">
    {#each filteredTodos as todo (todo.id)}
      <TodoItem {todo} onEdit={handleEditTodo} />
    {:else}
      <div class="text-center py-12">
        <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
        <p class="text-gray-500 mb-4">Get started by adding your first todo!</p>
        <Button onclick={handleAddTodo}>
          Add Your First Todo
        </Button>
      </div>
    {/each}
  </div>
</Dashboard>

