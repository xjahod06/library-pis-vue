<template>
  <div id="Genre">
    <NavBar></NavBar>
    <h3>{{this.books}}</h3>
    <MainSection name="Books"></MainSection>
    <MainSection name="Authors"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";
import ApiConnect from "@/services/ApiConnect";

export default {
  name: "Genre",
  components: {
    NavBar,
    MyFooter,
    MainSection
  },

  data(){
    return {
      books: [],
      genre_name: [],
      authors: [],
    }
  },

  methods: {
    getBooks(name){
      let params = {params:{"genres": name}};
      ApiConnect.get('books/',params).then((response) =>
          this.books = response.data,
      )},

    getName(){
      ApiConnect.get('genres/'+this.$route.params.id).then((response) =>
      {
        this.genre_name = response.data;
        this.getBooks(this.genre_name.name);
      }
      )},

  },
  created() {
    this.getName();
  },

}

</script>

<style scoped>
@import "../assets/styles/main.css";
</style>