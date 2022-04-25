<template>
  <div id="Magazine">
    <NavbarFinal></NavbarFinal>
    <b-container>
      <b-row>
        <b-col cols="4">
          <BookTitle
              :img="magazine.coverPhotoPath"
              format="Magazine"
              :publisher="magazine.publisher"
              :released="magazine.publicationDate"
              :pages="magazine.pages"
              :hasElectronicCopy="hasElectronicCopy"
              :hardCopies="magazine.hardCopyExemplars"
              :electronicCopies="magazine.electronicCopyExemplars"
              :id="magazine.id"
          >

          </BookTitle>
        </b-col>
        <b-col cols="8">
          <BookInfo
              :title="magazine.name"
              :publicationNumber="magazine.number + '/' + magazine.pubcationYear"
              :authors="magazine.authors"
              :issn="magazine.issn"
              :fields="magazine.fields"
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
import MyFooter from "@/components/main_page/MyFooter";

import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "Magazine",
  components: {
    BookInfo,
    BookTitle,
    NavbarFinal,
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
  },
  computed: {
    hasElectronicCopy (){
      if (this.magazine.electronicCopyExemplars.length > 0	){
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>