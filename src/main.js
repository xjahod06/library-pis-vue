import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import router from './router'
import Home from "@/pages/Home";

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,

  render: h => h(Home)
}).$mount('#app')
