import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import App from '@/pages/App.vue'
import Genre from "@/pages/Genre"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

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
    path: '/genre/:id?',
    //name: 'genre',
    component: Genre
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  Routes,
});

export default router
