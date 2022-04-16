import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import App from '@/pages/App.vue'
import Genre from "@/pages/Genre"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
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
    component: User,
    meta: {requiresAuth: true},
  },
  {
    path: '/genre/:id?',
    //name: 'genre',
    component: Genre
  },
  {
    path: '/login',
    component: Login,
    meta: {guest: true}
  },
  {
    path: '/register',
    component: Register,
    meta: {guest: true}
  }
]

const router = new VueRouter({
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.requiresAuth)) {
    if(store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  }
  else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.guest)) {
    if(store.getters.isAuthenticated) {
      next("/readers/");  //somehow get Id of user and append into path
      return;
    }
    next();
  }
  else {
    next();
  }
});

export default router
