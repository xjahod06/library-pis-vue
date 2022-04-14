import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import routes from './routes'
import router from './router'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',

  data: {
    currentRoute: window.location.pathname
  },

  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
          ? require('./pages/' + matchingView + '.vue').default
          : require('./pages/404.vue')
    }
  },

  router,

  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})