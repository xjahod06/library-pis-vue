import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import App from '@/pages/App.vue'
import Genre from "@/pages/Genre"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import User from "@/pages/User";
import Books from "@/pages/Books";
import Book from "@/pages/Book";
import Magazines from "@/pages/Magazines";
import Magazine from "@/pages/Magazine";
import AuthorsList from "@/pages/AuthorsList";
import EditAuthor from "@/pages/EditAuthor";
import ReadersList from "@/pages/ReadersList";
import EmployeeList from "@/pages/EmployeeList";
import Authors from "@/pages/Authors";
import GenreAuthors from "@/pages/GenreAuthors";
import Author from "@/pages/Author";

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/readers/:id?',
    component: User,
    meta: {requiresAuth: true},
  },
  {
    path: '/genre/:id?',
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
  },
  {
    path: '/books/',
    component: Books
  },
  {
    path: '/books/:id',
    component: Book
  },
  {
    path: '/authors/',
    component: Authors
  },
  {
    path: '/authors/:id',
    component: Author
  },
  {
    path: '/genre_authors/:id',
    component: GenreAuthors
  },
  {
    path: '/magazines/',
    component: Magazines
  },
  {
    path: '/magazines/:id',
    component: Magazine
  },
  {
    path: '/edit_authors',
    component: AuthorsList
  },
  {
    path : '/edit_author/:id',
    component: EditAuthor
  },
  {
    path: '/edit_readers',
    component: ReadersList
  },
  {
    path: '/edit_employees',
    component: EmployeeList
  },
]

const router = new VueRouter({
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.requiresAuth)) {
    if(localStorage.getItem('reader')) {
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
    if(localStorage.getItem('reader')) {
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
