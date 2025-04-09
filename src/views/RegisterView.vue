<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
    <div class="card shadow-sm p-4 w-100" style="max-width: 500px;">
      <div class="text-center mb-4">
        <i class="bi bi-person-plus-fill fs-1 text-success"></i>
        <h4 class="mt-2">Crear cuenta</h4>
      </div>

      <form @submit.prevent="register" novalidate>
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirmar contraseña</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Idioma preferido</label>
          <select v-model="form.locale" class="form-select">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success w-100" :disabled="loading">
          <i class="bi bi-person-check-fill me-2"></i>
          {{ loading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <p class="mt-3 text-center small">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-decoration-none">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useApi } from '@/composables/use-api'

const router = useRouter()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  locale: 'es'
})

const register = async () => {
  loading.value = true
  try {
    const response = await useApi('register', 'POST', form.value)
    localStorage.setItem('access_token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    Swal.fire('¡Bienvenido!', 'Registro exitoso', 'success')
    router.push('/dashboard')
  } catch (err) {
    Swal.fire('Error', err.message || 'Error al registrarse', 'error')
  } finally {
    loading.value = false
  }
}
</script>
