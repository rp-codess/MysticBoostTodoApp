<!-- components/todo/TodoItem.vue -->
<template>
    <div 
      :class="[
        'p-4 mb-3 border rounded-lg flex items-center transition-all',
        todo.isComplete ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
      ]"
    >
      <UCheckbox
        :model-value="todo.isComplete"
        @update:model-value="toggleComplete"
        class="mr-3"
      />
      
      <div class="flex-grow">
        <h3 
          :class="[
            'text-base font-medium', 
            todo.isComplete ? 'text-gray-500 line-through' : 'text-gray-800'
          ]"
        >
          {{ todo.title }}
        </h3>
        <p 
          v-if="todo.description" 
          :class="['text-sm', todo.isComplete ? 'text-gray-400' : 'text-gray-600']"
        >
          {{ todo.description }}
        </p>
      </div>
      
      <UButton
        color="danger"
        variant="ghost"
        icon="i-heroicons-trash"
        size="sm"
        @click="handleDelete"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    todo: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['toggle-complete', 'delete']);
  
  function toggleComplete() {
    emit('toggle-complete', props.todo.id);
  }
  
  function handleDelete() {
    emit('delete', props.todo.id);
  }
  </script>