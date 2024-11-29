<template>
  <div class="flex justify-center">
  <form v-on:submit.prevent="createCountry" class="w-2/3 p-6">
    <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление страны</h2>
      <div class="flex flex-col mt-4">
        <InputText
          type="text"
          placeholder="Введите наименование страны"
          v-model="this.countryName"
        />
      </div>
      <div class="flex flex-col mt-4">
        <InputText
          type="text"
          placeholder="Введите столицу"
          v-model="this.capital"
        />
      </div>
      <div class="flex flex-col mt-4">
        <InputText
          type="number"
          placeholder="Введите население"
          v-model="this.population"
        />
      </div>
      <div class="flex flex-col mt-4">
        <InputText
          type="number"
          placeholder="Введите площадь (км²)"
          v-model="this.area"
        />
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение
        </label>
        <input
          type="file"
          hidden
          id="file"
          name="file"
          v-on:change="changeCaption"
          required
          accept="image/*"
        />
      </div>
      <div class="flex flex-col mt-6">
        <PrimeButton type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>


<style scoped>
/* Глобальные стили для центрирования */


/* Основной контейнер */
.flex {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import {useDataStore} from "@/stores/dataStore";
import Toast from "primevue/toast";
export default {
  name: "CreateCountry",
  components: { InputText, PrimeButton: Button , Toast },
  data() {
    return {
      dataStore: useDataStore(),
      countryName: '',
      capital:'',
      area:'',
      population:'',
      countryImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.countryImage = file;
      } else {
        document.getElementById('file-label').innerHtml = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.countryImage = null;
      }
    },
    async createCountry() {
      const formData = new FormData();
      formData.append('name', this.countryName);
      formData.append('image', this.countryImage);
      formData.append('population', this.population);
      formData.append('area', this.area);
      formData.append('capital', this.capital);
      await this.dataStore.create_country(formData);
      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка добавления страны",
          detail: this.errorMessage,
          life: 4000
        });
      else
        this.$toast.add({
          severity: 'success',
          summary: 'Страна успешно добавлена',
          detail: this.errorMessage,
          life: 4000
        });
      // this.$router.push('/countries');
    }
  }
}
</script>
