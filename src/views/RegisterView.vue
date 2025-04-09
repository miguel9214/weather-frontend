<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Registrarse</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label>Nombre</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Contraseña</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Idioma</label>
          <select v-model="form.locale" class="form-control">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success w-100">Registrarse</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'
  import { useApi } from '@/composables/use-api'
  
  const router = useRouter()
  
  const form = ref({
    name: '',
    email: '',
    password: '',
    locale: 'es'
  })
  
  const register = async () => {
    try {
      const response = await useApi('register', 'POST', form.value)
      localStorage.setItem('access_token', response.token)
      Swal.fire('Bienvenido', 'Registro exitoso', 'success')
      router.push('/dashboard')
    } catch (err) {
      Swal.fire('Error', err.message || 'Error al registrarse', 'error')
    }
  }
  </script>
  