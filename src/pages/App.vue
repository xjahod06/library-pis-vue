<template>
  <div id="app">
  <NavBar></NavBar>
    <MainSection name="Books" :data="books"></MainSection>
    <!-- <MainSection name="E-Books"></MainSection> -->
    <b-button @click="books[0].id=0;postBook(books[0])">POST</b-button>
    <b-button @click="books[1].name='Harry Potter';putBook(books[1])">PUT</b-button>
    <b-button @click="delBook(0)">DEL</b-button>
    <MainSection name="Magazines" :data="magazines"></MainSection>

    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";

import ApiConnect from "@/services/ApiConnect";

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
      ApiConnect.get('books').then((response) =>
          this.books = response.data,
      )},
    getMagazines(){
      ApiConnect.get('magazines/').then((response) =>
          this.magazines = response.data,
      )},
    postBook(json){
      ApiConnect.post('books',json).then((response) =>
          console.log(response),
      )},
    putBook(json){
      console.log(json.name);
      ApiConnect.put('books',json).then((response) =>
          console.log(response),
      )},
    getBook(id){
      ApiConnect.get('books/'+id).then((response) =>
          this.book = response.data,
      )},
    delBook(id){
      ApiConnect.delete('books/'+id).then((response) =>
          console.log(response),
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
