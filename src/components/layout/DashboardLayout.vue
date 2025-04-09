<template>
    <div class="d-flex">
      <Sidebar />
  
      <div class="flex-grow-1 d-flex flex-column min-vh-100">
        <Header />
  
        <main class="flex-grow-1 p-3">
          <slot /> <!-- Aquí se carga la vista -->
        </main>
  
        <Footer />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/layout/Sidebar.vue'
  import Header from '@/components/layout/Header.vue'
  import Footer from '@/components/layout/Footer.vue'
  </script>
  