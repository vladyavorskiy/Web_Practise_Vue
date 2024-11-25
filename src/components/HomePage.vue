<template>
  <Card class="home-page">
    <template #title>
      <h1 class="text-center">Добро пожаловать на Главную страницу</h1>
    </template>
    <template #content>
      <p class="text-secondary text-center">Здесь находится основная информация по макроэкономике стран.</p>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";

export default {
  name: "HomePage",
  components: { Card },
};
</script>
