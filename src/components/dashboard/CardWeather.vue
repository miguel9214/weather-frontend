<template>
    <div class="card shadow rounded-4 border-0">
      <div v-if="weatherList.length" class="card-body p-0">
        <div
          id="weatherCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <!-- Indicadores -->
          <div class="carousel-indicators">
            <button
              v-for="(item, i) in weatherList"
              :key="item.id"
              type="button"
              data-bs-target="#weatherCarousel"
              :data-bs-slide-to="i"
              :class="{ active: i === 0 }"
              aria-current="true"
              :aria-label="`Slide ${i + 1}`"
            ></button>
          </div>
  
          <!-- Carrusel -->
          <div class="carousel-inner">
            <div
              v-for="(weatherItem, index) in weatherList"
              :key="weatherItem.id"
              :class="['carousel-item', { active: index === 0 }]"
            >
              <div class="container py-4">
                <div class="row justify-content-center">
                  <div class="col-12 col-md-8 text-center">
                    <h5 class="card-title mb-3">
                      {{ weatherItem.data.city }},
                      <span class="text-muted">{{ weatherItem.data.country }}</span>
                    </h5>
  
                    <!-- Icono -->
                    <div class="d-flex justify-content-center mb-3">
                      <img
                        :src="`https:${weatherItem.data.icon}`"
                        alt="icono del clima"
                        class="weather-icon img-fluid"
                      />
                    </div>
  
                    <h2>{{ weatherItem.data.temperature }}°C</h2>
                    <p class="mb-1">{{ weatherItem.data.condition }}</p>
                    <p class="text-muted small">
                      Humedad: {{ weatherItem.data.humidity }}% · Viento:
                      {{ weatherItem.data.wind_kph }} km/h
                    </p>
                    <p class="text-muted small">
                      Hora local: {{ weatherItem.data.localtime }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Controles -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#weatherCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#weatherCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
  
      <div v-else class="card-body text-center py-5">
        <p class="text-muted">No hay búsquedas recientes.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useApi } from '@/composables/use-api'
  import Swal from 'sweetalert2'
  
  const weatherList = ref([])
  
  const fetchHistory = async () => {
    try {
      const res = await useApi('searches')
  
      // Elimina duplicados por ciudad
      const seen = new Set()
      const uniqueList = []
  
      for (const item of res.data) {
        if (!seen.has(item.city)) {
          seen.add(item.city)
          uniqueList.push(item)
        }
      }
  
      weatherList.value = uniqueList
    } catch (err) {
      Swal.fire('Error', 'No se pudo cargar el historial de búsquedas', 'error')
    }
  }
  
  onMounted(fetchHistory)
  </script>
  
  <style scoped>
  .carousel-item {
    transition: transform 0.6s ease;
  }
  
  .weather-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  
  .carousel-indicators [data-bs-target] {
    background-color: #0d6efd;
  }
  </style>
  