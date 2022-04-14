<template>
  <div id="app">
  <NavBar></NavBar>
    <MainSection name="Books"></MainSection>
    <MainSection name="E-Books"></MainSection>
    <MainSection name="Magazines"></MainSection>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "../components/main_page/NavBar";
import MyFooter from "../components/main_page/MyFooter" ;
import MainSection from "../components/main_page/MainSection";

export default {
  name: 'App',
  components: {
    NavBar,
    MyFooter,
    MainSection
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
</style>
