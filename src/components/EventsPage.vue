<template>
  <DataTable
    :value="events"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=events_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="countryName" header="Страна" />
    <Column field="description" header="Описание"/>
    <Column field="date" header="Дата проведения"/>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "EventsPage",
  components: {DataTable, Column},
  data() {
    return{
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    events() {
      return this.dataStore.events.map((events) => {
        const country = this.dataStore.countries.find(
          (c) => c.id === events.country_id
        );
        return {
          ...events,
          countryName: country ? country.name : "Неизвестно",
        };
      });
    },
    events_total() {
      return this.dataStore.events_total;
    }
  },
  mounted() {
    console.log('Events component MOUNTED!');
    this.dataStore.get_events();
    this.dataStore.get_events_total();
    console.log('Events=', this.events);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      const page = Math.floor(this.offset / this.perpage);
      this.dataStore.get_events(page, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>
