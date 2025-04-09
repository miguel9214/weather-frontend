<template>
    <DashboardLayout>
      <div class="container py-4">
        <h2 class="mb-4 text-center text-md-start">🔍 Buscar clima por ciudad</h2>
  
        <div class="input-group mb-4 shadow-sm">
          <input
            v-model="city"
            type="text"
            class="form-control"
            placeholder="Ej: Madrid, Lima, Nueva York..."
            @keyup.enter="handleSearch"
          />
          <button class="btn btn-primary" @click="handleSearch">
            <i class="bi bi-search"></i> <span class="d-none d-sm-inline">Buscar</span>
          </button>
        </div>
  
        <div v-if="weather" class="row justify-content-center mb-5">
          <div class="col-12 col-md-8">
            <div class="card shadow rounded-4 text-center">
              <div class="card-body">
                <h5 class="card-title">
                  {{ weather.city }}, {{ weather.country }}
                </h5>
                <img
                  :src="`https:${weather.icon}`"
                  alt="icono clima"
                  class="mb-3 weather-icon"
                />
                <h2>{{ weather.temperature }}°C</h2>
                <p class="mb-1">{{ weather.condition }}</p>
                <p class="text-muted small">
                  Humedad: {{ weather.humidity }}% · Viento: {{ weather.wind_kph }} km/h
                </p>
                <p class="text-muted small">Hora local: {{ weather.localtime }}</p>
                <button
                  class="btn btn-outline-warning mt-3"
                  @click="toggleFavorite(weather.id)"
                >
                  <i
                    class="bi"
                    :class="weather.favorite ? 'bi-star-fill' : 'bi-star'"
                  ></i>
                  {{ weather.favorite ? 'Favorito' : 'Marcar como favorito' }}
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else-if="searched" class="text-center text-muted pt-5">
          <i class="bi bi-info-circle fs-1"></i>
          <p class="mt-2">No se encontró información para "{{ city }}".</p>
        </div>
  
        <hr class="my-5" />
        <h4 class="mb-3 text-center text-md-start">🌍 Ciudades consultadas</h4>
  
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Ciudad</th>
                <th>País</th>
                <th>Temperatura</th>
                <th>Condición</th>
                <th>Fecha</th>
                <th class="text-center">Favorito</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="search in searches" :key="search.id">
                <td>{{ search.data.city }}</td>
                <td>{{ search.data.country }}</td>
                <td>{{ search.data.temperature }}°C</td>
                <td>{{ search.data.condition }}</td>
                <td>{{ new Date(search.created_at).toLocaleString() }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm"
                    :class="search.favorite ? 'btn-warning' : 'btn-outline-warning'"
                    @click="toggleFavorite(search.id, search)"
                  >
                    <i :class="search.favorite ? 'bi-star-fill' : 'bi-star'"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Swal from 'sweetalert2'
  import DashboardLayout from '@/components/layout/DashboardLayout.vue'
  import { useApi } from '@/composables/use-api'
  
  const city = ref('')
  const weather = ref(null)
  const searched = ref(false)
  const searches = ref([])
  
  const handleSearch = async () => {
    if (!city.value.trim()) {
      Swal.fire('Atención', 'Por favor, ingresa una ciudad.', 'warning')
      return
    }
  
    try {
      const res = await useApi('searches', 'POST', { city: city.value.trim() })
      weather.value = res.data.data
      searched.value = true
      getSearches()
    } catch (err) {
      weather.value = null
      searched.value = true
      Swal.fire('Error', err.message || 'No se pudo obtener el clima', 'error')
    }
  }
  
  const getSearches = async () => {
    try {
      const res = await useApi('searches', 'GET')
      searches.value = res.data
    } catch (err) {
      console.error('Error cargando búsquedas:', err.message)
    }
  }
  
  const toggleFavorite = async (id, item = null) => {
    try {
      const res = await useApi(`favorites/${id}/toggle`, 'POST')
      const updatedFavorite = res.data?.search?.favorite
  
      if (typeof updatedFavorite === 'boolean') {
        if (item) {
          item.favorite = updatedFavorite
        } else if (weather.value && weather.value.id === id) {
          weather.value.favorite = updatedFavorite
        }
      }
  
      getSearches()
      Swal.fire('Actualizado', 'Estado de favorito actualizado', 'success')
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo actualizar favorito', 'error')
    }
  }
  
  onMounted(() => {
    getSearches()
  })
  </script>
  
  <style scoped>
  h2, h4 {
    font-weight: 600;
  }
  
  input {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  button {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  .weather-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  </style>
  