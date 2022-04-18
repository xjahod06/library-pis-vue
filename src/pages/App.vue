<template>
  <div id="app">
    <NavbarFinal></NavbarFinal>
    <div>
      <MainSection name="Books" fullPage="/books/" :data="books" root="/books/"></MainSection>
      <!-- <MainSection name="E-Books"></MainSection> -->
      <MainSection name="Magazines" fullPage="/magazines/" :data="magazines" root="/books/"></MainSection>
    </div>

    <MyFooter></MyFooter>
  </div>
</template>

<script>

import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";
import NavbarFinal from "@/components/main_page/NavbarFinal";
import ApiConnect from "@/services/ApiConnect";

export default {
  name: 'App',
  components: {
    MyFooter,
    MainSection,
    NavbarFinal
  },
  data(){
    return {
      books: [],
      magazines: [],
      authors: [],
    }
  },
  methods: {
    getBooks(){
      ApiConnect.get('books').then((response) =>
          this.books = response.data,
      )},
    getMagazines(){
      ApiConnect.get('magazines/').then((response) =>
          this.magazines = response.data,
      )},
    getAuthors(){
      ApiConnect.get('authors/').then((response) => this.authors = response.data, )
    },

  },
  created() {
    this.getBooks();
    this.getMagazines();
    this.getAuthors();
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
