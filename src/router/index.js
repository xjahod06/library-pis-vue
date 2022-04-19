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
import LoginEmployee from "@/pages/LoginEmployee";

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
    path: '/readers/:id',
    component: User,
    meta: {requiresAuth: true,
    employee: true},
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
    path: '/login_employee',
    component: LoginEmployee,
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
    component: AuthorsList,
    meta: {employee: true}
  },
  {
    path : '/edit_author/:id',
    component: EditAuthor,
    meta: {employee: true}
  },
  {
    path: '/edit_readers',
    component: ReadersList,
    meta: {administrator: true}
  },
  {
    path: '/edit_employees',
    component: EmployeeList,
    meta: {administrator: true}
  },
]

const router = new VueRouter({
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.requiresAuth)) {
    if(localStorage.getItem('id')) {
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
    if(localStorage.getItem('id')) {
      next("/readers/");  //somehow get Id of user and append into path
      return;
    }
    next();
  }
  else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.employee)) {
    let role = localStorage.getItem('role');
    if(localStorage.getItem('id') && role != null && (role == 'EMPLOYEE' || role == 'ADMIN')) {
      next("/edit_authors");
      return;
    }
    next();
  }
  else {
    next();
  }
});

export default router
