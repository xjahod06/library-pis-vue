<template>
  <div id="books">
    <NavBar></NavBar>

    <b-container>
      <h1>Magazines:</h1>
      <b-row>
        <MainTile v-for="book in magazines"
                  img="@/assets/logo.png"
                  :genres = book.genres
                  :type = book.language
                  :name = book.name
                  :authors = book.authors
                  :fields = book.fields
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
  name: "Magazines",
  components: {
    NavBar,
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