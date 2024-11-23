import {defineStore} from 'pinia';
import axios from 'axios';

export const useAuthStore =  defineStore( 'auth', {
  state: () => ({
    user: null, // Данные пользователя
    token: localStorage.getItem('token') || null, // Токен из localStorage
    isAuthenticated: false, // Статус аутентификации
    errorMessage: ""
  }),
  actions: {
    async login(credentials) {
      this.errorMessage = "";
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.getitem('token', response.data.token);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          // The request was made but no response was received
          // 'error.request' is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.errorMessage = error.message;
          console.log(error);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error);
        }
      }
    },


    async getUser() {
      this.errorMessage = "";
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user',
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          });
        this.user = response.data;
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          // The request was made but no response was received
          // 'error.request' is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.errorMessage = error.message;
          console.log(error);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error);
        }
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      // Удаляем токен из localStorage
      localStorage.removeItem('token');
    },
  },
});


