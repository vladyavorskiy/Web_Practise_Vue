<template>
  <DataTable
    :value="countries"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=countries_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="name" header="Название"/>
    <Column field="capital" header="Столица"/>
    <Column field="population" header="Население"/>
    <Column field="area" header="Площадь"/>
    <Column field="picture_url" header="Флаг">
      <template #body="slotProps">
        <img
          :src="slotProps.data.picture_url"
          alt="Флаг"
          style="width: 100px; height: auto; border-radius: 4px; border: 2px solid #000000;"
        />
      </template>
    </Column>
    <Column header="Действия">
      <template #body="slotProps">
        <PrimeButton
          type="button"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="deleteCountry(slotProps.data.id)"
        />
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <PrimeButton type="button" @click="this.$router.push('/createCountry')" icon="pi pi-plus" label="Добавить страну" />
      </div>
    </template>
  </DataTable>
  <Toast position="bottom-right" />
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from 'primevue/button';
import {useDataStore} from '@/stores/dataStore';
import Toast from 'primevue/toast'

export default {
  name: "CountriesPage",
  components: {DataTable, Column, PrimeButton: Button, Toast},
  data() {
    return{
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
  }
},
  computed: {
    countries() {
      return this.dataStore.countries;
    },
    countries_total() {
      return this.dataStore.countries_total;
    },
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    }
  },
    mounted() {
      console.log('Countries component MOUNTED!');
      this.dataStore.get_countries();
      this.dataStore.get_countries_total();
      console.log('Countries=', this.countries);
    },
    methods: {
      onPageChange(event) {
        this.offset = event.first;
        this.perpage = event.rows;
        const page = Math.floor(this.offset / this.perpage);
        this.dataStore.get_countries(page, this.perpage);
        // this.dataStore.get_countries(this.offset / this.perpage, this.perpage);
      },

      async deleteCountry(countryId) {
        if (confirm("Вы уверены, что хотите удалить эту страну?")) {
          await this.dataStore.delete_country(countryId);
          if (this.errorCode > 0)
            this.$toast.add({
              severity: 'error',
              summary: "Ошибка при удалении страны",
              detail: this.errorMessage,
              life: 4000
            });
          else
            this.$toast.add({
              severity: 'success',
              summary: 'Страна успешно удалена',
              detail: this.errorMessage,
              life: 4000
            });
        }
        this.offset = 0;
        this.perpage = 5;
        const page = Math.floor(this.offset / this.perpage);
        this.dataStore.get_countries(page, this.perpage);
        this.dataStore.get_countries_total();
      }
    }
  }
</script>
<style scoped>
</style>
