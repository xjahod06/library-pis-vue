import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import router from './router'
import authService from './services/AuthService'
import Home from "@/pages/Home";
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/pis-library/api/v1'

new Vue({
  el: '#app',
  router,
  authService,
  render: h => h(Home)
}).$mount('#app')
