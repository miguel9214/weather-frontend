<!-- src/views/LoginView.vue -->
<template>
  <div class="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
    <div class="card shadow-sm p-4 w-100" style="max-width: 400px;">
      <div class="text-center mb-4">
        <i class="bi bi-person-circle fs-1 text-primary"></i>
        <h4 class="mt-2">Iniciar sesión</h4>
      </div>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <i class="bi bi-box-arrow-in-right me-2"></i>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="mt-3 text-center small">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-decoration-none">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await useApi('login', 'POST', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('access_token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');
    router.push('/dashboard');
  } catch (error) {
    if (error.redirect) router.push('/login');
    else Swal.fire('Error', error.message || 'Credenciales inválidas', 'error');
  } finally {
    loading.value = false;
  }
};
</script>
