<template>
  <div id="app">
  <NavBar></NavBar>
    <MainSection name="Books"></MainSection>
    <MainSection name="E-Books"></MainSection>
    <MainSection name="Magazines"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";

import BookService from "@/services/BookService";


export default {
  name: 'App',
  components: {
    NavBar,
    MyFooter,
    MainSection
  },
  data(){
    return {
      books: []
    }
  },
  methods: {
    getBooks(){
      BookService.getBooks().then((response) =>
          //console.log(response),
          this.books = response.data,
    )}
  },
  created() {
    this.getBooks();
  },
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
