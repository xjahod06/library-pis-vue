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
         <span v-if="isLoggedIn" class="d-flex ml-3">
              <b-iconstack @click="logout" font-scale="3" animation="" type="button">
                <b-icon stacked icon="square" variant="white" scale="0.50" shift-h="-4"></b-icon>
                <b-icon stacked icon="arrow-right" variant="white" scale="0.60" ></b-icon>
              </b-iconstack>
              <b-iconstack @click="userProfile" font-scale="3" animation="" type="button">
                <b-icon stacked icon="person-fill" variant="white" scale="0.50"></b-icon>
              </b-iconstack>
          </span>
          <span v-else class="d-flex">
            <b-nav-item :to="{path: '/login/'}">Login</b-nav-item>
            <b-nav-item :to="{path: '/register/'}">Register</b-nav-item>
            <b-nav-item :to="{path: '/login_employee'}">Employees</b-nav-item>
          </span>
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

export default {
  name: 'NavBar',
  components: {
    SearchBar,
    BookGenre
  },
  computed: {
    isLoggedIn : function (){ return (localStorage.getItem('id') != null)}
  },
  methods : {
    logout (){
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      console.log(localStorage.getItem('id'), localStorage.getItem('role'));
      this.$router.push('/login')
    },
    getGenres(){
      ApiConnect.get('genres/').then((response) =>
            this.genre_names = response.data
      )},
    userProfile() {
      this.$router.push('/readers/' + localStorage.getItem('id'));
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
