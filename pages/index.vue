<template>
    <div>
      <div class="max-w-3xl mx-auto">
        <UCard class="mb-8 shadow-sm overflow-hidden">
          <template #header>
            <div class="flex justify-between items-center bg-gray-50 p-2">
              <h1 class="text-xl font-bold flex items-center">
                <UIcon name="i-heroicons-list-bullet" class="mr-2 text-primary" />
                MysticBoost Todo
              </h1>
              <UBadge
                :color="incompleteTodosCount > 0 ? 'primary' : 'gray'"
                :variant="incompleteTodosCount > 0 ? 'solid' : 'outline'"
                size="lg"
              >
                {{ incompleteTodosCount }} task{{ incompleteTodosCount !== 1 ? 's' : '' }} remaining
              </UBadge>
            </div>
          </template>
  
          <div class="p-4">
            <TodoForm @add-todo="addTodo" />
            
            <TodoList
              :todos="todos"
              :isLoading="isLoading"
              :error="error"
              @refresh="fetchTodos"
              @toggle-complete="toggleTodoComplete"
              @delete="deleteTodo"
            />
          </div>
        </UCard>
      </div>
    </div>
  </template>
  

<script setup lang="ts">
import { computed } from 'vue';
import TodoForm from '~/components/todo/TodoForm.vue';
import TodoList from '~/components/todo/TodoList.vue';
import { useTodos } from '~/composables/useTodos';

const {
  todos,
  isLoading,
  error,
  fetchTodos,
  addTodo,
  toggleTodoComplete,
  deleteTodo
} = useTodos();

const incompleteTodosCount = computed(() => {
  return todos.value.filter(todo => !todo.isComplete).length;
});
</script>