<template>
  <aside
    :class="['bg-dark text-white p-4 shadow-sm position-fixed top-0 start-0 h-100', { 'd-none d-lg-block': !isOpen }]"
    style="width: 250px; z-index: 1040"
  >
    <h4 class="mb-4 d-flex align-items-center">
      <i class="bi bi-cloud-sun-fill text-warning me-2"></i>
      Clima App
    </h4>

    <nav>
      <ul class="nav flex-column gap-2">
        <li class="nav-item">
          <RouterLink
            to="/dashboard"
            class="nav-link d-flex align-items-center gap-2 text-white sidebar-link"
            @click="closeSidebar"
          >
            <i class="bi bi-house-door-fill"></i>
            Dashboard
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/searches"
            class="nav-link d-flex align-items-center gap-2 text-white sidebar-link"
            @click="closeSidebar"
          >
            <i class="bi bi-search"></i>
            Búsquedas
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/favorites"
            class="nav-link d-flex align-items-center gap-2 text-white sidebar-link"
            @click="closeSidebar"
          >
            <i class="bi bi-star-fill"></i>
            Favoritos
          </RouterLink>
        </li>
      </ul>
    </nav>

    <hr class="border-secondary my-4" />

    <button
      class="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
      @click="logout"
    >
      <i class="bi bi-box-arrow-right"></i>
      Cerrar sesión
    </button>
  </aside>

  <!-- Botón toggle solo en móviles -->
  <button
    class="btn btn-primary position-fixed d-lg-none"
    @click="toggleSidebar"
    style="top: 1rem; left: 1rem; z-index: 1050"
  >
    <i class="bi bi-list"></i>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  if (window.innerWidth < 992) {
    isOpen.value = false
  }
}

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
.sidebar-link {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}
.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}
</style>
