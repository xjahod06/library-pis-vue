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
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "../components/main_page/NavBar";
import MyFooter from "../components/main_page/MyFooter" ;
import MainSection from "../components/main_page/MainSection";
export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar,
    MyFooter,
    MainSection
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  color: #ebebeb;

}

</style>
