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
          <b-nav-item href="#">Catalog</b-nav-item>
          <b-nav-item-dropdown id="my-dropdown" text="Genre" right>
            <BookGenre v-for="load in this.genre_names" :genre=load.name :id=load.id :key="load.id" />
          </b-nav-item-dropdown>
          <b-nav-item href="#">Login/Register</b-nav-item>
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
  methods : {
    getGenres(){
      ApiConnect.get('genres/').then((response) =>
            this.genre_names = response.data
      )},
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
