<template>
  <div id="Genre">
    <NavBar></NavBar>
    <div>
      <h1 style="text-align:center">{{this.genre_name.name}}</h1>
    </div>
    <MainSection name="Books" :data="books"></MainSection>
    <AuthorSection name="Authors" :data="authors"></AuthorSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";
import ApiConnect from "@/services/ApiConnect";
import AuthorSection from "@/components/genre_page/AuthorSection";

export default {
  name: "Genre",
  components: {
    AuthorSection,
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
      let params = {params:{"genres": name}};
      ApiConnect.get('books/',params).then((response) =>
      {
          this.books = response.data;
          this.books.forEach(book => this.authors.push(book.authors[0]))
      }
      )},

    getName(){
      let id = this.$route.params.id
      if (typeof(this.$route.params.id) == 'undefined'){
        id = ''
      }
      ApiConnect.get('genres/'+id).then((response) =>
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