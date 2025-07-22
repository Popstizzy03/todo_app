<script lang="ts">
  import { todoStore } from './todoStore.svelte';
  import type { TodoFilter, TodoSort } from './types';
  import { Button } from '../lib/components/ui/button/index.js';

  let searchTerm = $state('');
  let filteredTodos = $derived(() => {
    if (!searchTerm.trim()) return todoStore.filteredTodos;
    
    const term = searchTerm.toLowerCase();
    return todoStore.filteredTodos.filter(todo => 
      todo.title.toLowerCase().includes(term) ||
      todo.description.toLowerCase().includes(term) ||
      todo.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  function handleFilterChange(filter: TodoFilter) {
    todoStore.setFilter(filter);
  }

  function handleSortChange(sort: TodoSort) {
    todoStore.setSort(sort);
  }

  export { filteredTodos };
</script>

<div class="filters-container">
  <div class="stats">
    <div class="stat">
      <span class="stat-number">{todoStore.stats.total}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat">
      <span class="stat-number">{todoStore.stats.pending}</span>
      <span class="stat-label">Pending</span>
    </div>
    <div class="stat">
      <span class="stat-number">{todoStore.stats.inProgress}</span>
      <span class="stat-label">In Progress</span>
    </div>
    <div class="stat">
      <span class="stat-number">{todoStore.stats.completed}</span>
      <span class="stat-label">Completed</span>
    </div>
  </div>

  <div class="search-box">
    <input
      type="text"
      placeholder="Search todos..."
      bind:value={searchTerm}
      class="search-input"
    />
  </div>

  <div class="filter-controls">
    <div class="filter-group">
      <label for="filter-buttons">Filter by status:</label>
      <div class="filter-buttons" id="filter-buttons" role="group" aria-labelledby="filter-buttons">
        <Button
          size="sm"
          variant={todoStore.currentFilter === 'all' ? 'default' : 'outline'}
          onclick={() => handleFilterChange('all')}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={todoStore.currentFilter === 'pending' ? 'default' : 'outline'}
          onclick={() => handleFilterChange('pending')}
        >
          Pending
        </Button>
        <Button
          size="sm"
          variant={todoStore.currentFilter === 'in_progress' ? 'default' : 'outline'}
          onclick={() => handleFilterChange('in_progress')}
        >
          In Progress
        </Button>
        <Button
          size="sm"
          variant={todoStore.currentFilter === 'completed' ? 'default' : 'outline'}
          onclick={() => handleFilterChange('completed')}
        >
          Completed
        </Button>
      </div>
    </div>

    <div class="sort-group">
      <label for="sort">Sort by:</label>
      <select
        id="sort"
        value={todoStore.currentSort}
        onchange={(e) => handleSortChange(e.target.value as TodoSort)}
      >
        <option value="createdAt">Created Date</option>
        <option value="updatedAt">Updated Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  </div>
</div>

<style>
  .filters-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat {
    text-align: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .search-box {
    margin-bottom: 1.5rem;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .filter-controls {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .filter-group {
    flex: 1;
    min-width: 300px;
  }

  .sort-group {
    flex: 0 0 200px;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }

  .filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }


  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background: white;
    box-sizing: border-box;
  }

  select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  @media (max-width: 768px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .filter-controls {
      flex-direction: column;
      gap: 1rem;
    }

    .filter-group {
      min-width: auto;
    }

    .sort-group {
      flex: 1;
    }
  }
</style>