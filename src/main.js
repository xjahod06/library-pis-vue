import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import router from './router'
import store from './store'
import Home from "./pages/Home";
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.withCredentials = true

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
  
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
