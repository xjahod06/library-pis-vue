<template>
  <div id="books">
    <NavbarFinal></NavbarFinal>

    <b-container>
      <h1>Magazines:</h1>
      <b-row>
        <MainTile v-for="book in magazines"
                  :img="book.coverPhoto"
                  :genres = book.genres
                  :type = book.language
                  :name = book.name
                  :authors = book.authors
                  :fields = book.fields
                  :id = book.id
                  root = "/magazines/"
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
  name: "Magazines",
  components: {
    NavbarFinal,
    MyFooter,
    MainTile
  },
  data(){
    return {
      magazines: [],
    }
  },
  methods: {
    getMagazines(){
      ApiConnect.get('magazines/').then((response) =>
          this.magazines = response.data,
      )},
  },
  created() {
    this.getMagazines();
  },
}
</script>

<style scoped>

</style>