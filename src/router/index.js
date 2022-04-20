import Vue from 'vue'
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
    sensitive: true,
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
    path: '/edit_readers', //yep
    component: ReadersList,
    meta: {administrator: true}
  },
  {
    path: '/edit_employees', //yep
    component: EmployeeList,
    meta: {administrator: true}
  },
]

const router = new VueRouter({
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.requiresAuth)) {
    console.log(localStorage.getItem('role'));
    console.log("TEST");
    if((localStorage.getItem('id') == to.params.id || (localStorage.getItem('role') == "\"ADMIN\"" || localStorage.getItem('role') == "\"EMPLOYEE\""))) {
      next();
      return;
    }
    next('/');
  }
  else
  {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.guest)) {
    console.log(from)
    if(localStorage.getItem('id')) {
      next("/readers/");
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
    if(localStorage.getItem('id') && role != null && (role == "\"EMPLOYEE\"" || role == "\"ADMIN\"")) {
      next();
      return;
    }
    next("/login_employee");
  }
  else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.administrator)) {
    let role = localStorage.getItem('role');
    if(localStorage.getItem('id') && role != null && (role == "\"ADMIN\"")) {
      next();
      return;
    }
    next("/login_employee");
  }
  else {
    next();
  }
});

export default router
