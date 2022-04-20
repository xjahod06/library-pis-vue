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
    component: App,
    meta: {
      title: 'Library',
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About',
    }
  },
  {
    path: '/readers/:id',
    sensitive: true,
    component: User,
    meta: {
      title: 'Reader Edit',
      requiresAuth: true
    },
  },
  {
    path: '/genre/:id?',
    component: Genre,
    meta: {
      title: 'Genre page',
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login',
      guest: true
    }
  },
  {
    path: '/login_employee',
    component: LoginEmployee,
    meta: {
      title: 'Login employee',
      guest: true
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: 'Register',
      guest: true
    }
  },
  {
    path: '/books/',
    component: Books,
    meta: {
      title: 'Books',
    }
  },
  {
    path: '/books/:id',
    component: Book,
    meta: {
      title: 'Book page',
    }
  },
  {
    path: '/authors/',
    component: Authors,
    meta: {
      title: 'Authors',
    }
  },
  {
    path: '/authors/:id',
    component: Author,
    meta: {
      title: 'Author page',
    }
  },
  {
    path: '/genre_authors/:id',
    component: GenreAuthors,
    meta: {
      title: 'Authors by genre',
    }
  },
  {
    path: '/magazines/',
    component: Magazines,
    meta: {
      title: 'Magazines',
    }
  },
  {
    path: '/magazines/:id',
    component: Magazine,
    meta: {
      title: 'Magazine page',
    }
  },
  {
    path: '/edit_authors',
    component: AuthorsList,
    meta: {
      title: 'Edit Authors',
      employee: true
    }
  },
  {
    path : '/edit_author/:id', 
    component: EditAuthor,
    meta: {
      title: 'Edit specific author',
      employee: true
    }
  },
  {
    path: '/edit_readers', //yep
    component: ReadersList,
    meta: {
      title: 'Edit readers',
      administrator: true
    }
  },
  {
    path: '/edit_employees', //yep
    component: EmployeeList,
    meta: {
      title: 'Edit employees',
      administrator: true
    }
  },
]

const router = new VueRouter({
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record)=>record.meta.requiresAuth)) {
    console.log(localStorage.getItem('role'));
    console.log("TEST");
    if((localStorage.getItem('id') === to.params.id || (localStorage.getItem('role') === "\"ADMIN\"" || localStorage.getItem('role') === "\"EMPLOYEE\""))) {
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
    if(localStorage.getItem('id') && role != null && (role === "\"EMPLOYEE\"" || role === "\"ADMIN\"")) {
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
    if(localStorage.getItem('id') && role != null && (role === "\"ADMIN\"")) {
      next();
      return;
    }
    next("/login_employee");
  }
  else {
    next();
  }
});

const DEFAULT_TITLE = 'Some Default Title';
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router
