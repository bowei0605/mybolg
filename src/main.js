import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import api from './api/api'
import axios from 'axios'
Vue.prototype.APIUrl=api;

Vue.prototype.$axios = axios

Vue.config.productionTip = false

// Vue.directive('highlight',function (el) {
//   let blocks = el.querySelectorAll('pre code');
//       blocks.forEach((block)=>{
//       hljs.highlightBlock(block)
//   })
// })

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
