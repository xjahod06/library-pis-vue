<template>
  <div id="app">
  <NavBar></NavBar>
    <MainSection name="Books" :data="books"></MainSection>
    <!-- <MainSection name="E-Books"></MainSection> -->
    <MainSection name="Magazines" :data="magazines"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";

import BookService from "@/services/BookService";
import MagazineService from "@/services/MagazineService";

export default {
  name: 'App',
  components: {
    NavBar,
    MyFooter,
    MainSection
  },
  data(){
    return {
      books: [],
      magazines: [],
    }
  },
  methods: {
    getBooks(){
      BookService.get().then((response) =>
          this.books = response.data,
    )},
    getMagazines(){
      MagazineService.get().then((response) =>
          this.magazines = response.data,
      )}
  },
  created() {
    this.getBooks();
    this.getMagazines()
  },
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
