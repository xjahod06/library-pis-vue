<template>
  <div id="app">
  <NavBar></NavBar>
    <MainSection name="Books" :data="books"></MainSection>
    <!-- <MainSection name="E-Books"></MainSection> -->
    <b-button @click="books[0].id=0;postBook(books[0])">POST</b-button>
    <b-button @click="books[1].name='Harry Potter';putBook(books[0])">PUT</b-button>
    <div>
      {{ book }}
    </div>
    <MainSection name="Magazines" :data="magazines"></MainSection>

    <MyFooter></MyFooter>
  </div>
</template>

<script>

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
      book: {},
    }
  },
  methods: {
    getBooks(){
      BookService.getBooks().then((response) =>
          this.books = response.data,
    )},
    getMagazines(){
      MagazineService.get().then((response) =>
          this.magazines = response.data,
      )},
    postBook(json){
      BookService.post(json).then((response) =>
          console.log(response),
      )},
    putBook(json){
      BookService.put(json).then((response) =>
          console.log(response),
      )},
    getBook(id){
      BookService.getId(id).then((response) =>
          this.book = response.data,
      )},
  },
  created() {
    this.getBooks();
    this.getMagazines();
    this.getBook(1);
  },
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
