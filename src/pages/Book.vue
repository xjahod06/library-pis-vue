<template>
  <div id="Book">
    <NavbarFinal></NavbarFinal>
    <b-container>
      <b-row>
        <b-col cols="4">
          <BookTitle
            :img="book.coverPhotoPath"
            format="book"
            :publisher="book.publisher"
            :released="new Date(book.publicationDate)"
            :pages="book.pages"
            :hasElectronicCopy="hasElectronicCopy"
            :hardCopies="book.hardCopyExemplars"
            :electronicCopies="book.electronicCopyExemplars"
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
import MyFooter from "@/components/main_page/MyFooter";

import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "Book",
  components: {
    BookInfo,
    BookTitle,
    NavbarFinal,
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
  },
  computed: {
    hasElectronicCopy (){
      if (this.book){
        if (this.book.electronicCopyExemplars.length > 0	){
          return true;
        }
      }

      return false;
    }
  }
}
</script>

<style scoped>

</style>