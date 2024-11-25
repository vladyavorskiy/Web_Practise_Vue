import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [],
    countries: [],
    countries_total: null,
    events: [],
    events_total: null,
    economies: [],
    economies_total: null,
    turnovers: [],
    turnovers_total: null,
    errorMessage: "",
  }),
  actions: {
    // Countries
    async get_countries(page , perpage ) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/country', {
          params: {
            page: page,
            perpage: perpage,
          },
        });
        this.countries = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    async get_countries_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/country_total');
        this.countries_total = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    // Events
    async get_events(page , perpage ) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/event', {
          params: {
            page: page,
            perpage: perpage,
          },
        });
        this.events = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    async get_events_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/event_total');
        this.events_total = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    // Economies
    async get_economies(page , perpage ) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/economy', {
          params: {
            page: page,
            perpage: perpage,
          },
        });
        this.economies = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    async get_economies_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/economy_total');
        this.economies_total = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    // Turnovers
    async get_turnovers(page , perpage ) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/turnover', {
          params: {
            page: page,
            perpage: perpage,
          },
        });
        this.turnovers = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    async get_turnovers_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/turnover_total');
        this.turnovers_total = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    // Error handler
    handleError(error) {
      if (error.response) {
        this.errorMessage = error.response.data.message;
        console.error(error);
      } else if (error.request) {
        this.errorMessage = error.message;
        console.error(error);
      } else {
        console.error(error);
      }
    },
  },
});
