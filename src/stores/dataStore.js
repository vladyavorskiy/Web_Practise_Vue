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
    errorCode: "",
    errorMessage: "",
  }),
  actions: {

    async create_country(formData) {
      this.errorMessage = ""
      try {
        const response = await axios.post(backendUrl + '/country', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
          }
        );
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },


    async delete_country(countryId) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + `/country_delete/${countryId}`,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
        this.errorMessage = response.data.message;
        this.errorCode = response.data.code;
        console.log(this.errorCode);
        console.log(this.errorMessage);
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },


    // Countries
    async get_countries(page , perpage ) {
      this.errorMessage = "";
      try {
        console.log('Bearer ' + localStorage.getItem('token'));
        const response = await axios.get(backendUrl + '/country', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
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
        const response = await axios.get(backendUrl + '/country_total', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
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
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
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
        const response = await axios.get(backendUrl + '/event_total',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
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
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
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
        const response = await axios.get(backendUrl + '/economy_total',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
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
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
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
        const response = await axios.get(backendUrl + '/turnover_total',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
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
