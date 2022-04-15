import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/pages/App.vue'
import Genre from "@/pages/Genre"
import About from "@/pages/About"
import User from "@/pages/User";

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    //name: 'home',
    component: App
  },
  {
    path: '/about',
    //name: 'about',
    component: About
  },
  {
    path: '/readers/:id?',
    component: User
  },
  {
    path: '/genre/:id?',
    //name: 'genre',
    component: Genre
  },
]

const router = new VueRouter({
  routes: Routes
})

export default router
