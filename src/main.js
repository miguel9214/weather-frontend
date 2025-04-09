import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // si usas Vuex
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap'; // Para que funcionen los modales, dropdowns, etc.
import 'sweetalert2/dist/sweetalert2.min.css'; // Estilos de SweetAlert

const app = createApp(App);

app.use(router);
app.use(store); // si estás usando Vuex
app.mount('#app');
