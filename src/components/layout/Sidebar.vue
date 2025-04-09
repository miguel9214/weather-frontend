<template>
    <div class="bg-dark text-white vh-100 p-3 position-fixed" style="width: 250px">
      <h4 class="mb-4">🌤️ Clima App</h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/dashboard" class="nav-link text-white">
            <i class="bi bi-house"></i> Dashboard
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/searches" class="nav-link text-white">
            <i class="bi bi-search"></i> Búsquedas
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/favorites" class="nav-link text-white">
            <i class="bi bi-star"></i> Favoritos
          </RouterLink>
        </li>
        <li class="nav-item mt-4">
          <button class="btn btn-danger w-100" @click="logout">
            <i class="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const logout = () => {
    localStorage.removeItem('access_token')
    router.push('/')
  }
  </script>
  