import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import CountriesPage from '@/components/CountriesPage.vue';
import EventsPage from '@/components/EventsPage.vue';
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/countries',
    component: CountriesPage,
  },
  {
    path: '/events',
    component: EventsPage,
  }
];
  const router = createRouter({
    history: createWebHistory(), // Используем режим истории HTML5
    routes, // Список маршрутов
  }) ;

  export default router;
