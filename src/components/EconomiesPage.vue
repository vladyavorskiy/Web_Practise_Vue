<template>
  <DataTable
    :value="economies"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=economies_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="countryName" header="Страна" />
    <Column field="year" header="Год"/>
    <Column field="GDP" header="ВВП (ППС) млрд. долл."/>
    <Column field="GDP_person" header="ВВП/чел (ППС) долл."/>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "EconomiesPage",
  components: {DataTable, Column},
  data() {
    return{
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    economies() {
      return this.dataStore.economies.map((economy) => {
        const country = this.dataStore.countries.find(
          (c) => c.id === economy.country_id
        );
        return {
          ...economy,
          countryName: country ? country.name : "Неизвестно",
        };
      });
    },
    economies_total() {
      return this.dataStore.economies_total;
    }
  },
  mounted() {
    console.log('Economies component MOUNTED!');
    this.dataStore.get_economies();
    this.dataStore.get_economies_total();
    this.dataStore.get_countries();
    console.log('Economies=', this.economies);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      const page = Math.floor(this.offset / this.perpage);
      this.dataStore.get_economies(page, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>
