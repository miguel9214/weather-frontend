<template>
    <DashboardLayout>
      <div class="container py-4">
        <h2 class="mb-4 text-center text-md-start">⭐ Mis ciudades favoritas</h2>
  
        <!-- Tabla de favoritos -->
        <div v-if="favorites && favorites.length > 0" class="table-responsive shadow-sm rounded">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Ciudad</th>
                <th>País</th>
                <th>Temperatura</th>
                <th>Condición</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fav, index) in favorites" :key="fav.id">
                <td>{{ index + 1 }}</td>
                <td>{{ fav.data.city }}</td>
                <td>{{ fav.data.country }}</td>
                <td>{{ fav.data.temperature }}°C</td>
                <td>{{ fav.data.condition }}</td>
                <td>
                  <button class="btn btn-outline-danger btn-sm" @click="toggleFavorite(fav)">
                    <i class="bi bi-heartbreak"></i> Quitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Mensaje si no hay favoritos -->
        <div v-else class="text-center text-muted py-5">
          <i class="bi bi-heart fs-1"></i>
          <p class="mt-3">Aún no tienes ciudades marcadas como favoritas.</p>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useApi } from '@/composables/use-api'
  import DashboardLayout from '@/components/layout/DashboardLayout.vue'
  import Swal from 'sweetalert2'
  
  const favorites = ref([])
  
  const fetchFavorites = async () => {
    try {
      const res = await useApi('favorites', 'GET')
      console.log('🔍 Datos favoritos:', res)
      favorites.value = res
    } catch (error) {
      console.error('❌ Error al cargar favoritos', error)
      favorites.value = []
      Swal.fire('Error', 'No se pudieron cargar las ciudades favoritas', 'error')
    }
  }
  
  const toggleFavorite = async (search) => {
    try {
      const res = await useApi(`favorites/${search.id}/toggle`, 'POST')
      const updatedFavorite = res.data?.search?.favorite
  
      if (updatedFavorite === false) {
        favorites.value = favorites.value.filter((s) => s.id !== search.id)
      }
  
      Swal.fire('Actualizado', `${search.data.city} fue actualizado`, 'success')
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo actualizar el favorito', 'error')
    }
  }
  
  onMounted(fetchFavorites)
  </script>
  
  <style scoped>
  /* Mejora visual en móviles */
  @media (max-width: 576px) {
    table thead {
      display: none;
    }
  
    table tbody tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #dee2e6;
      border-radius: 0.5rem;
      overflow: hidden;
    }
  
    table tbody td {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border: none;
      border-bottom: 1px solid #dee2e6;
    }
  
    table tbody td:last-child {
      border-bottom: none;
    }
  
    table tbody td::before {
      content: attr(data-label);
      font-weight: 600;
      color: #6c757d;
    }
  }
  </style>
  