<template>
  <div id="mynavbar">
    <b-container>

    <b-navbar toggleable="lg" variant="info">
      <b-navbar-brand left href="#">
        <router-link to="/">
        <b-img @click="deleteSearch" class="navbar-logo" src="@/assets/library_logo.png" alt="Responsive image" ></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{path: '/books/'}">Catalog</b-nav-item>
          <b-nav-item-dropdown id="my-dropdown" text="Genre" right>
            <BookGenre v-for="load in this.genre_names" :genre=load.name :id=load.id :key="load.id" />
          </b-nav-item-dropdown>
         <div v-if="isLoggedIn">
            <span @click="logout">
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"/>
            </span>
            <span v-show="isNotReader" @click="dashboard">
              <font-awesome-icon icon="fa-solid fa-house"/>
            </span>
          </div>
          <div v-else>
            <b-nav-item :to="{path: '/login/'}">Login</b-nav-item>
            <b-nav-item :to="{path: '/register/'}">Register</b-nav-item>
            <b-nav-item :to="{path: '/login_employee'}">Employees</b-nav-item>
          </div>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
    </b-container>
    <SearchBar v-on="$listeners"></SearchBar>
  </div>

</template>

<script>

import SearchBar from "@/components/main_page/SearchBar";
import BookGenre from "@/components/main_page/BookGenre";
import ApiConnect from "@/services/ApiConnect";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDisplay, faHouse, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
library.add(faDisplay, faHouse, faArrowRightFromBracket)

export default {
  name: 'NavBar',
  components: {
    SearchBar,
    BookGenre
  },
  computed: {
    isLoggedIn : function (){ return (localStorage.getItem('id') != null)},
    isNotReader : function (){ return (localStorage.removeItem('role') != "\"READER\"")}
  },
  methods : {
    logout (){
      let who = localStorage.getItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      if (who == "\"READER\"")
      {
        this.$router.push('/login')
      }
      else
      {
        this.$router.push('/login_employee')
      }
    },
    getGenres(){
      ApiConnect.get('genres/').then((response) =>
            this.genre_names = response.data
      )},
    userProfile() {
      this.$router.push('/readers/' + localStorage.getItem('id'));
    },
    dashboard() {
      this.$router.push('/employee_dashboard');
    },
    deleteSearch(){
      this.search_input = '';
      this.$emit('deleteSearch', '');
    }
  },
  data(){
    return {
      genre_names : [],
      search_input: ''
    }
  },
  created() {
    this.getGenres()
  }
}
</script>
