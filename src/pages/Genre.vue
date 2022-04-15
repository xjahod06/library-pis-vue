<template>
  <div id="Genre">
    <NavBar></NavBar>
    <h1>{{this.$route.params}}</h1>
    <MainSection name="Books"></MainSection>
    <MainSection name="Authors"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import MainSection from "@/components/main_page/MainSection";

export default {
  name: "Genre",
  components: {
    NavBar,
    MyFooter,
    MainSection
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/main.css";
</style>