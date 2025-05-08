<template>
    <div class="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 class="text-lg font-semibold mb-4 flex items-center">
        <UIcon name="i-heroicons-plus-circle" class="mr-2 text-primary" />
        Add New Task
      </h2>
      <form @submit.prevent="handleSubmit">
        <UFormGroup label="Title" name="title" class="mb-4">
          <UInput
            v-model="title"
            placeholder="What needs to be done?"
            :required="true"
            :error="titleError"
            size="lg"
            class="w-full"
            icon="i-heroicons-pencil"
          />
        </UFormGroup>
        
        <UFormGroup label="Description" name="description" class="mb-4">
          <UTextarea
            v-model="description"
            placeholder="Add details about this task (optional)"
            rows="3"
            class="w-full"
          />
        </UFormGroup>
        
        <div class="mt-5">
          <UButton
            type="submit"
            color="primary"
            :loading="isSubmitting"
            size="lg"
            block
            icon="i-heroicons-check-circle"
          >
            Add Task
          </UButton>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  const title = ref('');
  const description = ref('');
  const titleError = ref('');
  const isSubmitting = ref(false);
  
  const emit = defineEmits(['add-todo']);
  
  function validateForm() {
    titleError.value = '';
    
    if (!title.value.trim()) {
      titleError.value = 'Title is required';
      return false;
    }
    
    return true;
  }
  
  async function handleSubmit() {
    if (!validateForm()) return;
    
    isSubmitting.value = true;
    
    try {
      emit('add-todo', title.value, description.value);
      
      // Reset form
      title.value = '';
      description.value = '';
    } finally {
      isSubmitting.value = false;
    }
  }
  </script>