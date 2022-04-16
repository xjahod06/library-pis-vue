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


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
