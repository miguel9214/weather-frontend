<template>
  <div class="d-flex flex-column flex-lg-row bg-light min-vh-100">
    <!-- Sidebar -->
    <div class="d-none d-lg-block" style="width: 250px;">
      <Sidebar />
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- Header -->
      <Header />

      <!-- Contenido dinámico -->
      <main class="flex-grow-1 p-3 p-md-4 content-area">
        <slot />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style scoped>
.content-area {
  background-color: #f9f9f9;
  border-radius: 12px;
  animation: fadeIn 0.3s ease-in-out;
  min-height: calc(100vh - 130px); /* Ajusta si tu header/footer cambian */
}

/* Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
