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
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "CountriesPage",
  components: {DataTable, Column},
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
      }
    }
  }
</script>
<style scoped>
</style>
