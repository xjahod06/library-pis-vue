<template>
  <div id="app">
  <NavBar @event="search_input= $event" @deleteSearch="deleteSearchInput"></NavBar>

    <div v-if="search_input">
      <SearchResults v-if="filteredBooks.length > 0 ||
                            filteredMagazines.length > 0 ||
                            filteredAuthors.length > 0 ||
                            filteredGenres.length > 0 ||
                            filteredFields.length > 0"
          :books="filteredBooks"
          :magazines="filteredMagazines"
          :authors="filteredAuthors"
          :genres="filteredGenres"
          :fields="filteredFields">
      </SearchResults>
      <b-container v-else>
        <b-alert class="mt-2" show variant="danger" dismissible> No search result </b-alert>
      </b-container>
    </div>

    <div v-else>
      <MainSection name="Books" fullPage="/books/" :data="books" root="/books/"></MainSection>
      <!-- <MainSection name="E-Books"></MainSection> -->
      <b-button @click="books[0].id=0;postBook(books[0])">POST</b-button>
      <b-button @click="books[1].name='Harry Potter';putBook(books[1])">PUT</b-button>
      <b-button @click="delBook(0)">DEL</b-button>
      <MainSection name="Magazines" fullPage="/magazines/" :data="magazines" root="/books/"></MainSection>
    </div>

    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";
import SearchResults from "@/components/search_page/SearchResults";

import ApiConnect from "@/services/ApiConnect";

export default {
  name: 'App',
  components: {
    NavBar,
    MyFooter,
    MainSection,
    SearchResults
  },
  data(){
    return {
      books: [],
      magazines: [],
      book: {},
      search_input: '',
      authors: []
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
    getFields(){
      ApiConnect.get('fields/').then((response) => this.fields = response.data, )
    },
    getGenres(){
      ApiConnect.get('genres/').then((response) => this.genres = response.data, )
    },
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
    deleteSearchInput(val){
      this.search_input = '';
    }

  },
  created() {
    this.getBooks();
    this.getMagazines();
    this.getAuthors();
    this.getGenres();
    this.getFields();
    this.getBook(1);
  },
  computed: {
    filteredBooks : function (){
      return this.books.filter(book =>
          book.name.toLowerCase().includes(this.search_input.toLowerCase()));

    },
    filteredMagazines : function (){
      return this.magazines.filter(magazine =>
          magazine.name.toLowerCase().includes(this.search_input.toLocaleLowerCase()));
    },
    filteredAuthors : function (){
      return this.authors.filter(author =>
          author.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
          author.surname.toLowerCase().includes(this.search_input.toLowerCase())
      );
    },
    filteredGenres: function(){
      return this.genres.filter(genre =>
        genre.name.toLowerCase().includes(this.search_input.toLowerCase())
      );
    },
    filteredFields: function(){
      return this.fields.filter(field =>
        field.name.toLowerCase().includes(this.search_input.toLowerCase())
      );
    }
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
