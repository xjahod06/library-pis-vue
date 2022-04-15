<template>
  <div id="Genre">
    <NavBar></NavBar>
    <h3>{{this.books}}</h3>
    <MainSection name="Books"></MainSection>
    <MainSection name="Authors"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";
import BookService from "@/services/BookService";
import GenreService from "@/services/GenreService";

export default {
  name: "Genre",
  components: {
    NavBar,
    MyFooter,
    MainSection
  },

  data(){
    return {
      books: [],
      genre_name: [],
      authors: [],
    }
  },

  methods: {
    getBooks(name){
      BookService.getBooks(name).then((response) =>
          this.books = response.data,
      )},

    getName(){
      GenreService.getName(this.$route.params.id).then((response) =>
      {
        this.genre_name = response.data;
        this.getBooks(this.genre_name.name);
      }
      )},

  },
  created() {
    this.getName();
  },

}

</script>

<style scoped>
@import "../assets/styles/main.css";
</style>