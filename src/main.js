import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'


Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://192.168.3.22:3000'
axios.defaults.baseURL = 'https://www.bowei.xyz:3000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')