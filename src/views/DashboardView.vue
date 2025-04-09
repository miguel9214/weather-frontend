<template>
    <DashboardLayout>
      <div class="container py-4">
        <!-- Encabezado -->
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4 gap-3">
          <i class="bi bi-sun text-warning display-4"></i>
          <div>
            <h2 class="mb-1 fw-bold">Bienvenido al Panel del Clima</h2>
            <p class="text-muted mb-0">Consulta el clima actual y revisa tu historial de búsquedas.</p>
          </div>
        </div>
  
        <!-- Contenido principal -->
        <div class="row g-4">
          <!-- Tarjeta del clima actual -->
          <div class="col-12 col-lg-6">
            <CardWeather />
          </div>
  
          <!-- Historial de búsquedas -->
          <div class="col-12 col-lg-6">
            <SearchHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/components/layout/DashboardLayout.vue'
  import CardWeather from '@/components/dashboard/CardWeather.vue'
  import SearchHistory from '@/components/dashboard/SearchHistory.vue'
  </script>
  
  <style scoped>
  .container {
    animation: fadeIn 0.3s ease-in;
  }
  
  /* Animación */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Ajustes de encabezado para pantallas pequeñas */
  @media (max-width: 576px) {
    .display-4 {
      font-size: 2.5rem;
    }
  
    h2 {
      font-size: 1.5rem;
    }
  
    p {
      font-size: 0.95rem;
    }
  }
  </style>
  