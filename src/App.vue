<template>
  <PrimeMenubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/planet-earth.png" width="50" alt="My PNG Icon"/>
      </span>
    </template>
    <template #item="{ item }">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon"/>
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/> {{ user.name }}
          <PrimeButton @click="logout" class="ml-4">Выйти</PrimeButton>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <PrimeInputText v-model="email" type="email" id="email" required placeholder="Логин" class="m-2 sm:w-auto"
                       :class="{'p-invalid': authError}"/>
            <PrimeInputText v-model="password" type="password" id="password" required placeholder="Пароль"
                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <PrimeButton type="submit">Войти</PrimeButton>
            <div class="ml-2"><small v-if="authError" class="error">{{ authError }}</small></div>
          </form>
        </div>
      </div>
    </template>
  </PrimeMenubar>
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext'
export default {
  components: {
    PrimeButton: Button,
    PrimeMenubar: Menubar,
    PrimeInputText: InputText,
  },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [
            // Submenu items
          ],
        },
        {
          label: 'Страны',
          icon: 'pi pi-fw pi-map-marker',
          route: '/countries',
        },
        {
          label: 'События',
          icon: 'pi pi-fw pi-calendar',
          route: '/events',
        },
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout(); // Используем authStore для логаута
    },
    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>


<style scoped>
.error{
  color: red;
}
</style>
