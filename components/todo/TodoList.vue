<!-- components/todo/TodoList.vue -->
<template>
    <div>
      <!-- Debug information -->
      <div class="mb-4 p-2 bg-gray-100 rounded">
        <p>Debug info:</p>
        <p>Todos count: {{ todos.length }}</p>
        <p>isLoading: {{ isLoading }}</p>
        <p>Has error: {{ error ? 'Yes' : 'No' }}</p>
      </div>
      
      <div v-if="isLoading && !todos.length" class="text-center my-4">
        Loading...
      </div>
      
      <div v-else-if="!todos.length" class="text-center my-4">
        No tasks available. Add your first task!
      </div>
      
      <div v-else>
        <h2 class="text-lg font-semibold mb-3">Your Tasks</h2>
        
        <div>
          <div v-for="todo in todos" :key="todo.id" class="mb-2">
            <TodoItem
              :todo="todo"
              @toggle-complete="toggleTodoComplete"
              @delete="deleteTodo"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    todos: {
      type: Array,
      required: true,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  });
  
  const emit = defineEmits(['refresh', 'toggle-complete', 'delete']);
  
  function toggleTodoComplete(id) {
    emit('toggle-complete', id);
  }
  
  function deleteTodo(id) {
    emit('delete', id);
  }
  </script>