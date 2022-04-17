<template>
  <div id="Book">
    <NavBar></NavBar>
    <b-container>
      <b-row>
        <b-col cols="4">
          <BookTitle
            img="@/assets/logo.png"
            format="book"
            :publisher="book.publisher"
            :released="book.publicationDate"
            :pages="book.pages"
          >

          </BookTitle>
        </b-col>
        <b-col cols="8">
          <BookInfo
            :title="book.name"
            :publicationNumber="''+book.publicationNumber"
            :authors="book.authors"
            :isbn="book.isbn"
            :genres="book.genres"
            :description="book.description"
          >

          </BookInfo>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import BookInfo from "@/components/book_page/BookInfo";
import BookTitle from "@/components/book_page/BookTitle";
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter";

import ApiConnect from "@/services/ApiConnect";

export default {
  name: "Book",
  components: {
    BookInfo,
    BookTitle,
    NavBar,
    MyFooter,
  },
  data(){
    return {
      book: {}
    }
  },
  methods: {
    getBook(id) {
      ApiConnect.get('books/'+id).then((response) =>
          this.book = response.data,
      )},
  },
  created() {
    this.getBook(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>