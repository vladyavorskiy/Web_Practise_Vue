<template>
  <DataTable
    :value="turnovers"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=turnovers_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="country1Name" header="Страна №1"/>
    <Column field="country2Name" header="Страна №2"/>
    <Column field="year" header="Год"/>
    <Column field="export_from1_to2" header="Экспорт из №1 в №2 млрд. долл."/>
    <Column field="export_from2_to1" header="Экспорт из №2 в №1 млрд. долл.	"/>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "TurnoversPage",
  components: {DataTable, Column},
  data() {
    return{
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    turnovers() {
      return this.dataStore.turnovers.map((turnover) => {
        const country1 = this.dataStore.countries.find(
          (c) => c.id === turnover.country1_id
        );
        const country2 = this.dataStore.countries.find(
          (c) => c.id === turnover.country2_id
        );
        return {
          ...turnover,
          country1Name: country1 ? country1.name : "Неизвестно",
          country2Name: country2 ? country2.name : "Неизвестно",
        };
      });
    },
    turnovers_total() {
      return this.dataStore.turnovers_total;
    }
  },
  mounted() {
    console.log('Turnovers component MOUNTED!');
    this.dataStore.get_turnovers();
    this.dataStore.get_turnovers_total();
    console.log('Turnovers=', this.turnovers);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      const page = Math.floor(this.offset / this.perpage);
      this.dataStore.get_turnovers(page, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>
