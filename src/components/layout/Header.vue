<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 d-block d-lg-none">
      <div class="container-fluid">
        <!-- Branding -->
        <span class="navbar-brand d-flex align-items-center gap-2">
          <i class="bi bi-cloud-sun text-primary fs-4"></i>
          <strong>Weather Dashboard</strong>
        </span>
  
        <!-- Botón hamburguesa -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Contenido -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link" active-class="active">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/searches" class="nav-link" active-class="active">Búsquedas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favorites" class="nav-link" active-class="active">Favoritos</router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center ms-auto mt-3 mt-lg-0 flex-column flex-lg-row gap-2">
            <span v-if="user" class="me-lg-3">
              <i class="bi bi-person-circle me-1"></i>
              {{ user.name }}
            </span>
            <button
              v-if="isAuthenticated"
              @click="logout"
              class="btn btn-outline-danger btn-sm w-100 w-lg-auto"
            >
              <i class="bi bi-box-arrow-right me-1"></i>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref, computed, onMounted } from 'vue'
  
  const router = useRouter()
  
  const user = ref(null)
  
  // Comprobar si el usuario está autenticado
  const isAuthenticated = computed(() => {
    return !!localStorage.getItem('access_token')
  })
  
  // Obtener usuario (opcional)
  onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        user.value = JSON.parse(userData)
      } catch (e) {
        user.value = null
      }
    }
  })
  
  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/login')
  }
  </script>
  