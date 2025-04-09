<template>
    <div class="card shadow-lg rounded-4 border-0">
      <div class="card-header bg-white d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
        <h5 class="mb-0 fw-semibold d-flex align-items-center">
          <i class="bi bi-clock-history me-2 text-primary"></i>
          Historial de Búsquedas
        </h5>
        <button
          class="btn btn-sm btn-outline-danger ms-sm-auto"
          @click="confirmDeleteAll"
          title="Eliminar todo"
        >
          <i class="bi bi-trash3"></i>
          <span class="d-none d-sm-inline">Eliminar todo</span>
        </button>
      </div>
  
      <ul class="list-group list-group-flush">
        <li
          v-for="search in history"
          :key="search.id"
          class="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2"
        >
          <div>
            <i class="bi bi-geo-alt-fill text-primary me-2"></i>
            <strong>{{ search.city }}</strong>
            <br />
            <small class="text-muted">{{ formatDate(search.created_at) }}</small>
          </div>
          <button
            class="btn btn-sm btn-light border text-danger"
            @click="deleteSearch(search.id)"
            title="Eliminar búsqueda"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </li>
      </ul>
  
      <div
        v-if="history.length === 0"
        class="card-body text-center text-muted py-5"
      >
        <i class="bi bi-inbox fs-1 mb-2"></i>
        <p class="mb-0">No hay búsquedas recientes.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useApi } from '@/composables/use-api'
  import Swal from 'sweetalert2'
  
  const history = ref([])
  
  const fetchHistory = async () => {
    try {
      const res = await useApi('searches')
      history.value = res.data
    } catch (err) {
      console.error(err)
    }
  }
  
  const deleteSearch = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta búsqueda se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
  
    if (confirm.isConfirmed) {
      try {
        await useApi(`searches/${id}`, 'DELETE')
        history.value = history.value.filter(s => s.id !== id)
        Swal.fire('Eliminado', 'La búsqueda fue eliminada.', 'success')
      } catch (err) {
        Swal.fire('Error', err.message || 'No se pudo eliminar', 'error')
      }
    }
  }
  
  const confirmDeleteAll = async () => {
    const confirm = await Swal.fire({
      title: '¿Eliminar todo?',
      text: '¿Seguro que quieres eliminar todas las búsquedas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar todo',
      cancelButtonText: 'Cancelar',
    })
  
    if (confirm.isConfirmed) {
      const promises = history.value.map(s => useApi(`searches/${s.id}`, 'DELETE'))
      await Promise.all(promises)
      history.value = []
      Swal.fire('Listo', 'Historial limpiado.', 'success')
    }
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  onMounted(fetchHistory)
  </script>
  