<script lang="ts">
  import { Button } from "../../../lib/components/ui/button/index.js";
  import { cn } from "../../../lib/utils";

  type Props = {
    title: string;
    description?: string;
    actions?: any;
    children?: any;
    class?: string;
  };

  let { title, description, actions, children, class: className }: Props = $props();
</script>

<div class={cn("flex flex-col min-h-screen bg-gray-50/50", className)}>
  <!-- Header -->
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
        {#if description}
          <p class="text-sm text-gray-500">{description}</p>
        {/if}
      </div>
      {#if actions}
        <div class="flex items-center gap-2">
          {@render actions()}
        </div>
      {/if}
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-7xl mx-auto">
      {@render children?.()}
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>