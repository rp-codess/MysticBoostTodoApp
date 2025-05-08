<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <header class="bg-primary text-white py-5 shadow-md">
        <div class="container mx-auto px-4">
          <div class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="h-8 w-8 mr-3" />
            <h1 class="text-2xl font-bold">MysticBoost Todo App</h1>
          </div>
        </div>
      </header>
      
      <main class="container mx-auto px-4 py-8 flex-grow">
        <slot />
      </main>
      
      <footer class="py-5 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-center">
            <UIcon name="i-heroicons-code-bracket" class="h-4 w-4 mr-1" />
            <span>&copy; {{ new Date().getFullYear() }} MysticBoost Todo App</span>
          </div>
        </div>
      </footer>
    </div>
  </template>