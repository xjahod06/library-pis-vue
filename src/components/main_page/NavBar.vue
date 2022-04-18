<template>
  <div id="mynavbar">
    <b-container>


    <b-navbar toggleable="lg" variant="info">
      <b-navbar-brand left href="#">
        <router-link to="/">
        <b-img class="navbar-logo" src="@/assets/library_logo.png" alt="Responsive image" ></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Catalog</b-nav-item>
          <b-nav-item-dropdown id="my-dropdown" text="Genre" right>
            <BookGenre v-for="load in this.genre_names" :genre=load.name :id=load.id />
          </b-nav-item-dropdown>
          <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
          <span v-else>
            <router-link to="/register">Register</router-link>
            <router-link to="/login">Login</router-link>
          </span>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
    </b-container>
    <SearchBar></SearchBar>
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
    isLoggedIn : function (){ return this.$store.getters.isAuthenticated }
  },
  methods : {
    async logout (){
      await this.$store.dispatch('LogOut')
      this.$router.push('/login')
    },
    getGenres(){
      ApiConnect.get('genres/').then((response) =>
            this.genre_names = response.data
      )}
  },
  data(){
    return {
      genre_names : []
    }
  },
  created() {
    this.getGenres()
  }
}
</script>
