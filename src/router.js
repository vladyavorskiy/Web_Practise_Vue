import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import CountriesPage from '@/components/CountriesPage.vue';
import EventsPage from '@/components/EventsPage.vue';
import TurnoversPage from '@/components/TurnoversPage.vue';
import EconomiesPage from '@/components/EconomiesPage.vue';
import CreateCountry from '@/components/CreateCountry.vue';
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
  },
  {
    path: '/economies',
    component: EconomiesPage,
  },
  {
    path: '/turnovers',
    component: TurnoversPage,
  },
  {
    path: '/createCountry',
    component: CreateCountry,
  }

];
  const router = createRouter({
    history: createWebHistory(), // Используем режим истории HTML5
    routes, // Список маршрутов
  }) ;

  export default router;
