<template>
  <div id="Magazine">
    <NavBar></NavBar>
    <b-container>
      <b-row>
        <b-col cols="4">
          <BookTitle
              img="@/assets/logo.png"
              format="Magazine"
              :publisher="magazine.publisher"
              :released="magazine.publicationDate"
              :pages="magazine.pages"
          >

          </BookTitle>
        </b-col>
        <b-col cols="8">
          <BookInfo
              :title="magazine.name"
              :publicationNumber="magazine.number + '/' + magazine.pubcationYear"
              :authors="magazine.authors"
              :issn="magazine.issn"
              :genres="magazine.fields"
              :description="magazine.description"
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
  name: "Magazine",
  components: {
    BookInfo,
    BookTitle,
    NavBar,
    MyFooter,
  },
  data(){
    return {
      magazine: {}
    }
  },
  methods: {
    getMagazine(id) {
      ApiConnect.get('magazines/'+id).then((response) =>
          this.magazine = response.data,
      )},
  },
  created() {
    this.getMagazine(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>