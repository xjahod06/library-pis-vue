<template>
  <div id="books">
    <NavBar></NavBar>

    <b-container>
      <h1>Books:</h1>
      <b-row>
        <MainTile v-for="book in books"
                  img="@/assets/logo.png"
                  :genres = book.genres
                  :type = book.language
                  :name = book.name
                  :authors = book.authors
                  :fields = book.fields
                  :id = book.id
                  root = "/books/"
        >

        </MainTile>
      </b-row>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainTile from "@/components/main_page/MainTile";

import ApiConnect from "@/services/ApiConnect";


export default {
  name: "Books",
  components: {
    NavBar,
    MyFooter,
    MainTile
  },
  data(){
    return {
      books: [],
    }
  },
  methods: {
    getBooks(){
      ApiConnect.get('books').then((response) =>
          this.books = response.data,
      )}
  },
  created() {
    this.getBooks();
  },
}
</script>

<style scoped>

</style>