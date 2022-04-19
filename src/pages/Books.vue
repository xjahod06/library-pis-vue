<template>
  <div id="books">
    <NavbarFinal></NavbarFinal>

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
import MyFooter from "@/components/main_page/MyFooter" ;
import MainTile from "@/components/main_page/MainTile";

import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";


export default {
  name: "Books",
  components: {
    NavbarFinal,
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