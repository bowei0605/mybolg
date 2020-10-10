import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import api from './api/api'
import axios from 'axios'

// Vue.prototype.APIUrl=api;

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://www.bowei.xyz:3000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')