// composables/useTodos.ts
import { ref, onMounted } from 'vue';

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  createdAt: string;
}

export function useTodos() {
  const todos = ref<Todo[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

  // Add this to your fetchTodos function in useTodos.ts
async function fetchTodos() {
  isLoading.value = true;
  error.value = null;
  
  console.log("Fetching todos from:", `${apiBaseUrl}/todos`);
  
  try {
    const response = await fetch(`${apiBaseUrl}/todos`);
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`Error fetching todos: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Fetched data:", data);
    todos.value = data;
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    isLoading.value = false;
  }
}

  async function addTodo(title: string, description: string = '') {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${apiBaseUrl}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          isComplete: false
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error adding todo: ${response.status}`);
      }
      
      const newTodo = await response.json();
      todos.value.push(newTodo);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateTodo(todo: Todo) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${apiBaseUrl}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      
      if (!response.ok) {
        throw new Error(`Error updating todo: ${response.status}`);
      }
      
      const index = todos.value.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        todos.value[index] = todo;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleTodoComplete(id: number) {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.isComplete = !todo.isComplete;
      await updateTodo(todo);
    }
  }

  async function deleteTodo(id: number) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${apiBaseUrl}/todos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting todo: ${response.status}`);
      }
      
      todos.value = todos.value.filter(t => t.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  // Load todos when composable is used
  onMounted(() => {
    fetchTodos();
  });

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo
  };
}